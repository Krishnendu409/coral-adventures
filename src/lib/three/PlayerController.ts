import * as THREE from 'three';

/**
 * PlayerController — Bruno Simon-inspired WASD/Touch navigable player controller
 * 
 * Features:
 * - Desktop WASD / Arrow key movement with smooth acceleration/deceleration
 * - Mouse look (pointer drag) for free camera rotation
 * - Touch look (mobile touch drag) for camera rotation
 * - Ground collision detection and step height climbing
 * - Camera eye height management (~1.7m above terrain)
 * - Seamless blending between guided (spline) and free-roam (WASD) modes
 * - Bruno Simon-inspired momentum: subtle physical feel, not instant stop/start
 */

export type NavigationMode = 'guided' | 'free-roam';

export interface PlayerState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  yaw: number;       // horizontal rotation (radians)
  pitch: number;     // vertical look angle (radians)
  mode: NavigationMode;
  isMoving: boolean;
  groundHeight: number;
}

export interface PlayerControllerConfig {
  moveSpeed: number;           // m/s at full speed
  acceleration: number;        // rate of velocity build-up
  deceleration: number;        // rate of velocity decay (friction)
  lookSensitivity: number;     // mouse/touch look sensitivity
  eyeHeight: number;           // camera height above ground (meters)
  stepHeight: number;          // max terrain step the player can climb (meters)
  pitchLimits: [number, number]; // [min, max] pitch in radians
  worldBounds: {               // spatial boundaries
    minX: number; maxX: number;
    minZ: number; maxZ: number;
  };
}

const DEFAULT_CONFIG: PlayerControllerConfig = {
  moveSpeed: 4.5,
  acceleration: 8.0,
  deceleration: 6.0,
  lookSensitivity: 0.003,
  eyeHeight: 1.7,
  stepHeight: 0.8,
  pitchLimits: [-Math.PI / 3, Math.PI / 4], // -60° to +45°
  worldBounds: {
    minX: -110,
    maxX: 110,
    minZ: -5,
    maxZ: 1250,
  },
};

export class PlayerController {
  public state: PlayerState;
  public config: PlayerControllerConfig;

  // Input state
  private keysDown: Set<string> = new Set();
  private inputVector: THREE.Vector2 = new THREE.Vector2();
  private targetVelocity: THREE.Vector3 = new THREE.Vector3();

  // Reusable temp vectors
  private _forward: THREE.Vector3 = new THREE.Vector3();
  private _right: THREE.Vector3 = new THREE.Vector3();
  private _moveDir: THREE.Vector3 = new THREE.Vector3();

  constructor(config?: Partial<PlayerControllerConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = {
      position: new THREE.Vector3(0, this.config.eyeHeight, 10),
      velocity: new THREE.Vector3(),
      yaw: 0,
      pitch: 0,
      mode: 'guided',
      isMoving: false,
      groundHeight: 0,
    };
  }

  // ---- Input Handling ----

  public handleKeyDown(key: string): void {
    this.keysDown.add(key.toLowerCase());
    this.updateInputVector();

    // Auto-switch to free-roam mode on any WASD input
    if (this.isMovementKey(key) && this.state.mode === 'guided') {
      this.state.mode = 'free-roam';
    }
  }

  public handleKeyUp(key: string): void {
    this.keysDown.delete(key.toLowerCase());
    this.updateInputVector();
  }

  public handleMouseLook(deltaX: number, deltaY: number): void {
    this.state.yaw -= deltaX * this.config.lookSensitivity;
    this.state.pitch -= deltaY * this.config.lookSensitivity;

    // Clamp pitch to prevent camera flip
    this.state.pitch = Math.max(
      this.config.pitchLimits[0],
      Math.min(this.config.pitchLimits[1], this.state.pitch)
    );
  }

  public setMode(mode: NavigationMode): void {
    this.state.mode = mode;
    if (mode === 'guided') {
      // Clear velocity when switching back to guided
      this.state.velocity.set(0, 0, 0);
      this.keysDown.clear();
      this.inputVector.set(0, 0);
    }
  }

  public toggleMode(): NavigationMode {
    const newMode = this.state.mode === 'guided' ? 'free-roam' : 'guided';
    this.setMode(newMode);
    return newMode;
  }

  public setPosition(x: number, y: number, z: number): void {
    this.state.position.set(x, y, z);
  }

  public setYaw(yaw: number): void {
    this.state.yaw = yaw;
  }

  // ---- Terrain Height Query ----

  /**
   * Simple terrain height estimation based on world Z coordinate.
   * In a full implementation this would raycast against the terrain mesh.
   */
  public getTerrainHeight(x: number, z: number): number {
    // Approximate the MalpeTerrain heightmap logic
    const normalizedZ = Math.max(0, Math.min(1200, z)) / 1200;

    // Dune elevation near approach road (Z=0..60m)
    if (z < 60) {
      return Math.sin(z * 0.08) * 0.5 + Math.sin(x * 0.15) * 0.3;
    }

    // Pavilion area (Z=60..130m) — slightly elevated
    if (z < 130) {
      return 0.4 + Math.sin(z * 0.04) * 0.2;
    }

    // Beach slope descending to water (Z=130..200m)
    if (z < 200) {
      const beachFactor = (z - 130) / 70;
      return 0.4 * (1 - beachFactor) + Math.sin(x * 0.1) * 0.1 * (1 - beachFactor);
    }

    // Sea Walkway pier level (Z=200..500m)
    if (z < 500 && Math.abs(x) < 4) {
      return 1.8; // Pier deck height
    }

    // Near water level (Z=200+)
    return Math.max(0.0, 0.1 * Math.sin(normalizedZ * Math.PI * 2) * 0.3);
  }

  // ---- Physics Update ----

  /**
   * Update player position and velocity.
   * Call this every frame with deltaTime in seconds.
   */
  public update(deltaTime: number): void {
    if (this.state.mode !== 'free-roam') {
      this.state.isMoving = false;
      return;
    }

    // Clamp deltaTime to prevent physics explosion on frame spikes
    const dt = Math.min(deltaTime, 0.05);

    // Calculate forward and right vectors from yaw
    this._forward.set(
      Math.sin(this.state.yaw),
      0,
      Math.cos(this.state.yaw)
    );
    this._right.set(
      Math.cos(this.state.yaw),
      0,
      -Math.sin(this.state.yaw)
    );

    // Build target velocity from input
    this._moveDir.set(0, 0, 0);
    if (this.inputVector.y !== 0) {
      this._moveDir.addScaledVector(this._forward, this.inputVector.y);
    }
    if (this.inputVector.x !== 0) {
      this._moveDir.addScaledVector(this._right, this.inputVector.x);
    }

    if (this._moveDir.lengthSq() > 0) {
      this._moveDir.normalize();
      this.targetVelocity.copy(this._moveDir).multiplyScalar(this.config.moveSpeed);
      this.state.isMoving = true;
    } else {
      this.targetVelocity.set(0, 0, 0);
      this.state.isMoving = false;
    }

    // Smooth acceleration / deceleration (momentum feel)
    const lerpFactor = this.state.isMoving
      ? 1 - Math.exp(-this.config.acceleration * dt)
      : 1 - Math.exp(-this.config.deceleration * dt);

    this.state.velocity.lerp(this.targetVelocity, lerpFactor);

    // Apply velocity to position
    this.state.position.addScaledVector(this.state.velocity, dt);

    // Clamp to world bounds
    this.state.position.x = Math.max(
      this.config.worldBounds.minX,
      Math.min(this.config.worldBounds.maxX, this.state.position.x)
    );
    this.state.position.z = Math.max(
      this.config.worldBounds.minZ,
      Math.min(this.config.worldBounds.maxZ, this.state.position.z)
    );

    // Ground height detection and step climbing
    const terrainH = this.getTerrainHeight(this.state.position.x, this.state.position.z);
    const targetY = terrainH + this.config.eyeHeight;
    const heightDiff = targetY - this.state.position.y;

    // Step climbing: if terrain rises within step height, smoothly climb
    if (heightDiff > 0 && heightDiff <= this.config.stepHeight) {
      this.state.position.y = THREE.MathUtils.lerp(this.state.position.y, targetY, 0.15);
    } else if (heightDiff < 0) {
      // Descending: smooth downward movement
      this.state.position.y = THREE.MathUtils.lerp(this.state.position.y, targetY, 0.1);
    } else if (heightDiff > this.config.stepHeight) {
      // Blocked: prevent climbing too-steep terrain
      this.state.position.addScaledVector(this.state.velocity, -dt);
      this.state.velocity.multiplyScalar(0.1);
    }

    this.state.groundHeight = terrainH;

    // Stop velocity if effectively stationary
    if (this.state.velocity.lengthSq() < 0.0001) {
      this.state.velocity.set(0, 0, 0);
    }
  }

  // ---- Camera Application ----

  /**
   * Apply player state to a Three.js camera.
   * Returns the look-at target vector for external use.
   */
  public applyToCamera(camera: THREE.Camera): THREE.Vector3 {
    camera.position.copy(this.state.position);

    const lookTarget = new THREE.Vector3(
      this.state.position.x + Math.sin(this.state.yaw) * 10,
      this.state.position.y + Math.tan(this.state.pitch) * 10,
      this.state.position.z + Math.cos(this.state.yaw) * 10
    );

    camera.lookAt(lookTarget);
    return lookTarget;
  }

  /**
   * Blend between guided spline camera and free-roam player camera.
   * blendFactor: 0 = fully guided, 1 = fully free-roam
   */
  public blendWithGuided(
    camera: THREE.Camera,
    guidedPos: THREE.Vector3,
    guidedLookAt: THREE.Vector3,
    blendFactor: number
  ): void {
    const clampedBlend = Math.max(0, Math.min(1, blendFactor));

    const blendedPos = guidedPos.clone().lerp(this.state.position, clampedBlend);
    camera.position.copy(blendedPos);

    const playerLookAt = new THREE.Vector3(
      this.state.position.x + Math.sin(this.state.yaw) * 10,
      this.state.position.y + Math.tan(this.state.pitch) * 10,
      this.state.position.z + Math.cos(this.state.yaw) * 10
    );

    const blendedLookAt = guidedLookAt.clone().lerp(playerLookAt, clampedBlend);
    camera.lookAt(blendedLookAt);
  }

  // ---- Private Helpers ----

  private isMovementKey(key: string): boolean {
    const k = key.toLowerCase();
    return k === 'w' || k === 'a' || k === 's' || k === 'd'
      || k === 'arrowup' || k === 'arrowdown' || k === 'arrowleft' || k === 'arrowright';
  }

  private updateInputVector(): void {
    let x = 0;
    let y = 0;

    if (this.keysDown.has('w') || this.keysDown.has('arrowup')) y += 1;
    if (this.keysDown.has('s') || this.keysDown.has('arrowdown')) y -= 1;
    if (this.keysDown.has('a') || this.keysDown.has('arrowleft')) x -= 1;
    if (this.keysDown.has('d') || this.keysDown.has('arrowright')) x += 1;

    this.inputVector.set(x, y);
  }

  // ---- Cleanup ----

  public dispose(): void {
    this.keysDown.clear();
    this.inputVector.set(0, 0);
    this.state.velocity.set(0, 0, 0);
  }
}

export default PlayerController;

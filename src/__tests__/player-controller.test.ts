import { describe, it, expect } from 'vitest';
import { PlayerController } from '../lib/three/PlayerController';
import * as THREE from 'three';

describe('PlayerController Class — Bruno Simon-inspired WASD Navigation', () => {
  it('initializes with default configuration and guided mode', () => {
    const controller = new PlayerController();
    expect(controller).toBeDefined();
    expect(controller.state.mode).toBe('guided');
    expect(controller.state.position.y).toBeCloseTo(1.7); // eye height
    expect(controller.config.moveSpeed).toBe(4.5);
    expect(controller.config.eyeHeight).toBe(1.7);
    expect(controller.config.stepHeight).toBe(0.8);
  });

  it('accepts custom configuration overrides', () => {
    const controller = new PlayerController({ moveSpeed: 6.0, eyeHeight: 1.8 });
    expect(controller.config.moveSpeed).toBe(6.0);
    expect(controller.config.eyeHeight).toBe(1.8);
    expect(controller.config.acceleration).toBe(8.0); // default preserved
  });

  it('handles WASD keyboard input and auto-switches to free-roam mode', () => {
    const controller = new PlayerController();
    expect(controller.state.mode).toBe('guided');

    controller.handleKeyDown('w');
    expect(controller.state.mode).toBe('free-roam');

    controller.handleKeyUp('w');
    // Mode stays free-roam after key release
    expect(controller.state.mode).toBe('free-roam');
  });

  it('handles Arrow key input and auto-switches to free-roam mode', () => {
    const controller = new PlayerController();
    controller.handleKeyDown('ArrowUp');
    expect(controller.state.mode).toBe('free-roam');

    controller.handleKeyDown('ArrowLeft');
    controller.handleKeyUp('ArrowUp');
    controller.handleKeyUp('ArrowLeft');
  });

  it('applies smooth velocity acceleration when moving forward', () => {
    const controller = new PlayerController();
    controller.setMode('free-roam');
    controller.handleKeyDown('w');

    // Simulate several frames
    for (let i = 0; i < 30; i++) {
      controller.update(1 / 60);
    }

    // Velocity should have built up
    expect(controller.state.velocity.length()).toBeGreaterThan(0);
    expect(controller.state.isMoving).toBe(true);

    // Position should have moved forward
    expect(controller.state.position.z).toBeGreaterThan(10); // started at z=10
  });

  it('decelerates smoothly when keys are released', () => {
    const controller = new PlayerController();
    controller.setMode('free-roam');
    controller.handleKeyDown('w');

    // Accelerate
    for (let i = 0; i < 30; i++) {
      controller.update(1 / 60);
    }
    const speedAtRelease = controller.state.velocity.length();
    expect(speedAtRelease).toBeGreaterThan(0);

    // Release key
    controller.handleKeyUp('w');

    // Decelerate over several frames
    for (let i = 0; i < 60; i++) {
      controller.update(1 / 60);
    }

    // Velocity should have decayed significantly
    expect(controller.state.velocity.length()).toBeLessThan(speedAtRelease * 0.1);
  });

  it('clamps position to world bounds', () => {
    const controller = new PlayerController();
    controller.setMode('free-roam');

    // Manually set position outside bounds
    controller.setPosition(200, 1.7, -100);
    controller.handleKeyDown('w');
    controller.update(1 / 60);

    expect(controller.state.position.x).toBeLessThanOrEqual(controller.config.worldBounds.maxX);
    expect(controller.state.position.z).toBeGreaterThanOrEqual(controller.config.worldBounds.minZ);
  });

  it('handles mouse look and clamps pitch to prevent camera flip', () => {
    const controller = new PlayerController();

    // Look right
    controller.handleMouseLook(100, 0);
    expect(controller.state.yaw).not.toBe(0);

    // Look down extreme — should be clamped
    controller.handleMouseLook(0, 10000);
    expect(controller.state.pitch).toBeGreaterThanOrEqual(controller.config.pitchLimits[0]);
    expect(controller.state.pitch).toBeLessThanOrEqual(controller.config.pitchLimits[1]);
  });

  it('toggles between guided and free-roam modes', () => {
    const controller = new PlayerController();
    expect(controller.state.mode).toBe('guided');

    const newMode = controller.toggleMode();
    expect(newMode).toBe('free-roam');
    expect(controller.state.mode).toBe('free-roam');

    const backMode = controller.toggleMode();
    expect(backMode).toBe('guided');
    expect(controller.state.mode).toBe('guided');
    // Velocity should be cleared when going back to guided
    expect(controller.state.velocity.length()).toBe(0);
  });

  it('estimates terrain height for different world zones', () => {
    const controller = new PlayerController();

    // Approach road dune area (Z < 60)
    const duneHeight = controller.getTerrainHeight(0, 30);
    expect(typeof duneHeight).toBe('number');

    // Pavilion area (Z=60..130)
    const pavilionHeight = controller.getTerrainHeight(0, 90);
    expect(pavilionHeight).toBeGreaterThan(0);

    // Sea Walkway pier (Z=200..500, near centerline)
    const pierHeight = controller.getTerrainHeight(0, 350);
    expect(pierHeight).toBeCloseTo(1.8);

    // Beach area (Z > 200, off-center)
    const beachHeight = controller.getTerrainHeight(30, 300);
    expect(typeof beachHeight).toBe('number');
  });

  it('does not update position in guided mode', () => {
    const controller = new PlayerController();
    const startPos = controller.state.position.clone();

    controller.handleKeyDown('w');
    // Mode should switch to free-roam when key pressed
    controller.setMode('guided');
    controller.update(1 / 60);

    // Position should not change in guided mode
    expect(controller.state.position.x).toBeCloseTo(startPos.x);
    expect(controller.state.position.z).toBeCloseTo(startPos.z);
  });

  it('applies player state to a Three.js camera', () => {
    const controller = new PlayerController();
    controller.setPosition(5, 1.7, 20);
    controller.setYaw(Math.PI / 4);

    const camera = new THREE.PerspectiveCamera();
    const lookTarget = controller.applyToCamera(camera);

    expect(camera.position.x).toBeCloseTo(5);
    expect(camera.position.y).toBeCloseTo(1.7);
    expect(camera.position.z).toBeCloseTo(20);
    expect(lookTarget).toBeDefined();
  });

  it('blends between guided spline and free-roam camera states', () => {
    const controller = new PlayerController();
    controller.setPosition(10, 1.7, 50);
    controller.setYaw(0);

    const camera = new THREE.PerspectiveCamera();
    const guidedPos = new THREE.Vector3(0, 2, 100);
    const guidedLookAt = new THREE.Vector3(0, 1.7, 110);

    // Full guided (blend=0): camera should be at guidedPos
    controller.blendWithGuided(camera, guidedPos, guidedLookAt, 0);
    expect(camera.position.x).toBeCloseTo(0);
    expect(camera.position.z).toBeCloseTo(100);

    // Full free-roam (blend=1): camera should be at player position
    controller.blendWithGuided(camera, guidedPos, guidedLookAt, 1);
    expect(camera.position.x).toBeCloseTo(10);
    expect(camera.position.z).toBeCloseTo(50);

    // 50% blend: camera should be midway
    controller.blendWithGuided(camera, guidedPos, guidedLookAt, 0.5);
    expect(camera.position.x).toBeCloseTo(5);
  });

  it('cleans up on dispose', () => {
    const controller = new PlayerController();
    controller.handleKeyDown('w');
    controller.setMode('free-roam');
    for (let i = 0; i < 10; i++) controller.update(1 / 60);

    controller.dispose();
    expect(controller.state.velocity.length()).toBe(0);
  });
});

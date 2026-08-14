import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActFiveBooking } from '@/components/scenes/ActFiveBooking';

describe('ActFiveBooking', () => {
  it('renders input fields with proper labels and accessibility attributes', () => {
    render(<ActFiveBooking />);
    
    const nameInput = screen.getByLabelText(/guest name/i);
    expect(nameInput).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/contact email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('renders experience selection as accessible radiogroup', () => {
    render(<ActFiveBooking />);
    
    const radiogroup = screen.getByRole('radiogroup', { name: /choose your horizon/i });
    expect(radiogroup).toBeInTheDocument();
    
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(5);
    
    // Default selection is sunset cruise
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');
  });

  it('validates input on empty submission and displays errors', () => {
    render(<ActFiveBooking />);
    
    const submitButton = screen.getByRole('button', { name: /submit expedition request/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });
});

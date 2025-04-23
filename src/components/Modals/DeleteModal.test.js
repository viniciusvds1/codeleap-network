import React from 'react';
import { render, screen } from '@testing-library/react';
import DeleteModal from './DeleteModal';

describe('DeleteModal Component', () => {
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn();

  test('renders confirmation message', () => {
    render(<DeleteModal onCancel={mockOnCancel} onConfirm={mockOnConfirm} />);
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  });

  test('renders Cancel and Delete buttons', () => {
    render(<DeleteModal onCancel={mockOnCancel} onConfirm={mockOnConfirm} />);
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });
});

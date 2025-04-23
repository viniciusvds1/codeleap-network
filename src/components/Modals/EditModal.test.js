import React from 'react';
import { render, screen } from '@testing-library/react';
import EditModal from './EditModal';

describe('EditModal Component', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post Title',
    content: 'Test Post Content'
  };
  const mockOnCancel = jest.fn();
  const mockOnSave = jest.fn();

  test('renders the modal title', () => {
    render(<EditModal post={mockPost} onCancel={mockOnCancel} onSave={mockOnSave} />);
    expect(screen.getByText('Edit item')).toBeInTheDocument();
  });

  test('renders form fields pre-filled with post data', () => {
    render(<EditModal post={mockPost} onCancel={mockOnCancel} onSave={mockOnSave} />);
    expect(screen.getByDisplayValue('Test Post Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Post Content')).toBeInTheDocument();
  });

  test('renders Cancel and Save buttons', () => {
    render(<EditModal post={mockPost} onCancel={mockOnCancel} onSave={mockOnSave} />);
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });
});

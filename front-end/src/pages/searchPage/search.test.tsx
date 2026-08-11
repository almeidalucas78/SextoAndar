import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchPage from './index';

describe('SearchPage', () => {
  it('SearchPage renderiza sem quebrar', () => {
    render(<SearchPage />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });
});
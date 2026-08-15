import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchPage from './index';
import AppProvider from '../../context/provider';

describe('SearchPage', () => {
  it('SearchPage renderiza sem quebrar', () => {
    render(
      <AppProvider>
        <SearchPage />
      </AppProvider>
    );
    expect(screen.getByRole('search')).toBeInTheDocument();
  });
});
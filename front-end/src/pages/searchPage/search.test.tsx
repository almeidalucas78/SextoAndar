import { render, screen } from '../../test/render';
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
    expect(screen.getByText(/imóveis em/i)).toBeInTheDocument();
  });
});
import {render, screen} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '.';
import AppProvider from '../../context/provider';

describe('Home', () => {
  it('Home renderiza sem quebrar', () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Banner from './index';

describe('Banner', () => {
  it('Banner renderiza sem quebrar', () => {
    render(<Banner />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  it('Verificando se a pagina tem <h1>', () => {
    render(<Banner />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
import {render, screen} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '.';

describe('Home', () => {
  it('Home renderiza sem quebrar', () => {  
    render(<Home />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  it('Verificando se a pagina tem <h1>', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});

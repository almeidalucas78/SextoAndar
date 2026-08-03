import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Header from '.';

describe('Header testes', () => {
  it('testando se no componente header os elementos header e navigation estão presentes', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
  it('testando se os links do menu estão presentes', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Comprar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Alugar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Lançamentos' })).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Banner from './index';

describe('Banner', () => {
  it('Verificando se a pagina tem <h1>', () => {
    render(<Banner />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
  it('Verifica se o botão de busca direciona para a página de busca', () => {
    render(<Banner />);
    const link = screen.getByRole('link', { name: /Buscar Imóveis/i });
    expect(link).toHaveAttribute('href', '/search');
  });
  it('Verifica se o botão de como funciona direciona para a página de como funciona', () => {
    render(<Banner />);
    const link = screen.getByRole('link', { name: /Como Funciona/i });
    expect(link).toHaveAttribute('href', '/como-funciona');
  });
  it('Verifica se a imagem do banner está sendo renderizada', () => {
    render(<Banner />);
    const image = screen.getByRole('img', { name: /Banner/i });
    expect(image).toBeInTheDocument();
  }
)
});
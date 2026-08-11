import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FloatingForm from './index';
import userEvent from '@testing-library/user-event';

//Exemplos de testes mocados
// const mockAlugar = { texto: 'Santos' };
// const mockComprar = { texto: 'Flamengo' };

describe('FloatingForm', () => {
  it('renderiza sem quebrar', () => {
    render(<FloatingForm />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('testando evento de clique ao clicar em Alugar', async () => {
    const user = userEvent.setup();
    render(<FloatingForm />);
    await user.click(screen.getByText('Alugar'));
    expect(screen.getByLabelText('Aluguel até')).toBeInTheDocument();
  });

  it('volta para campo de compra ao clicar em comprar após mudar de tab', async () => {
    const user = userEvent.setup();
    render(<FloatingForm />);
    await user.click(screen.getByText('Alugar'));
    await user.click(screen.getByText('Comprar'));
    expect(screen.getByLabelText('Imóvel até')).toBeInTheDocument();
  });
});

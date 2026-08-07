import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FloatingForm from './index';
import userEvent from '@testing-library/user-event';

const mockAlugar = { texto: 'Santos' };
const mockComprar = { texto: 'Flamengo' };

describe('FloatingForm', () => {
  it('renderiza sem quebrar', () => {
    render(<FloatingForm />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('testando evento de clique ao clicar em Alugar', async () => {
    const clickEvent = userEvent.setup();
    render(<FloatingForm />);
    const myButton = screen.getByText('Alugar');
    await clickEvent.click(myButton);
    expect(
      mockAlugar.texto
    ).toBe("Santos");
  });
   it('testando evento de clique ao clicar em Comprar', async () => {
    const clickEvent = userEvent.setup();
    render(<FloatingForm />);
    const myButton = screen.getByText('Comprar');
    await clickEvent.click(myButton);
    expect(
      mockComprar.texto
    ).toBe("Flamengo");
  });
});

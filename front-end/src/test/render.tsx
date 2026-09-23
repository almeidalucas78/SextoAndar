import { render as rtlRender } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import AppProvider from '../context/provider';

export function render(ui: ReactElement) {
  return rtlRender(
    <MemoryRouter>
      <AppProvider>{ui}</AppProvider>
    </MemoryRouter>,
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
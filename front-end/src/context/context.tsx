//responsavel por criar o contexto da aplicação, que será usado para compartilhar dados entre os componentes

import { createContext, useContext } from 'react';

export interface AppContextType {
  testValue: string;
  setTestValue: React.Dispatch<React.SetStateAction<string>>;
  numeros: number;
  setNumeros: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
}

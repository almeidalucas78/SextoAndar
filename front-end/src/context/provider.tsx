import { useState, type ReactNode } from 'react';
import { AppContext } from './context';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  const [testValue, setTestValue] = useState('Lucas');
  const [numeros, setNumeros] = useState(0);

  return (
    <AppContext.Provider value={{ testValue, setTestValue, numeros, setNumeros }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

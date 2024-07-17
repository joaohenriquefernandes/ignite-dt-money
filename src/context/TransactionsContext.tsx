/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode, useEffect, useState } from 'react';

interface ITransactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  created_at: Date;
}

interface ITransactionsContentType {
  transactions: ITransactions[];
}

export const TransactionsContext = createContext(
  {} as ITransactionsContentType,
);

interface ITransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions');
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

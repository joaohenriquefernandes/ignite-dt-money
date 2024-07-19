/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

import { api } from '../lib/axios';

interface ITransactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  created_at: Date;
}

interface ICreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface ITransactionsContentType {
  transactions: ITransactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: ICreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext(
  {} as ITransactionsContentType,
);

interface ITransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response: ITransactions[] = await api.get('transactions', {
      params: {
        _sort: 'created_at',
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(response);
  }, []);

  const createTransaction = useCallback(
    async ({ category, description, price, type }: ICreateTransactionInput) => {
      const response = await api.post('/transactions', {
        category,
        description,
        price,
        type,
        created_at: new Date(),
      });

      setTransactions((prevState) => [response.data, ...prevState]);
    },
    [],
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

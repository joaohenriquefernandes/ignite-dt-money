import { useContext } from 'react';

import { TransactionsContext } from '../context/TransactionsContext';

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  const { income, outcome, total } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  );

  return { income, outcome, total };
}

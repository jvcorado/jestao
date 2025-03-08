"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ItemType, useFriends } from "./friendContext"; // Certifique-se de que está importando os amigos corretamente.

export interface Expense {
  id: string;
  amount: number;
  friend: ItemType[]; // Agora friend é um array de objetos { id, name }
  description?: string;
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
}

interface SplitResult {
  owes: Record<string, number>;
  receives: Record<string, number>;
  transactions: Transaction[];
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updatedFields: Partial<Expense>) => void;
  totalExpenses: number;
  splitExpenses: (friends: string[]) => SplitResult;
  setExpenses: (expenses: Expense[]) => void;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export const ExpensesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { friends } = useFriends(); // Pegamos a lista de amigos do contexto de amigos

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedExpenses = localStorage.getItem("expenseAmounts");
      setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenseAmounts", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    setExpenses(
      (prevExpenses) =>
        prevExpenses
          .map((expense) => ({
            ...expense,
            friend: expense.friend.filter((f) =>
              friends.some((friend) => friend.id === f.id)
            ), // Remove amigos inexistentes
          }))
          .filter((expense) => expense.friend.length > 0) // Remove despesas sem amigos
    );
  }, [friends]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = { ...expense, id: String(Date.now()) };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const updateExpense = (id: string, updatedFields: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updatedFields } : expense
      )
    );
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const splitExpenses = (friends: string[]): SplitResult => {
    const totalToSplit = totalExpenses;
    const perPerson = totalToSplit / friends.length;

    const totalSpentByPerson: Record<string, number> = {};
    expenses.forEach(({ friend, amount }) => {
      friend.forEach(({ name }) => {
        totalSpentByPerson[name] =
          (totalSpentByPerson[name] || 0) + amount / friend.length;
      });
    });

    const owes: Record<string, number> = {};
    const receives: Record<string, number> = {};

    friends.forEach((friend) => {
      const paid = totalSpentByPerson[friend] || 0;
      const balance = paid - perPerson;
      if (balance < 0) {
        owes[friend] = Math.abs(balance);
      } else if (balance > 0) {
        receives[friend] = balance;
      }
    });

    const transactions: Transaction[] = [];
    const owesList = Object.entries(owes).sort((a, b) => b[1] - a[1]);
    const receivesList = Object.entries(receives).sort((a, b) => b[1] - a[1]);

    while (owesList.length > 0 && receivesList.length > 0) {
      const [debtor, debtAmount] = owesList[0];
      const [creditor, creditAmount] = receivesList[0];

      const amountToPay = Math.min(debtAmount, creditAmount);
      transactions.push({ from: debtor, to: creditor, amount: amountToPay });

      if (debtAmount > creditAmount) {
        owesList[0][1] -= creditAmount;
        receivesList.shift();
      } else if (creditAmount > debtAmount) {
        receivesList[0][1] -= debtAmount;
        owesList.shift();
      } else {
        owesList.shift();
        receivesList.shift();
      }
    }

    return { owes, receives, transactions };
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        removeExpense,
        updateExpense,
        totalExpenses,
        splitExpenses,
        setExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};

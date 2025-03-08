"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Expense, Transaction } from "./expenseContext";

interface SplitResult {
  owes: Record<string, number>;
  receives: Record<string, number>;
  transactions: Transaction[];
  totalAmount: number;
  perPersonAmount: number;
  timestamp: string;
  accountPerson: Expense[];
}

interface HistoryContextType {
  history: SplitResult[];
  addHistoryEntry: (entry: SplitResult) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<SplitResult[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("expenseHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenseHistory", JSON.stringify(history));
  }, [history]);

  const addHistoryEntry = (entry: SplitResult) => {
    setHistory((prev) => [
      { ...entry, timestamp: new Date().toISOString() },
      ...prev,
    ]);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("expenseHistory");
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
}

"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useFriends } from "@/app/context/friendContext";
import { Expense, useExpenses } from "@/app/context/expenseContext";
import { useHistory } from "@/app/context/historyContext";

export default function DivideDrawer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { splitExpenses, totalExpenses, expenses, setExpenses } = useExpenses();
  const { friends, clear } = useFriends();
  const { history, addHistoryEntry } = useHistory();

  const [splitResult, setSplitResult] = useState<{
    owes: Record<string, number>;
    receives: Record<string, number>;
    transactions: { from: string; to: string; amount: number }[];
    totalAmount: number;
    perPersonAmount: number;
    accountPerson: Expense[];
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const result = splitExpenses(friends.map((friend) => friend.name));
      const totalAmount = totalExpenses;
      const perPersonAmount = Object.values(result.owes).reduce(
        (acc, val) => acc + val,
        0
      );

      const accountPerson = expenses;

      const newSplitResult = {
        ...result,
        totalAmount,
        perPersonAmount,
        accountPerson,
        timestamp: new Date().toISOString(),
      };

      // Verifica se já existe um histórico idêntico antes de adicionar
      const isDuplicate = history.some(
        (entry) =>
          JSON.stringify(entry.owes) === JSON.stringify(newSplitResult.owes) &&
          JSON.stringify(entry.receives) ===
            JSON.stringify(newSplitResult.receives) &&
          JSON.stringify(entry.transactions) ===
            JSON.stringify(newSplitResult.transactions)
      );

      if (!isDuplicate) {
        setSplitResult(newSplitResult);
      }
    }
  }, [isOpen]);

  const handleDone = () => {
    if (splitResult) {
      addHistoryEntry(splitResult);
      setSplitResult(null);

      setIsOpen(false);
      handleClear();
    }
  };

  const handleClear = () => {
    clear();
    setExpenses([]);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="px-4 rounded-t-3xl pb-4 bg-white h-[90vh]">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold">
            Expense Split
          </DrawerTitle>
          <DrawerDescription>
            See how the costs are divided among your friends
          </DrawerDescription>
        </DrawerHeader>

        {expenses.length === 0 && (
          <div className="col-span-2 text-center text-gray-500">
            No expenses saved
          </div>
        )}

        {splitResult && expenses.length > 0 && (
          <div className="mt-4 p-4 border rounded-md bg-gray-100 md:w-[500px] mx-auto">
            <h3 className="font-bold text-lg mb-2">Split Summary</h3>

            <h4 className="font-semibold">Total Expenses:</h4>
            <p className="ml-4 mb-2">
              <strong>$ {totalExpenses.toFixed(2)}</strong>
            </p>

            <h4 className="font-semibold">Amount per Person:</h4>
            <p className="ml-4 mb-4">
              <strong>
                ${" "}
                {friends.length > 0
                  ? (totalExpenses / friends.length).toFixed(2)
                  : "0.00"}
              </strong>
            </p>

            <h4 className="font-semibold">Who Needs to Pay:</h4>
            <ul className="mb-4">
              {Object.entries(splitResult.owes).map(([name, amount]) => (
                <li key={name} className="ml-4">
                  {name} owes <strong>$ {amount.toFixed(2)}</strong>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold">Who Will Receive:</h4>
            <ul className="mb-4">
              {Object.entries(splitResult.receives).map(([name, amount]) => (
                <li key={name} className="ml-4">
                  {name} will receive <strong>$ {amount.toFixed(2)}</strong>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold">Suggested Payments:</h4>
            <ul>
              {splitResult.transactions.map((transaction, index) => (
                <li key={index} className="ml-4">
                  <strong>{transaction.from}</strong> should pay{" "}
                  <strong>$ {transaction.amount.toFixed(2)}</strong> to{" "}
                  <strong>{transaction.to}</strong>
                </li>
              ))}
            </ul>

            <Button
              variant={"outline"}
              className="mt-4 w-full"
              onClick={handleDone}
            >
              Done
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

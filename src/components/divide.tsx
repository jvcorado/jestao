"use client";

import React, { useEffect, useState } from "react";
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
import { useTheme } from "@/app/context/themeContext";

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
  const { colors } = useTheme();

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
      <DrawerContent
        className="px-4 rounded-t-3xl pb-4 h-[90vh]"
        style={{ backgroundColor: colors.background }}
      >
        <DrawerHeader className="text-center">
          <DrawerTitle
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            Divisão de Gastos
          </DrawerTitle>
          <DrawerDescription style={{ color: colors.textSecondary }}>
            Veja como os custos são divididos entre seus amigos
          </DrawerDescription>
        </DrawerHeader>

        {expenses.length === 0 && (
          <div
            className="col-span-2 text-center"
            style={{ color: colors.textSecondary }}
          >
            Nenhum gasto salvo
          </div>
        )}

        {splitResult && expenses.length > 0 && (
          <div
            className="mt-4 p-4 border rounded-md md:w-[500px] mx-auto"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <h3
              className="font-bold text-lg mb-2"
              style={{ color: colors.text }}
            >
              Resumo da Divisão
            </h3>

            <h4 className="font-semibold" style={{ color: colors.text }}>
              Total de Gastos:
            </h4>
            <p className="ml-4 mb-2" style={{ color: colors.text }}>
              <strong>R$ {totalExpenses.toFixed(2)}</strong>
            </p>

            <h4 className="font-semibold" style={{ color: colors.text }}>
              Valor por Pessoa:
            </h4>
            <p className="ml-4 mb-4" style={{ color: colors.text }}>
              <strong>
                R${" "}
                {friends.length > 0
                  ? (totalExpenses / friends.length).toFixed(2)
                  : "0.00"}
              </strong>
            </p>

            <h4 className="font-semibold" style={{ color: colors.text }}>
              Quem Precisa Pagar:
            </h4>
            <ul className="mb-4">
              {Object.entries(splitResult.owes).map(([name, amount]) => (
                <li key={name} className="ml-4" style={{ color: colors.text }}>
                  {name} deve <strong>R$ {amount.toFixed(2)}</strong>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold" style={{ color: colors.text }}>
              Quem Vai Receber:
            </h4>
            <ul className="mb-4">
              {Object.entries(splitResult.receives).map(([name, amount]) => (
                <li key={name} className="ml-4" style={{ color: colors.text }}>
                  {name} vai receber <strong>R$ {amount.toFixed(2)}</strong>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold" style={{ color: colors.text }}>
              Pagamentos Sugeridos:
            </h4>
            <ul>
              {splitResult.transactions.map((transaction, index) => (
                <li key={index} className="ml-4" style={{ color: colors.text }}>
                  <strong>{transaction.from}</strong> deve pagar{" "}
                  <strong>R$ {transaction.amount.toFixed(2)}</strong> para{" "}
                  <strong>{transaction.to}</strong>
                </li>
              ))}
            </ul>

            <Button
              variant={"outline"}
              className="mt-4 w-full"
              style={{
                backgroundColor: colors.logoutButton,
                borderColor: colors.logoutButton,
                color: "#000000",
              }}
              onClick={handleDone}
            >
              Concluído
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

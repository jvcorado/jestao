"use client";

import React from "react";
import { useHistory } from "@/app/context/historyContext";
import { useTheme } from "@/app/context/themeContext";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

export default function HistoryDrawer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { history, clearHistory } = useHistory();
  const { colors } = useTheme();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent
        className="px-4 rounded-t-3xl h-[95vh] font-mono"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
      >
        <div
          className="overflow-y-auto max-h-[75vh] pb-4 space-y-4 md:w-[500px] md:mx-auto rounded-xl"
          style={{ backgroundColor: colors.background }}
        >
          <DrawerHeader
            className="text-center pb-2"
            style={{ borderBottomColor: colors.border }}
          >
            <DrawerTitle
              className="text-xl font-bold uppercase"
              style={{ color: colors.text }}
            >
              Histórico de Contas
            </DrawerTitle>
          </DrawerHeader>

          {history.length > 0 ? (
            <div
              className="mt-4 md:w-[500px] mx-auto text-sm"
              style={{ backgroundColor: colors.background }}
            >
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border rounded-md"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  <h3
                    className="font-bold text-md pb-1 mb-2"
                    style={{
                      color: colors.text,
                      borderBottomColor: colors.border,
                    }}
                  >
                    Data: {new Date(entry.timestamp).toLocaleDateString()}
                  </h3>
                  <div
                    className="flex justify-between pb-1 mb-2"
                    style={{
                      color: colors.text,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <span>Total:</span>
                    <strong>R$ {entry.totalAmount.toFixed(2)}</strong>
                  </div>

                  <div
                    className="flex justify-between pb-1 mb-2"
                    style={{
                      color: colors.text,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <span>Valor por Pessoa:</span>
                    <strong>R$ {entry.perPersonAmount.toFixed(2)}</strong>
                  </div>

                  <div
                    className="pb-1 mb-2"
                    style={{
                      color: colors.text,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <h4 className="font-bold">Devem Pagar:</h4>
                    <ul>
                      {Object.entries(entry.owes).map(([name, amount]) => (
                        <li key={name} className="flex justify-between">
                          <span>{name} deve:</span>
                          <strong>R$ {amount.toFixed(2)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="pb-1 mb-2"
                    style={{
                      color: colors.text,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <h4 className="font-bold">Vão Receber:</h4>
                    <ul>
                      {Object.entries(entry.receives).map(([name, amount]) => (
                        <li key={name} className="flex justify-between">
                          <span>{name} recebe:</span>
                          <strong>R$ {amount.toFixed(2)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="pb-1 mb-2"
                    style={{
                      color: colors.text,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <h4 className="font-bold">Transações:</h4>
                    <ul>
                      {entry.transactions.map((transaction, i) => (
                        <li key={i} className="flex justify-between">
                          <span>
                            {transaction.from} → {transaction.to}
                          </span>
                          <strong>R$ {transaction.amount.toFixed(2)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ color: colors.text }}>
                    <h4 className="font-bold">Pessoa da Conta:</h4>
                    <ul>
                      {entry.accountPerson.map((accountPerson, i) => (
                        <li key={i} className="flex justify-between">
                          <span>
                            {accountPerson.friend.map((item) => item.name)} →{" "}
                            {accountPerson.description}
                          </span>
                          <strong>R$ {accountPerson.amount.toFixed(2)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <Button
                variant={"link"}
                className="mt-4 w-full border py-2 rounded-md uppercase font-bold"
                style={{
                  backgroundColor: colors.logoutButton,
                  borderColor: colors.logoutButton,
                  color: "#000000",
                }}
                onClick={clearHistory}
              >
                Limpar Histórico
              </Button>
            </div>
          ) : (
            <p
              className="text-center mt-4"
              style={{ color: colors.textSecondary }}
            >
              Nenhum histórico disponível.
            </p>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

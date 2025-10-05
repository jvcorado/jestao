"use client";

import { useState } from "react";
import CalculatorDrawer from "@/components/calculator";
import FriendRegister from "@/components/friends";
import {
  Calculator,
  History,
  ReceiptText,
  UserRoundPen,
  Moon,
  LogOut,
} from "lucide-react";
import { useUser } from "../context/userContext";
import { useExpenses } from "../context/expenseContext";
import { useTheme } from "../context/themeContext";
import DivideDrawer from "@/components/divide";
import HistoryDrawer from "@/components/history";
import Image from "next/image";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDivide, setIsOpenDivide] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { username, logout } = useUser();
  const { totalExpenses, expenses, updateExpense } = useExpenses();
  const { toggleTheme, colors } = useTheme();
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [editingExpense, setEditingExpense] = useState<string | null>(null);

  const visibleExpenses = showAll ? expenses : expenses.slice(0, 3);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="flex flex-col gap-4 p-6 max-w-[500px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo_orange.svg"
              alt="Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
                {username}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-11 h-11 rounded-xl border flex items-center justify-center transition-colors hover:opacity-80"
              style={{
                backgroundColor: colors.buttonBackground,
                borderColor: colors.border,
              }}
              aria-label="Alternar tema"
            >
              <Moon className="w-6 h-6" color={colors.moonIcon} />
            </button>
            <button
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              className="w-11 h-11 rounded-xl border flex items-center justify-center transition-colors hover:opacity-80"
              style={{
                backgroundColor: "rgba(250, 72, 58, 0.15)",
                borderColor: "rgba(250, 72, 58, 0.35)",
              }}
              aria-label="Sair"
            >
              <LogOut className="w-6 h-6" color={colors.logoutButton} />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <h2
          className="text-3xl font-normal leading-8 mb-3"
          style={{ color: colors.text }}
        >
          Como posso <br /> te ajudar hoje?
        </h2>

        {/* Total Expenses Card */}
        <div
          className="rounded-2xl p-4 border"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <p className="text-2xl mb-2" style={{ color: colors.text }}>
            Total de Gastos
          </p>
          <h3 className="text-4xl font-bold" style={{ color: colors.text }}>
            R${isNaN(totalExpenses) ? 0 : totalExpenses.toFixed(2)}
          </h3>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="h-[120px] rounded-2xl flex flex-col gap-3 items-center justify-center border transition-colors hover:opacity-90"
            style={{
              backgroundColor: colors.friendsCard,
              borderColor: colors.border,
            }}
          >
            <UserRoundPen className="w-8 h-8" color={colors.friendsIcon} />
            <span
              className="text-base font-semibold text-center"
              style={{ color: colors.friendsText }}
            >
              Editar Amigos
            </span>
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="h-[120px] rounded-2xl flex flex-col gap-3 items-center justify-center border transition-colors hover:opacity-90"
            style={{
              backgroundColor: colors.expenseCard,
              borderColor: colors.border,
            }}
          >
            <ReceiptText className="w-8 h-8" color={colors.expenseIcon} />
            <span
              className="text-base font-semibold text-center"
              style={{ color: colors.expenseText }}
            >
              Adicionar gastos
            </span>
          </button>

          <button
            onClick={() => setIsOpenDivide(true)}
            className="h-[120px] rounded-2xl flex flex-col gap-3 items-center justify-center border transition-colors hover:opacity-90"
            style={{
              backgroundColor: colors.divideCard,
              borderColor: colors.border,
            }}
          >
            <Calculator className="w-8 h-8" color={colors.divideIcon} />
            <span
              className="text-base font-semibold text-center"
              style={{ color: colors.divideText }}
            >
              Dividir conta
            </span>
          </button>

          <button
            onClick={() => setIsOpenHistory(true)}
            className="h-[120px] rounded-2xl flex flex-col gap-3 items-center justify-center border transition-colors hover:opacity-90"
            style={{
              backgroundColor: colors.historyCard,
              borderColor: colors.border,
            }}
          >
            <History className="w-8 h-8" color={colors.historyIcon} />
            <span
              className="text-base font-semibold text-center"
              style={{ color: colors.historyText }}
            >
              Histórico
            </span>
          </button>
        </div>

        {/* Expenses Section */}
        <div className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>
              Gastos
            </h3>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-base font-semibold transition-colors hover:opacity-80"
              style={{ color: colors.text }}
            >
              {showAll ? "Ver Menos" : "Ver Todos"}
            </button>
          </div>

          {visibleExpenses.length > 0 ? (
            <div className="space-y-2">
              {visibleExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="rounded-2xl h-[100px] flex items-center justify-between p-4 border"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  }}
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className="text-xl font-semibold"
                        style={{ color: colors.text }}
                      >
                        {expense.friend
                          .map((item: { name: string }) => item.name)
                          .join(", ")}
                      </p>
                    </div>
                    {editingExpense === expense.id ? (
                      <input
                        type="text"
                        className="text-base border rounded p-2"
                        style={{
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                        value={expense.description}
                        onChange={(e) =>
                          updateExpense(expense.id, {
                            description: e.target.value,
                          })
                        }
                        onBlur={() => setEditingExpense(null)}
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => setEditingExpense(expense.id)}
                        className="text-base text-left transition-colors hover:opacity-80"
                        style={{ color: colors.text }}
                      >
                        {expense.description}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {editingExpense === expense.id ? (
                      <input
                        type="number"
                        className="font-bold text-xl border rounded p-2 w-20 text-center"
                        style={{
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                        value={expense.amount}
                        onChange={(e) =>
                          updateExpense(expense.id, {
                            amount: parseFloat(e.target.value) || 0,
                          })
                        }
                        onBlur={() => setEditingExpense(null)}
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => setEditingExpense(expense.id)}
                        className="font-bold text-xl transition-colors hover:opacity-80"
                        style={{ color: colors.text }}
                      >
                        R${expense.amount}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p
                className="text-base font-light"
                style={{ color: colors.textSecondary }}
              >
                Nenhum gasto salvo
              </p>
            </div>
          )}
        </div>
      </div>

      <HistoryDrawer isOpen={isOpenHistory} setIsOpen={setIsOpenHistory} />
      <DivideDrawer isOpen={isOpenDivide} setIsOpen={setIsOpenDivide} />
      <CalculatorDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <FriendRegister isOpen={showMembers} setIsOpen={setShowMembers} />
    </div>
  );
}

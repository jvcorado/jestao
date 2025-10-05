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
  const { toggleTheme } = useTheme();
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [editingExpense, setEditingExpense] = useState<string | null>(null);

  const visibleExpenses = showAll ? expenses : expenses.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col gap-4 p-6 max-w-[500px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo_orange.svg"
              alt="Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-black">{username}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
            >
              <Moon className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              className="w-11 h-11 rounded-xl border border-red-200 flex items-center justify-center bg-red-50 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <h2 className="text-3xl font-normal text-black leading-8 mb-2">
          Como posso{"\n"}te ajudar hoje?
        </h2>

        {/* Total Expenses Card */}
        <div className="bg-white/34 rounded-2xl p-4 border border-gray-200">
          <p className="text-2xl text-black mb-2">Total de Gastos</p>
          <h3 className="text-4xl font-bold text-black">
            R${isNaN(totalExpenses) ? 0 : totalExpenses.toFixed(2)}
          </h3>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="bg-[#E1F7DD] h-[120px] rounded-2xl flex flex-col gap-3 items-center justify-center border border-gray-200 hover:bg-[#D4F1CE] transition-colors"
          >
            <UserRoundPen className="w-8 h-8 text-[#4CAF50]" />
            <span className="text-base font-semibold text-[#2E7D32] text-center">
              Editar Amigos
            </span>
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#F9F9F9] h-[120px] rounded-2xl flex flex-col gap-3 items-center justify-center border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <ReceiptText className="w-8 h-8 text-[#666666]" />
            <span className="text-base font-semibold text-[#333333] text-center">
              Adicionar gastos
            </span>
          </button>

          <button
            onClick={() => setIsOpenDivide(true)}
            className="bg-[#DEF3FA] h-[120px] rounded-2xl flex flex-col gap-3 items-center justify-center border border-gray-200 hover:bg-[#C8E8F0] transition-colors"
          >
            <Calculator className="w-8 h-8 text-[#2196F3]" />
            <span className="text-base font-semibold text-[#1976D2] text-center">
              Dividir conta
            </span>
          </button>

          <button
            onClick={() => setIsOpenHistory(true)}
            className="bg-[#FFF5C0] h-[120px] rounded-2xl flex flex-col gap-3 items-center justify-center border border-gray-200 hover:bg-[#FFF2A3] transition-colors"
          >
            <History className="w-8 h-8 text-[#FF9800]" />
            <span className="text-base font-semibold text-[#F57C00] text-center">
              Histórico
            </span>
          </button>
        </div>

        {/* Expenses Section */}
        <div className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-black">Gastos</h3>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-base font-semibold text-black hover:text-gray-600 transition-colors"
            >
              {showAll ? "Ver Menos" : "Ver Todos"}
            </button>
          </div>

          {visibleExpenses.length > 0 ? (
            <div className="space-y-2">
              {visibleExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="bg-white rounded-2xl h-[100px] flex items-center justify-between p-4 border border-gray-200"
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold text-black">
                        {expense.friend
                          .map((item: { name: string }) => item.name)
                          .join(", ")}
                      </p>
                    </div>
                    {editingExpense === expense.id ? (
                      <input
                        type="text"
                        className="text-base border border-gray-200 rounded p-2 bg-white"
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
                        className="text-base text-left text-black hover:text-gray-600 transition-colors"
                      >
                        {expense.description}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {editingExpense === expense.id ? (
                      <input
                        type="number"
                        className="font-bold text-xl border border-gray-200 rounded p-2 w-20 text-center bg-white"
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
                        className="font-bold text-xl text-black hover:text-gray-600 transition-colors"
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
              <p className="text-base font-light text-gray-500">
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

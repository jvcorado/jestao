"use client";

import { useState } from "react";
import CalculatorDrawer from "@/components/calculator";
import FriendRegister from "@/components/friends";
import { Button } from "@/components/ui/button";
import { Calculator, History, ReceiptText, UserRoundPen } from "lucide-react";
import { useUser } from "../context/userContext";
import { useExpenses } from "../context/expenseContext";
import DivideDrawer from "@/components/divide";
import HistoryDrawer from "@/components/history";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDivide, setIsOpenDivide] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { username } = useUser();
  const { totalExpenses, expenses, updateExpense } = useExpenses();
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const visibleExpenses = showAll ? expenses : expenses.slice(0, 3);

  return (
    <div className="container mx-auto h-full md:justify-center flex flex-col gap-4 p-6 md:max-w-[500px]">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-4xl md:text-5xl font-bold md:mb-6">
          Hi {username}, <br /> How can I help <br /> you today?
        </h1>

        <section className="grid grid-cols-2 gap-4 cursor-pointer">
          <div
            onClick={() => setIsOpenDivide(true)}
            className="bg-[#DEF3FA] h-[120px] rounded-2xl flex flex-col font-semibold gap-2 items-center justify-center border"
          >
            <Calculator strokeWidth={1.2} size={24} /> Divide bill
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="bg-[#F9F9F9] h-[120px] border rounded-2xl flex flex-col gap-2 font-semibold items-center justify-center"
          >
            <ReceiptText strokeWidth={1.2} size={24} /> Add expenses
          </div>
          <div
            onClick={() => setShowMembers(!showMembers)}
            className="bg-[#E1F7DD] h-[120px] rounded-2xl flex flex-col gap-2 font-semibold items-center justify-center border"
          >
            <UserRoundPen strokeWidth={1.2} size={24} /> Edit Friends
          </div>
          <div
            onClick={() => setIsOpenHistory(true)}
            className="bg-[#FFF5C0] h-[120px] rounded-2xl flex flex-col gap-2 font-semibold items-center justify-center border"
          >
            <History strokeWidth={1.2} size={24} /> account history
          </div>
        </section>
      </div>

      <section className="flex flex-col gap-2">
        <div className="py-2 bg-[#ffffff57] flex items-start justify-center flex-col rounded-2xl">
          <p className="text-2xl">Total Expenses</p>
          <h1 className="text-4xl font-bold">
            {" "}
            ${isNaN(totalExpenses) ? 0 : totalExpenses}
          </h1>
        </div>

        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl">Events</h1>
          <Button
            variant="outline"
            className="text-base cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "See All"}
          </Button>
        </div>

        {visibleExpenses.length > 0 ? (
          visibleExpenses.map((expense, index) => (
            <div
              key={index}
              className="rounded-2xl h-[100px] flex items-center justify-between p-2 bg-[#ffffff] border"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-semibold">
                    {expense.friend.map((item) => item.name)}
                  </p>
                  {/* <Pencil
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setEditingExpense(expense.id)}
                  /> */}
                </div>
                {editingExpense === expense.id ? (
                  <input
                    type="text"
                    className="text-base border rounded p-1"
                    value={expense.description}
                    onChange={(e) =>
                      updateExpense(expense.id, { description: e.target.value })
                    }
                    onBlur={() => setEditingExpense(null)}
                    autoFocus
                  />
                ) : (
                  <p className="text-base cursor-pointer">
                    {expense.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingExpense === expense.id ? (
                  <input
                    type="number"
                    className="font-bold text-xl border rounded p-1 w-20"
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
                  <p className="font-bold text-xl cursor-pointer">
                    ${expense.amount}
                  </p>
                )}
                {/*   <Pencil
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setEditingExpense(expense.id)}
                /> */}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            No expenses saved
          </div>
        )}
      </section>

      <HistoryDrawer isOpen={isOpenHistory} setIsOpen={setIsOpenHistory} />
      <DivideDrawer isOpen={isOpenDivide} setIsOpen={setIsOpenDivide} />
      <CalculatorDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <FriendRegister isOpen={showMembers} setIsOpen={setShowMembers} />
    </div>
  );
}

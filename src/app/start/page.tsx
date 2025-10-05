"use client";

import Image from "next/image";
import start from "../../../public/images/logo_name.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calculator, Users, DollarSign, Moon } from "lucide-react";
import { useTheme } from "../context/themeContext";

import UserRegister from "@/components/user";

export default function Home() {
  const [isOpenUser, setIsOpenUser] = useState(false);
  const { colors, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6 py-16 relative"
      style={{ backgroundColor: colors.background }}
    >
      {/* Botão no topo direito */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 w-11 h-11 rounded-2xl border flex items-center justify-center z-10"
        style={{
          backgroundColor: colors.buttonBackground,
          borderColor: colors.border,
        }}
      >
        <Moon size={24} color={colors.moonIcon} />
      </button>

      <div className="flex flex-col items-center gap-16 max-w-md w-full">
        {/* Logo centralizado */}
        <div className="flex justify-center items-center">
          <Image
            src={start}
            alt="Jestão Logo"
            className="w-[150px] h-[150px]"
          />
        </div>

        {/* Features */}
        <div className="w-full space-y-5">
          <div
            className="flex items-center p-4 rounded-2xl border"
            style={{ borderColor: colors.border }}
          >
            <div
              className="rounded-xl p-2.5 mr-4"
              style={{ backgroundColor: colors.surface }}
            >
              <Calculator size={24} color={colors.primary} />
            </div>
            <span
              className="font-medium text-base"
              style={{ color: colors.text }}
            >
              Divida contas instantaneamente
            </span>
          </div>

          <div
            className="flex items-center p-4 rounded-2xl border"
            style={{ borderColor: colors.border }}
          >
            <div
              className="rounded-xl p-2.5 mr-4"
              style={{ backgroundColor: colors.surface }}
            >
              <Users size={24} color={colors.primary} />
            </div>
            <span
              className="font-medium text-base"
              style={{ color: colors.text }}
            >
              Gerencie seus grupos
            </span>
          </div>

          <div
            className="flex items-center p-4 rounded-2xl border"
            style={{ borderColor: colors.border }}
          >
            <div
              className="rounded-xl p-2.5 mr-4"
              style={{ backgroundColor: colors.surface }}
            >
              <DollarSign size={24} color={colors.primary} />
            </div>
            <span
              className="font-medium text-base"
              style={{ color: colors.text }}
            >
              Acompanhe seus gastos
            </span>
          </div>
        </div>

        {/* Footer com botão */}
        <div className="flex flex-col items-center w-full">
          <Button
            type="button"
            onClick={() => setIsOpenUser(true)}
            className="font-bold text-lg w-full h-14 rounded-2xl shadow-lg transition-all duration-300"
            style={{
              backgroundColor: colors.primary,
              color: "#000000",
            }}
          >
            Começar
          </Button>

          <p
            className="text-sm mt-6 text-center"
            style={{ color: colors.textSecondary }}
          >
            Menos cálculos e mais diversão.
          </p>
        </div>
      </div>

      <UserRegister isOpen={isOpenUser} setIsOpen={setIsOpenUser} />
    </div>
  );
}

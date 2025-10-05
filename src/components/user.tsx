"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/context/userContext";
import { useTheme } from "@/app/context/themeContext";
import FriendRegister from "./friends";
import { toast } from "sonner";

export default function UserRegister({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [isOpenFriend, setIsOpenFriend] = useState(false);

  const { setUser } = useUser();
  const { colors } = useTheme();
  const [userData, setUserData] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(e.target.value);
  };

  const handleNext = () => {
    if (!userData.trim()) {
      toast.error("Por favor, digite seu nome antes de continuar.", {
        position: "top-right",
      });
      return;
    }
    setIsOpenFriend(true);
    setUser(userData);
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          className="px-4 rounded-t-3xl h-[90vh]"
          style={{ backgroundColor: colors.background }}
        >
          <DrawerHeader className="text-center">
            <DrawerTitle
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              Digite seu nome
            </DrawerTitle>
            <DrawerDescription style={{ color: colors.textSecondary }}>
              Digite seu nome para continuar
            </DrawerDescription>
          </DrawerHeader>
          <div
            className="p-4 space-y-4 flex flex-col md:w-[500px] mx-auto"
            style={{ backgroundColor: colors.background }}
          >
            <Input
              type="text"
              name="name"
              className="h-10 rounded-md w-full"
              placeholder="Nome completo"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
              value={userData}
              onChange={handleChange}
            />

            <Button
              type="button"
              variant={"outline"}
              onClick={handleNext}
              className="text-base cursor-pointer mx-auto w-full h-14 transition-all duration-500"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                color: "#000000",
              }}
            >
              Próximo
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <FriendRegister isOpen={isOpenFriend} setIsOpen={setIsOpenFriend} />
    </>
  );
}

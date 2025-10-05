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
import { Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useFriends } from "@/app/context/friendContext";
import { useUser } from "@/app/context/userContext";
import { useTheme } from "@/app/context/themeContext";

export default function FriendRegister({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { friends, addFriend, removeFriend } = useFriends();
  const [newFriend, setNewFriend] = useState("");
  const { username } = useUser();
  const { colors } = useTheme();

  const router = useRouter();
  const pathName = usePathname();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent
        className="px-4 rounded-t-3xl h-[90vh]"
        style={{ backgroundColor: colors.background }}
      >
        <div
          className="overflow-y-auto max-h-[75vh] pb-4 space-y-4 md:w-[500px] md:mx-auto rounded-xl p-4"
          style={{ backgroundColor: colors.background }}
        >
          <DrawerHeader className="text-center">
            <DrawerTitle
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              Lista de Amigos
            </DrawerTitle>
            <DrawerDescription style={{ color: colors.textSecondary }}>
              Gerencie seus amigos
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex space-x-2">
            <Input
              type="text"
              className="h-10 rounded-md flex-1"
              placeholder="Digite o nome do amigo"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
            />
            <Button
              variant={"outline"}
              onClick={() => {
                addFriend(newFriend);
                setNewFriend("");
              }}
              className="duration-500 transition-all h-10"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                color: "#000000",
              }}
            >
              Adicionar
            </Button>
          </div>

          <ul className="space-y-2">
            {(friends ?? [])
              .filter((friend) => friend.name !== username)
              .map((friend, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border p-2 rounded-md"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  <span style={{ color: colors.text }}>{friend.name}</span>
                  <Button
                    variant="ghost"
                    onClick={() => removeFriend(friend.id)}
                    style={{ color: colors.text }}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </li>
              ))}
          </ul>

          {pathName !== "/home" ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/home")}
              className="text-base cursor-pointer mx-auto w-full h-14 transition-all duration-500"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                color: "#000000",
              }}
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className="text-base cursor-pointer mx-auto w-full h-14 transition-all duration-500"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                color: "#000000",
              }}
            >
              Próximo
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

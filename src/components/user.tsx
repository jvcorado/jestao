"use client";

import { useState } from "react";
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
  const [userData, setUserData] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(e.target.value);
  };

  const handleNext = () => {
    if (!userData.trim()) {
      toast.error("Please enter your name before proceeding.", {
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
        <DrawerContent className="px-4 rounded-t-3xl bg-white  h-[90vh]  ">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-2xl font-bold">
              Write your name
            </DrawerTitle>
            <DrawerDescription>Enter your name to continue</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4 flex flex-col  md:w-[500px] mx-auto">
            <Input
              type="text"
              name="name"
              className="h-10 rounded-md"
              placeholder="Full Name"
              value={userData}
              onChange={handleChange}
            />

            <Button
              type="button"
              variant={"outline"}
              onClick={handleNext}
              className="text-base cursor-pointer mx-auto bg-black w-full h-14 transition-all duration-500 text-white"
            >
              Next
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <FriendRegister isOpen={isOpenFriend} setIsOpen={setIsOpenFriend} />
    </>
  );
}

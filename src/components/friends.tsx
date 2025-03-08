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
import { Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useFriends } from "@/app/context/friendContext";
import { useUser } from "@/app/context/userContext";

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

  const router = useRouter();
  const pathName = usePathname();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="px-4 rounded-t-3xl bg-white h-[90vh]">
        <div className="overflow-y-auto max-h-[75vh] pb-4 space-y-4 md:w-[500px] md:mx-auto  rounded-xl p-4">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-2xl font-bold">
              Friends List
            </DrawerTitle>
            <DrawerDescription>Manage your friends</DrawerDescription>
          </DrawerHeader>

          <div className="flex space-x-2">
            <Input
              type="text"
              className="h-10 rounded-md"
              placeholder="Enter a friend's name"
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
            />
            <Button
              variant={"outline"}
              onClick={() => {
                addFriend(newFriend);
                setNewFriend("");
              }}
              className="duration-500 transition-all h-10 bg-black text-white"
            >
              Add
            </Button>
          </div>

          <ul className="space-y-2">
            {(friends ?? [])
              .filter((friend) => friend.name !== username)
              .map((friend, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white border p-2 rounded-md"
                >
                  <span>{friend.name}</span>
                  <Button
                    variant="ghost"
                    onClick={() => removeFriend(friend.id)}
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
              className="text-base cursor-pointer mx-auto bg-black w-full h-14 transition-all duration-500 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className="text-base cursor-pointer mx-auto bg-black w-full h-14 transition-all duration-500 text-white"
            >
              Close
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

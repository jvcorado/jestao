"use client";

import Image from "next/image";
import start from "../../public/start.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import UserRegister from "@/components/user";

export default function Start() {
  const [isOpenUser, setIsOpenUser] = useState(false);

  return (
    <div className="container mx-auto min-h-screen items-center flex flex-col justify-center gap-4 p-6 ">
      <Image src={start} alt="image" className="w-[250px]" />
      <h1 className="text-4xl font-bold text-center">
        The only expense-splitting app <br /> you’ll ever need
      </h1>
      <p className="text-center">
        Easily split bills with friends, track expenses, and settle up
        effortlessly.
      </p>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => setIsOpenUser(true)}
        className="text-base cursor-pointer bg-black w-40 h-14 transition-all duration-500 text-white"
      >
        Start
      </Button>

      <UserRegister isOpen={isOpenUser} setIsOpen={setIsOpenUser} />
    </div>
  );
}

"use client";

import Image from "next/image";
import bg from "../../../public/images/bg.svg";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/start");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden bg-[#FA483A]">
      <Image
        src={bg}
        alt="Splash Background"
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}

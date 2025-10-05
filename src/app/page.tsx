"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Start() {
  const router = useRouter();

  useEffect(() => {
    router.push("/splash");
  }, [router]);

  return null;
}

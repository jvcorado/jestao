"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  id: number | null;
  username: string | null;
  setUser: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<{
    id: number | null;
    username: string | null;
  }>(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("userId");
      const storedUsername = localStorage.getItem("username");
      return {
        id: storedId ? parseInt(storedId, 10) : Date.now(),
        username: storedUsername || null,
      };
    }
    return { id: Date.now(), username: null };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", String(user.id));
      if (user.username) {
        localStorage.setItem("username", user.username);
      }
    }
  }, [user]);

  const setUser = (name: string) => {
    setUserState((prev) => ({ ...prev, username: name }));
  };

  return (
    <UserContext.Provider
      value={{ id: user.id, username: user.username, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

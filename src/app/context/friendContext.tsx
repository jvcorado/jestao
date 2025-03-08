"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";

export interface ItemType {
  name: string;
  id: number;
}

interface FriendsContextType {
  friends: ItemType[];
  addFriend: (friend: string) => void;
  removeFriend: (id: number) => void;
  clear: () => void;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

export const FriendsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { username, id } = useUser();

  const [friends, setFriends] = useState<ItemType[]>([]);

  // Carregar amigos do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFriends = localStorage.getItem("friendsList");
      try {
        const parsedFriends = storedFriends ? JSON.parse(storedFriends) : [];
        setFriends(Array.isArray(parsedFriends) ? parsedFriends : []);
      } catch {
        setFriends([]); // Se houver erro no JSON, inicializar com array vazio
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("friendsList", JSON.stringify(friends));
    }
  }, [friends]);

  const addFriend = (friendName: string) => {
    if (!friendName || typeof friendName !== "string") {
      console.error("Invalid friend name:", friendName);
      return;
    }

    // Recupera a lista do localStorage
    const storedFriends = localStorage.getItem("friendsList");
    const friends: ItemType[] = storedFriends ? JSON.parse(storedFriends) : [];

    const newFriend: ItemType = {
      name: friendName.trim(),
      id: Date.now(),
    };

    // Verifica se o username já existe na lista antes de adicioná-lo
    const usernameExists = username
      ? friends.some((f) => f.name === username.trim())
      : true;

    const updatedFriends = [...friends, newFriend];

    if (!usernameExists && username?.trim()) {
      updatedFriends.push({
        name: username.trim(),
        id: id ?? 0,
      });
    }

    // Atualiza o localStorage
    localStorage.setItem("friendsList", JSON.stringify(updatedFriends));

    // Atualiza o estado se necessário
    setFriends(updatedFriends);
  };

  const removeFriend = (id: number) => {
    // Recupera a lista do localStorage
    const storedFriends = localStorage.getItem("friendsList");
    const friends: ItemType[] = storedFriends ? JSON.parse(storedFriends) : [];

    // Filtra a lista para remover o amigo com o ID correspondente
    const updatedFriends = friends.filter((friend) => friend.id !== id);

    // Atualiza o localStorage
    localStorage.setItem("friendsList", JSON.stringify(updatedFriends));

    // Atualiza o estado se necessário
    setFriends(updatedFriends);
  };

  // Limpar a lista e adicionar apenas o `username` (se existir)
  const clear = () => {
    setFriends(username ? [{ id: Date.now(), name: username }] : []);
  };

  return (
    <FriendsContext.Provider
      value={{ friends, addFriend, removeFriend, clear }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error("useFriends must be used within a FriendsProvider");
  }
  return context;
};

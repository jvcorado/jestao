import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Delete } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemType, useFriends } from "@/app/context/friendContext";
import { useExpenses } from "@/app/context/expenseContext";
import { useTheme } from "@/app/context/themeContext";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ExpenseCalculator({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { addExpense } = useExpenses();
  const { friends } = useFriends();
  const { colors } = useTheme();
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<ItemType | null>(null);

  const handleNumberClick = (value: string) => {
    setAmount((prev) => (prev === "0" ? value : prev + value));
  };

  const handleDelete = () => {
    setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleClear = () => {
    setAmount("0");
  };

  const handleSave = () => {
    if (!selectedFriend || description.trim() === "") {
      toast.error(
        "Por favor, selecione um amigo e digite uma descrição antes de salvar.",
        {
          position: "top-right",
        }
      );
      return;
    }

    if (amount === "0" || amount === "") return;

    addExpense({
      amount: Number(amount.replace(",", ".")),
      friend: [selectedFriend], // Agora temos certeza de que selectedFriend é válido
      description,
    });

    setAmount("0");
    setDescription("");
    setSelectedFriend(null); // Resetando o amigo selecionado
    setIsOpen(false);
  };

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
              Gastos
            </DrawerTitle>
            <DrawerDescription style={{ color: colors.textSecondary }}>
              Digite o valor do gasto, descrição e selecione um amigo
            </DrawerDescription>
          </DrawerHeader>

          <Select
            onValueChange={(value) =>
              setSelectedFriend(
                friends.find((friend) => String(friend.id) === value) || null
              )
            }
          >
            <SelectTrigger
              className="w-full p-2 h-12 border rounded-md"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              <SelectValue
                placeholder="Selecionar comprador"
                style={{ color: colors.text }}
              />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              {friends.map((item) => (
                <SelectItem
                  key={item.id}
                  value={String(item.id)}
                  style={{ color: colors.text }}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Digite a descrição"
            className="w-full p-2 border h-12 rounded-md"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div
            className="text-center text-4xl font-bold border p-4 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            R${amount}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0"].map(
              (num) => (
                <Button
                  key={num}
                  variant={"outline"}
                  className={cn(
                    "h-16 text-xl cursor-pointer transition-all duration-500"
                  )}
                  style={{
                    backgroundColor:
                      num === "," ? colors.surface : colors.buttonBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                  onClick={() => handleNumberClick(num)}
                >
                  {num}
                </Button>
              )
            )}
            <Button
              className="h-16 transition-all duration-500 cursor-pointer"
              variant={"outline"}
              style={{
                backgroundColor: "#dc2626",
                borderColor: "#dc2626",
                color: "#000000",
              }}
              onClick={handleDelete}
            >
              <Delete color="white" />
            </Button>
            <Button
              variant={"outline"}
              className="h-16 transition-all duration-500 cursor-pointer"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
              onClick={handleClear}
            >
              Limpar
            </Button>
            <Button
              variant={"outline"}
              className="h-16 transition-all duration-500 col-span-2 cursor-pointer"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                color: "#000000",
              }}
              onClick={handleSave}
            >
              Salvar
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

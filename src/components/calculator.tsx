import { useState } from "react";
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
        "Please select a friend and enter a description before saving.",
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
      <DrawerContent className="px-4 rounded-t-3xl bg-white h-[90vh]">
        <div className="overflow-y-auto max-h-[75vh] pb-4 space-y-4 md:w-[500px] md:mx-auto  rounded-xl p-4">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-2xl font-bold">Expenses</DrawerTitle>
            <DrawerDescription>
              Enter your expense amount, description, and select a friend
            </DrawerDescription>
          </DrawerHeader>

          <Select
            onValueChange={(value) =>
              setSelectedFriend(
                friends.find((friend) => String(friend.id) === value) || null
              )
            }
          >
            <SelectTrigger className="w-full p-2 h-12 border rounded-md">
              <SelectValue placeholder="Select buyer" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {friends.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {" "}
                  {/* Converte o id para string */}
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Enter description"
            className="w-full p-2 border h-12 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="text-center text-4xl font-bold border p-4 rounded-2xl">
            ${amount}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0"].map(
              (num) => (
                <Button
                  key={num}
                  variant={"outline"}
                  className={cn(
                    "h-16 text-xl cursor-pointer",
                    num === "," && "bg-gray-100 transition-all duration-500"
                  )}
                  onClick={() => handleNumberClick(num)}
                >
                  {num}
                </Button>
              )
            )}
            <Button
              className="h-16 transition-all duration-500 cursor-pointer bg-red-600"
              variant={"outline"}
              onClick={handleDelete}
            >
              <Delete color="white" />
            </Button>
            <Button
              variant={"outline"}
              className="h-16 transition-all duration-500 cursor-pointer bg-gray-200"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              variant={"outline"}
              className="h-16 transition-all duration-500 col-span-2 cursor-pointer bg-black text-white"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

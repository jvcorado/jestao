"use client";

import { useHistory } from "@/app/context/historyContext";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

export default function HistoryDrawer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { history, clearHistory } = useHistory();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="px-4 rounded-t-3xl bg-white h-[95vh]  border border-black text-black font-mono">
        <div className="overflow-y-auto max-h-[75vh] pb-4 space-y-4 md:w-[500px] md:mx-auto  rounded-xl ">
          <DrawerHeader className="text-center border-b border-black pb-2">
            <DrawerTitle className="text-xl font-bold uppercase">
              Receipt History
            </DrawerTitle>
          </DrawerHeader>

          {history.length > 0 ? (
            <div className="mt-4  bg-white md:w-[500px] mx-auto text-sm">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-black rounded-md bg-white"
                >
                  <h3 className="font-bold text-md border-b border-black pb-1 mb-2">
                    Date: {new Date(entry.timestamp).toLocaleDateString()}
                  </h3>
                  <div className="flex justify-between border-b border-black pb-1 mb-2">
                    <span>Total Amount:</span>
                    <strong>$ {entry.totalAmount.toFixed(2)}</strong>
                  </div>

                  <div className="flex justify-between border-b border-black pb-1 mb-2">
                    <span>Amount per Person:</span>
                    <strong>$ {entry.perPersonAmount.toFixed(2)}</strong>
                  </div>

                  <div className="border-b border-black pb-1 mb-2">
                    <h4 className="font-bold">Payments Due:</h4>
                    <ul>
                      {Object.entries(entry.owes).map(([name, amount]) => (
                        <li key={name} className="flex justify-between">
                          <span>{name} owes:</span>
                          <strong>$ {amount.toFixed(2)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-b border-black pb-1 mb-2">
                    <h4 className="font-bold">Receivables:</h4>
                    <ul>
                      {Object.entries(entry.receives).map(([name, amount]) => (
                        <li key={name} className="flex justify-between">
                          <span>{name} receives:</span>
                          <strong>$ {amount.toFixed(2)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-b border-black pb-1 mb-2">
                    <h4 className="font-bold">Transactions:</h4>
                    <ul>
                      {entry.transactions.map((transaction, i) => (
                        <li key={i} className="flex justify-between">
                          <span>
                            {transaction.from} → {transaction.to}
                          </span>
                          <strong>$ {transaction.amount.toFixed(2)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold">Account Person:</h4>
                    <ul>
                      {entry.accountPerson.map((accountPerson, i) => (
                        <li key={i} className="flex justify-between">
                          <span>
                            {accountPerson.friend.map((item) => item.name)} →{" "}
                            {accountPerson.description}
                          </span>
                          <strong>$ {accountPerson.amount.toFixed(2)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <Button
                variant={"link"}
                className="mt-4 w-full border border-black text-black py-2 rounded-md uppercase font-bold"
                onClick={clearHistory}
              >
                Clear History
              </Button>
            </div>
          ) : (
            <p className="text-center text-gray-800 mt-4">
              No history available.
            </p>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

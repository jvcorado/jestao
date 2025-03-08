import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import { FriendsProvider } from "./context/friendContext";
import { ExpensesProvider } from "./context/expenseContext";
import Head from "next/head";
import { HistoryProvider } from "./context/historyContext";
import { UserProvider } from "./context/userContext";

export const metadata: Metadata = {
  title: "Jestão",
  description:
    "Easily split expenses with friends in a simple and transparent way, hassle-free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="font-poppins antialiased">
        <UserProvider>
          <FriendsProvider>
            <HistoryProvider>
              <Toaster />
              <ExpensesProvider>{children}</ExpensesProvider>
            </HistoryProvider>
          </FriendsProvider>
        </UserProvider>
      </body>
    </html>
  );
}

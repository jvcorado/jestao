import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import { FriendsProvider } from "./context/friendContext";
import { ExpensesProvider } from "./context/expenseContext";
import { HistoryProvider } from "./context/historyContext";
import { UserProvider } from "./context/userContext";
import { ThemeProvider } from "./context/themeContext";

export const metadata: Metadata = {
  title: "Rachô",
  description: "Menos cálculos e mais diversão.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-poppins antialiased">
        <ThemeProvider>
          <UserProvider>
            <FriendsProvider>
              <HistoryProvider>
                <Toaster />
                <ExpensesProvider>{children}</ExpensesProvider>
              </HistoryProvider>
            </FriendsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

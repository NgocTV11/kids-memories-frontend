import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Kids Memories - Family Photo Memories",
  description: "Preserve precious moments of your children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthenticatedLayout>
            {children}
          </AuthenticatedLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

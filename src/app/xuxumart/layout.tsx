import type { Metadata } from "next";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Xuxu Mart - Chi nhánh 6 | Khai trương 09/11/2025",
  description: "Siêu thị thực phẩm Việt Nam uy tín tại Nhật Bản. Khai trương chi nhánh 6 tại Kasai, Tokyo.",
};

export default function XuxumartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

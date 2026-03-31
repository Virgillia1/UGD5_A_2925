import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FlashToastBridge, ToastProvider } from "@/components/toast-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth System",
  description: "Auth System dengan login, register, captcha, toast, dan mini game React Hooks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full">
        <ToastProvider>
          <FlashToastBridge />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

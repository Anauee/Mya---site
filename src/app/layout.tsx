import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mya - AI Agents",
  description: "Clone seu melhor SDR, Vendedor e Atendente com IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

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
      <head>
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "6a0f5105a7e5556380e2dee4";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>
      </head>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MS Multi Services | Acessórios para seu celular",
  description: "Conheça a MS Multi Services. Uma loja de acessórios para celulares com uma identidade feita para você.",
  applicationName: "MS Multi Services",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

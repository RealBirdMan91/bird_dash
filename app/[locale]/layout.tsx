import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import Provider from "./provider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Script from "next/script";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn("dark:bg-slate-900 dark:text-white", inter.className)}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <Sidebar />
            <div className="ml-64 p-6">
              <Header />
              <main className="mt-8">{children}</main>
            </div>
            <ThemeSwitcher />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

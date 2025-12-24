import { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { AuthProvider } from "@/components/providers/auth-provider";
import Navbar from "@/components/navbar";
import { routing } from "@/i18n/routing";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("HomePage");

  return (
    <NextIntlClientProvider>
      <AuthProvider>
        <main>
          <Navbar />
          <div className="w-full text-center">{t("title")}</div>
          {children}
        </main>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}

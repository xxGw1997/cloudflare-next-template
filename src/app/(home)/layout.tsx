import { ReactNode } from "react";

import { AuthProvider } from "@/components/providers/auth-provider";
import Navbar from "@/components/navbar";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        {children}
      </main>
    </AuthProvider>
  );
}

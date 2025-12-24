"use client";

import { useI18nRouter, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { useState } from "react";

import { DEFAULT_LOCALE } from "@/i18n/routing";
import { Button } from "./ui/button";

export default function LocaleSwitcher() {
  const router = useI18nRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const params = useParams();

  const [isPending, setIsPending] = useState(false);
  const onToggleLocale = () => {
    setIsPending(true);
    router.replace({ pathname, params } as any, { locale: nextLocale });
  };

  const curLocale = locale ?? DEFAULT_LOCALE;
  const nextLocale = curLocale === "en" ? "zh" : "en";
  const nextLocaleLabel = nextLocale === "en" ? "English" : "中文";

  return (
    <Button
      variant="ghost"
      size="sm"
      title={nextLocaleLabel}
      disabled={isPending}
      onClick={onToggleLocale}
    >
      <Languages size={18} />
    </Button>
  );
}

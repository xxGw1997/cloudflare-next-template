import { cn } from "@/lib/utils";

import { AuthInlineActions } from "./auth-actions";
import ThemeSwitcher from "./theme-switcher";
import Logo from "./logo";
import MobileNav from "./mobile-nav";

export default async function Navbar({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "supports-backdrop-filter:bg-background/85 sticky top-0 z-100 w-full px-4 py-2 text-sm backdrop-blur",
        "shadow-[0_1px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 sm:gap-3">
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex flex-1 items-center gap-3">
            <Logo />
          </div>
          <div className="flex items-center gap-1.5">
            <AuthInlineActions />
            <ThemeSwitcher />
          </div>
        </div>

        <MobileNav />
      </div>
    </nav>
  );
}

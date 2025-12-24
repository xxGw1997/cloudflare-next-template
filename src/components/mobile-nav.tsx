"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logo from "./logo";
import { AuthInlineActions } from "./auth-actions";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme-switcher";
import LocaleSwitcher from "./locale-switcher";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full sm:hidden">
      <div className="flex items-center justify-between">
        <Logo />

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex justify-center">
              <AuthInlineActions />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-center">
              <LocaleSwitcher />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-center">
              <ThemeSwitcher />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

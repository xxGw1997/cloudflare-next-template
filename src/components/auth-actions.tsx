"use client";

import { LogInIcon, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthContext } from "./providers/auth-provider";
import { Button } from "./ui/button";
import { LoginForm } from "./login-form";
import { UserAvatar } from "./user-avatar";
import { Skeleton } from "./ui/skeleton";

export function AuthInlineActions() {
  const userInfo = useAuthContext();

  const status = userInfo.session.status;

  if (status === "authenticated") {
    return <AccountDialog />;
  } else if (status === "loading") {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  } else {
    return <LoginDialog />;
  }
}

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <LogInIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome Cloudflare next template</DialogTitle>
          <DialogDescription>
            Sign in to keep reading and managing content
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}

export function AccountDialog() {
  const userInfo = useAuthContext();

  const email = userInfo.user?.email;
  const name = userInfo.user?.name;
  const avatar = userInfo.user?.image;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserAvatar name={name} avatar={avatar} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Welcome, {name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{email}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

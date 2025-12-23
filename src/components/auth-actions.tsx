"use client";

import { LogInIcon, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" >
          <UserAvatar name={name} avatar={avatar} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome, {name}</DialogTitle>
          <DialogDescription>Email: {email}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="link" onClick={() => signOut()}>
            <LogOut />
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

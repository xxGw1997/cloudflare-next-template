import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";

type UserAvatarProps = {
  name: string | undefined | null;
  avatar: string | undefined | null;
};

export function UserAvatar({ name, avatar }: UserAvatarProps) {
  const fallback = name ? <span>{name.charAt(0)}</span> : <UserIcon />;

  return (
    <Avatar>
      <AvatarImage src={avatar || undefined} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

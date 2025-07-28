"use client";

import * as React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/store/useAuth";
import { trpc } from "@/trpc/client";

export default function Logout() {
  const router = useRouter();
  const { setLogin } = useAuth();
  const userLogout = trpc.auth.signOut.useMutation();

  const logoutUser = () => {
    userLogout.mutate();
    setLogin(false);
    toast.success("Signed out successfully.");
    router.push("/");
  };

  return (
    <button
      className={cn(
        "w-full",
        "flex flex-row items-center gap-2",
        "p-2 rounded-lg text-sm",
        "text-black dark:text-white",
        "hover:bg-accent",
        "duration-200 cursor-pointer"
      )}
      onClick={logoutUser}
    >
      <LogOut />
      Logout
    </button>
  );
}

"use client";

import { useAuth } from "@/store/useAuth";

interface HideAuthProps {
  children: React.ReactNode;
}

export function HideAuth({ children }: HideAuthProps) {
  const { isLogin } = useAuth();

  if (isLogin) {
    return null;
  }

  return <>{children}</>;
}

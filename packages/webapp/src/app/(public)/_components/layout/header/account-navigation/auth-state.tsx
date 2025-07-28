"use client";

import { ReactNode } from "react";

import { useAuth } from "@/store/useAuth";

export interface IAuthStateProps {
  children: ReactNode;
}

export default function AuthState({ children }: IAuthStateProps) {
  const { isLogin } = useAuth();

  return <div className={isLogin ? "" : "hidden"}>{children}</div>;
}

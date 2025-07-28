"use client";

import { ReactNode } from "react";

import { useAuth } from "@/store/useAuth";

export interface IUnAuthStateProps {
  children: ReactNode;
}

export default function UnAuthState({ children }: IUnAuthStateProps) {
  const { isLogin } = useAuth();

  return <div className={isLogin ? "hidden" : ""}>{children}</div>;
}

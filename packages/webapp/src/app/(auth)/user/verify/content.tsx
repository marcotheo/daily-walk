import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/server";

export interface IContentProps {
  username: string;
  code: string;
}

export async function Verifying({ username, code }: IContentProps) {
  let isVerified = false;
  let caseName = "INTERNAL_SERVER_ERROR";
  let errMessage = "Verification failed. Click Resend to get a new code.";

  try {
    await trpc.users.verifyAccount({ username, code });
    isVerified = true;
  } catch (err: any) {
    caseName = err.code;
    errMessage = err.message;
  }

  if (isVerified)
    return (
      <div className="space-y-5 flex flex-col justify-center items-center">
        <CheckCircle2 className="size-24 text-green-400" />
        <div className="flex items-end gap-3">
          <h1 className="text-3xl font-bold">Account Verified</h1>
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="space-y-5 flex flex-col justify-center items-center">
      <XCircle className="size-24 text-red-400" />
      <div className="flex items-end gap-3">
        <h1 className="text-3xl font-bold max-w-3xl">{errMessage}</h1>
        {["BAD_REQUEST", "INTERNAL_SERVER_ERROR"].includes(caseName) ? (
          <Link href="/signup">
            <Button size="lg">Resend Code</Button>
          </Link>
        ) : (
          <Link href="/">
            <Button size="lg">Home</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

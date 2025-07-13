import { cn } from "@/lib/utils";
import DotsBounce from "./LoadingDots";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  message: string;
  success?: boolean;
  successHeader?: string;
  successMessage?: string;
}

export function LoadingOverlay({
  open,
  message,
  success,
  successHeader,
  successMessage,
}: Props) {
  if (!open) return null;

  return (
    <Dialog open={open}>
      <DialogContent className={cn("sm:max-w-md")} showCloseButton={false}>
        <DialogHeader className="hidden">
          <DialogTitle>needed</DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="flex justify-center items-center gap-2 space-x-3 ">
            <CheckCircle2 className="text-green-400 size-9" />
            <div>
              <p>{successHeader ?? ""}</p>
              <p>{successMessage ?? ""}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            {message}
            <DotsBounce />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

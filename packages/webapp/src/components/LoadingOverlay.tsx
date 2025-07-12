import { cn } from "@/lib/utils";
import DotsBounce from "./LoadingDots";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  message: string;
}

export function LoadingOverlay({ open, message }: Props) {
  if (!open) return null;

  return (
    <Dialog open={open}>
      <DialogContent className={cn("sm:max-w-md")} showCloseButton={false}>
        <DialogHeader className="hidden">
          <DialogTitle>needed</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center gap-2">
          {message}
          <DotsBounce />
        </div>
      </DialogContent>
    </Dialog>
  );
}

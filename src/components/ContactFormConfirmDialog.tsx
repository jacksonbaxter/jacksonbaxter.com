"use client";

import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/AlertDialog";

interface ContactFormConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  isSending: boolean;
  onCancel: () => void;
  onSend: () => void;
}

export default function ContactFormConfirmDialog({
  open,
  onOpenChange,
  email,
  isSending,
  onCancel,
  onSend,
}: ContactFormConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your email</AlertDialogTitle>
          <AlertDialogDescription>
            Use a real email so I can reply directly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <p className="text-sm text-muted-foreground">
          I&apos;ll send my reply to:{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSending} onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSend} disabled={isSending}>
            {isSending ? (
              <>
                <span>Sending...</span>
                <ReloadIcon className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                <span>Send</span>
                <PaperPlaneIcon className="h-4 w-4" />
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { sendEmail } from "@/lib/actions";
import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

const loadContactFormConfirmDialog = () => import("./ContactFormConfirmDialog");
const loadContactFormToaster = () => import("./ContactFormToaster");

const ContactFormConfirmDialog = dynamic(loadContactFormConfirmDialog, {
  ssr: false,
});
const ContactFormToaster = dynamic(loadContactFormToaster, {
  ssr: false,
});

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<Inputs | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [showFeedbackUi, setShowFeedbackUi] = useState(false);

  const prewarmFeedbackUi = useCallback(() => {
    setShowFeedbackUi(true);
    void loadContactFormConfirmDialog();
    void loadContactFormToaster();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadFeedbackUi = () => {
      if (!cancelled) {
        prewarmFeedbackUi();
      }
    };

    const idleCallback =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadFeedbackUi, { timeout: 1500 })
        : null;

    const timeoutId =
      idleCallback === null ? window.setTimeout(loadFeedbackUi, 800) : null;

    return () => {
      cancelled = true;

      if (idleCallback !== null) {
        window.cancelIdleCallback(idleCallback);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [prewarmFeedbackUi]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    prewarmFeedbackUi();

    const honeypotField = formRef.current?.elements.namedItem("website");

    if (honeypotField instanceof HTMLInputElement && honeypotField.value) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setFormData(data);
    setShowConfirmDialog(true);
  };

  const processForm = async () => {
    prewarmFeedbackUi();

    if (!formData) return;

    setIsSending(true);
    const result = await sendEmail(formData);

    if (result.error) {
      toast.error("An error occurred. Please try again later.");
      setIsSending(false);
      return;
    }

    toast.success("Message sent successfully.");
    reset();
    setFormData(null);
    setShowConfirmDialog(false);
    setIsSending(false);
  };

  return (
    <>
      {showFeedbackUi && <ContactFormToaster />}

      <form
        ref={formRef}
        onSubmit={handleSubmit(handleFormSubmit)}
        onFocusCapture={prewarmFeedbackUi}
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="pointer-events-none absolute -left-[9999px] opacity-0"
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="h-16">
            <Input
              id="name"
              type="text"
              placeholder="Name"
              autoComplete="given-name"
              {...register("name")}
            />

            {errors.name?.message && (
              <p className="input-error">{errors.name.message}</p>
            )}
          </div>

          <div className="h-16">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
            />

            {errors.email?.message && (
              <p className="input-error">{errors.email.message}</p>
            )}
          </div>

          <div className="h-32 sm:col-span-2">
            <Textarea
              rows={4}
              placeholder="Drop a note with any website feedback, career opportunities, or a quick hello."
              className="resize-none"
              {...register("message")}
            />

            {errors.message?.message && (
              <p className="input-error">{errors.message.message}</p>
            )}
          </div>
        </div>

        <div className="mt-2">
          <Button
            type="submit"
            disabled={isSubmitting || isSending}
            className="w-full disabled:opacity-50"
          >
            {isSubmitting || isSending ? (
              <>
                <span>Sending...</span>
                <ReloadIcon className="animate-spin" />
              </>
            ) : (
              <>
                <span>Send Message</span>
                <PaperPlaneIcon />
              </>
            )}
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Use a real email so I can reply directly. By submitting this form,
            you agree to the{" "}
            <Link href="/privacy" className="link font-semibold">
              privacy policy.
            </Link>
          </p>
        </div>
      </form>

      {showFeedbackUi && (
        <ContactFormConfirmDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          email={formData?.email}
          isSending={isSending}
          onCancel={() => setFormData(null)}
          onSend={processForm}
        />
      )}
    </>
  );
}

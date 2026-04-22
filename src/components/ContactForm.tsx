"use client";

import { sendEmail } from "@/lib/actions";
import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { resolvedTheme } = useTheme();

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

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    const honeypotField = formRef.current?.elements.namedItem("website");

    if (honeypotField instanceof HTMLInputElement && honeypotField.value) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    const result = await sendEmail(data);

    if (result.error) {
      toast.error("An error occurred. Please try again later.");
      return;
    }

    toast.success("Message sent successfully.");
    reset();
  };

  return (
    <>
      <Toaster
        className="mt-12"
        position="top-right"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />

      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="pointer-events-none absolute -left-[9999px] opacity-0"
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {/* Name */}
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

          {/* Email */}
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

          {/* Message */}
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
            disabled={isSubmitting}
            className="w-full disabled:opacity-50"
          >
            {isSubmitting ? (
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
    </>
  );
}

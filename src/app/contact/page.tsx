import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <article className="mt-12 flex flex-col gap-10 pb-20">
      <h1 className="title">Contact Me.</h1>

      <ContactForm />
    </article>
  );
}

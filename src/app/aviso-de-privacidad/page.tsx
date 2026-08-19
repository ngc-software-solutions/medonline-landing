import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Aviso de privacidad | MedOnline",
  description:
    "Aviso de privacidad de MedOnline, en preparación. Contáctanos directamente si tienes dudas sobre el uso de tus datos.",
  alternates: {
    canonical: "/aviso-de-privacidad",
  },
};

export default function AvisoDePrivacidadPage() {
  return (
    <>
      <main className="flex min-h-[70vh] flex-1 items-center justify-center bg-background px-6 py-24 sm:px-8">
        <div className="flex max-w-xl flex-col items-center gap-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-muted/60 text-primary">
            <FileText className="h-5 w-5" strokeWidth={2} aria-hidden />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Aviso de privacidad
          </h1>
          <p className="text-base leading-relaxed text-foreground/70">
            Este documento está en preparación. Si tienes dudas sobre el uso
            de tus datos personales, contáctanos directamente y con gusto te
            ayudamos.
          </p>
          <a
            href="mailto:ngcsoftwaresolutions@gmail.com"
            className="text-sm font-medium text-primary hover:underline"
          >
            ngcsoftwaresolutions@gmail.com
          </a>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

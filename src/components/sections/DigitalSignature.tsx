import Image from "next/image";
import { ArrowDown, ArrowRight, Info } from "lucide-react";

const SIGNATURE_STEPS = [
  {
    id: "confirmacion",
    number: "1",
    label: "Se confirma la firma",
    src: "/images/signedAlert.webp",
    alt: "Diálogo de confirmación al firmar una Nota de Evolución en MedOnline, advirtiendo que una vez firmada la nota queda inmutable",
    objectPosition: "object-[center_44%]",
  },
  {
    id: "sello",
    number: "2",
    label: "Queda protegida con sello de integridad",
    src: "/images/signed.webp",
    alt: "Bloque de firma digital de una Nota de Evolución en MedOnline, mostrando médico, cédula profesional, fecha de firma y hash de integridad SHA-256",
    objectPosition: "object-[center_76%]",
  },
];

export default function DigitalSignature() {
  return (
    <section
      id="firma-digital"
      className="bg-background py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Intro */}
        <div className="timeline-view max-w-3xl animate-zoom-in animate-range-entry">
          <h2 className="text-4xl leading-tight font-semibold tracking-tight text-foreground lg:text-[3rem] lg:leading-[1.08]">
            Una vez firmado, nadie puede alterarlo (ni por accidente)
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Cada documento clínico queda protegido con firma digital y un sello
            de integridad único. Una vez firmado, el documento no puede
            modificarse, garantizando que el historial de tu paciente sea
            confiable en todo momento, para ti y para cualquier revisión futura.
          </p>
        </div>

        {/* Sequence: firmar -> queda protegido */}
        <div className="timeline-view relative mt-10 animate-zoom-in animate-range-entry animate-delay-150">
          {/* Desktop: horizontal sequence */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
            <SignatureStep {...SIGNATURE_STEPS[0]} />
            <ArrowRight
              className="h-6 w-6 shrink-0 text-primary/50"
              strokeWidth={2}
              aria-hidden
            />
            <SignatureStep {...SIGNATURE_STEPS[1]} />
          </div>

          {/* Mobile / tablet: vertical sequence */}
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <SignatureStep {...SIGNATURE_STEPS[0]} />
            <ArrowDown
              className="h-6 w-6 shrink-0 text-primary/50"
              strokeWidth={2}
              aria-hidden
            />
            <SignatureStep {...SIGNATURE_STEPS[1]} />
          </div>
        </div>

        {/* Disclaimer: datos ilustrativos */}
        <p className="mt-6 flex max-w-3xl items-start gap-1.5 text-xs text-[#94a3b8]">
          <Info
            className="h-3.5 w-3.5 shrink-0 translate-y-0.5"
            strokeWidth={2}
            aria-hidden
          />
          <span>
            Los datos de paciente, médico y cédula profesional mostrados en
            estas capturas son de ejemplo, con fines ilustrativos. No
            corresponden a personas reales.
          </span>
        </p>
      </div>
    </section>
  );
}

function SignatureStep({
  number,
  label,
  src,
  alt,
  objectPosition,
}: {
  number: string;
  label: string;
  src: string;
  alt: string;
  objectPosition: string;
}) {
  return (
    <div className="w-full max-w-md md:max-w-lg">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary text-xs font-semibold text-primary">
          {number}
        </span>
        <span className="text-sm font-semibold text-foreground sm:text-base">
          {label}
        </span>
      </div>
      <div className="relative mt-4">
        <div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[1.5rem] bg-primary-muted/30 blur-2xl"
        />
        <div className="rounded-2xl border border-primary-muted bg-primary-muted/50 p-3 shadow-sm">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={alt}
              fill
              className={`object-cover ${objectPosition}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

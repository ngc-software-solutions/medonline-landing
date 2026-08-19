import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";

const DOCTOR_QUOTE =
  "Desde que implementamos este sistema para el manejo de los expedientes clínicos de nuestros pacientes, toda la información está mucho más ordenada y es mucho más fácil dar seguimiento a cada caso. Además, ahora usamos muchísimo menos papel, y para nuestras enfermeras llevar el registro diario es mucho más sencillo y rápido. Estamos realmente satisfechos con el resultado.";

const CLINIC_URL = "https://clinicasanjuan.net/bienvenida";

export default function FoundingClient() {
  return (
    <section id="cliente-fundador" className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Intro + identity */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2.3fr_1fr] lg:gap-16">
          <div className="timeline-view flex flex-col justify-center animate-zoom-in animate-range-entry">
            <span className="font-mono text-xs tracking-wide text-primary uppercase">
              En producción desde el día uno
            </span>
            <h2 className="mt-3 text-4xl lg:text-[3rem] leading-tight lg:leading-[1.08] font-semibold tracking-tight text-foreground">
              El expediente de Clínica San Juan ya vive en MedOnline
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              MedOnline nació resolviendo un problema real: el expediente
              clínico de Clínica San Juan, a cargo del{" "}
              <strong className="text-foreground">
                Dr. Esmer Jiménez Solís
              </strong>
              . Hoy el sistema está en uso activo, y lo que aprendimos ahí es la
              base de la versión que estamos llevando a más clínicas privadas en
              México.
            </p>
          </div>

          <div className="timeline-view flex items-end border-t border-border pt-8 animate-zoom-in animate-range-entry animate-delay-150 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <div className="flex flex-col gap-6">
              <Image
                src="/clients/logo_color.webp"
                alt="Clínica San Juan"
                width={320}
                height={147}
                className="h-auto w-full max-w-40"
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.7rem] tracking-wide text-foreground/50 uppercase">
                    Responsable de la clínica
                  </span>
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Dr. Esmer Jiménez Solís
                  </span>
                </div>
                <a
                  href={CLINIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Visitar sitio web
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pull quote */}
        <div className="timeline-view relative mt-10 animate-zoom-in animate-range-entry animate-delay-300">
          <span className="font-mono text-xs tracking-wide text-primary uppercase">
            Testimonio
          </span>
          <div className="relative mt-6 border-l-4 border-primary py-1 pl-6 sm:pl-8">
            <Quote
              aria-hidden
              strokeWidth={1.5}
              className="mb-3 h-8 w-8 text-primary/50 sm:h-9 sm:w-9"
            />
            <p className="text-xl leading-relaxed italic font-medium tracking-tight text-foreground sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
              {DOCTOR_QUOTE}
            </p>
            <p className="mt-6 text-sm text-foreground/70 sm:text-base">
              <span className="font-semibold text-foreground">
                Dr. Esmer Jiménez Solís
              </span>{" "}
              — Clínica San Juan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Headphones, Scale, ShieldCheck, Target } from "lucide-react";

const REASONS = [
  {
    id: "datos-propios",
    tag: "Privacidad",
    icon: ShieldCheck,
    title: "Tus datos, solo tuyos.",
    description:
      "Cada clínica tiene su propia instancia dedicada en la nube. No es un sistema donde los datos de distintas clínicas conviven en la misma base de datos. Tu información y la de tus pacientes no se comparte con nadie más.",
  },
  {
    id: "tamano-adecuado",
    tag: "Escala",
    icon: Scale,
    title: "Hecho a la medida de tu consulta.",
    description:
      "Cada función del sistema está pensada para el ritmo real de tu consulta general, con un costo acorde al tamaño de tu clínica.",
  },
  {
    id: "soporte-directo",
    tag: "Soporte",
    icon: Headphones,
    title: "Soporte directo con quien construyó el sistema.",
    description:
      "Equipo local en Cuernavaca, Morelos. Hablas directo con quien conoce tu sistema, sin intermediarios.",
  },
  {
    id: "un-solo-enfoque",
    tag: "Enfoque",
    icon: Target,
    title: "Un solo enfoque: consulta general.",
    description:
      "Especialistas en consulta general, no generalistas en todo. Eso significa que cada función del sistema tiene un propósito claro para tu clínica.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="por-que-medonline"
      className="relative bg-background py-16 md:py-24 lg:py-28"
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_60%_50%_at_50%_0%,var(--color-primary-muted)/25,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-px bg-border/60"
      />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Intro */}
        <div className="timeline-view max-w-3xl animate-zoom-in animate-range-entry">
          <span className="font-mono text-xs tracking-wide text-primary uppercase">
            La diferencia
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-foreground lg:text-[3rem] lg:leading-[1.08]">
            El tamaño correcto para tu consulta general
          </h2>
        </div>

        {/* Reasons: diagonal bento, no sequential numbering */}
        <div className="timeline-view relative mt-16 grid grid-cols-1 gap-x-10 gap-y-12 animate-zoom-in animate-range-entry animate-delay-150 sm:grid-cols-2 sm:gap-y-16">
          {REASONS.map(({ id, tag, icon: Icon, title, description }, i) => (
            <div
              key={id}
              className={`group relative border-t border-border pt-6 transition-transform duration-300 ease-out sm:pt-7 ${
                i % 2 === 1 ? "sm:mt-10" : ""
              }`}
            >
              {/* Ghost watermark icon */}
              <Icon
                aria-hidden
                strokeWidth={1.5}
                className="pointer-events-none absolute -top-2 right-0 h-20 w-20 -rotate-6 text-primary/6 transition-all duration-500 ease-out group-hover:rotate-0 group-hover:text-primary/10 sm:h-24 sm:w-24"
              />

              <div className="relative flex items-start gap-4">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary-muted/40 text-primary transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-primary-muted/70">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>

                <div>
                  <span className="font-mono text-[0.65rem] tracking-widest text-primary/70 uppercase">
                    {tag}
                  </span>
                  <h3 className="mt-1 text-lg leading-snug font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

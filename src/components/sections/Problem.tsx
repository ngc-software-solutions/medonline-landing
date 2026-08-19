import {
  ArrowRightLeft,
  ClipboardList,
  FileText,
  Send,
  Stethoscope,
} from "lucide-react";

const EXPEDIENTE_DOCS = [
  { id: "hoja-frontal", icon: FileText, label: "Hoja Frontal" },
  { id: "historia-clinica", icon: ClipboardList, label: "Historia Clínica" },
  { id: "notas-evolucion", icon: Stethoscope, label: "Notas de Evolución" },
  {
    id: "interconsultas",
    icon: ArrowRightLeft,
    label: "Nota de Interconsultas",
  },
  { id: "referencias", icon: Send, label: "Nota de Referencia/Traslado" },
];

export default function Problem() {
  return (
    <section
      id="problema"
      className="bg-background py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-12">
        {/* Text */}
        <div className="timeline-view animate-zoom-in animate-range-entry">
          <span className="font-mono text-xs tracking-wide text-primary uppercase">
            El problema
          </span>
          <h2 className="mt-3 text-4xl lg:text-[3rem] leading-tight lg:leading-[1.08] font-semibold tracking-tight text-foreground">
            Papel, Excel o un sistema genérico: ninguno te protege de una
            inspección
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Llevar el expediente clínico en papel o en un sistema no pensado
            para el sector salud ya no es solo una molestia operativa. Desde la
            reforma de enero 2026, es un riesgo legal directo para tu clínica. A
            esto se suma lo de siempre: expedientes que se pierden, notas que no
            se encuentran a tiempo, y coordinación difícil cuando hay más de un
            médico. <strong className="text-foreground">MedOnline</strong>{" "}
            centraliza el expediente completo (historia clínica, evolución,
            interconsultas y referencias) en un solo sistema, con la
            trazabilidad y firma digital que exige la normativa mexicana.
          </p>
        </div>

        {/* Expediente card */}
        <div className="timeline-view relative animate-zoom-in animate-range-entry animate-delay-150">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary-muted/30 blur-2xl"
          />
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-foreground">
              Expediente clínico completo
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {EXPEDIENTE_DOCS.map(({ id, icon: Icon, label }) => (
                <li key={id} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-muted/60 text-primary">
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-sm text-foreground/80 sm:text-base">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border pt-4">
              <span className="font-mono text-[0.7rem] tracking-wide text-foreground/50 uppercase">
                Diseñado conforme a NOM-004-SSA3-2012
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

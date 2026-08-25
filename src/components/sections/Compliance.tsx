import {
  ArrowRightLeft,
  ClipboardList,
  FileText,
  Send,
  Stethoscope,
} from "lucide-react";

const NOM_004_LINK = (
  <a
    href="http://www.conamed.gob.mx/gobmx/capacitacion/pdf/p2norte.pdf"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Consultar el texto oficial de la NOM-004-SSA3-2012 (PDF, se abre en una pestaña nueva)"
    className="underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
  >
    NOM-004-SSA3-2012
  </a>
);

const EXPEDIENTE_DOCUMENTS = [
  {
    id: "hoja-frontal",
    icon: FileText,
    title: "Hoja Frontal",
    description:
      "Identificación del paciente y vista consolidada de todo su expediente, siempre actualizada. Incluye datos del establecimiento, del paciente y un índice de todos los documentos ya firmados.",
  },
  {
    id: "historia-clinica",
    icon: ClipboardList,
    title: "Historia Clínica",
    description:
      "Antecedentes, exploración física y diagnóstico inicial del paciente, capturados en su primera consulta. Protegida con firma digital del médico responsable.",
  },
  {
    id: "notas-evolucion",
    icon: Stethoscope,
    title: "Nota de Evolución",
    description:
      "Seguimiento de cada consulta posterior: signos vitales, diagnóstico, tratamiento y medicamentos indicados, con los campos clínicos clave validados antes de firmar.",
  },
  {
    id: "interconsultas",
    icon: ArrowRightLeft,
    title: "Nota de Interconsulta",
    description:
      "Solicitud y respuesta de valoración por especialista, con registro independiente de ambas partes: quién solicita y quién responde.",
  },
  {
    id: "referencias",
    icon: Send,
    title: "Nota de Referencia/Traslado",
    description:
      "Documento formal para referir o trasladar a un paciente a otro establecimiento, con los datos clínicos necesarios para dar continuidad a su atención.",
  },
];

export default function Compliance() {
  return (
    <section id="nom-004" className="bg-background py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Intro */}
        <div className="timeline-view max-w-3xl animate-zoom-in animate-range-entry">
          <span className="font-mono text-xs tracking-wide text-primary uppercase">
            DISEÑADO CONFORME A {NOM_004_LINK}
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-foreground lg:text-[3rem] lg:leading-[1.08]">
            Los cinco documentos que integran tu expediente clínico
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Cada documento sigue su propia estructura, con firma digital que lo
            protege una vez completado
          </p>
        </div>

        {/* Stepper */}
        <div className="timeline-view relative mt-16 animate-zoom-in animate-range-entry animate-delay-150">
          {/* Desktop: horizontal stepper */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden
              className="absolute inset-x-0 top-5 h-px bg-border"
            />
            <div className="relative grid grid-cols-5 gap-6">
              {EXPEDIENTE_DOCUMENTS.map(
                ({ id, icon: Icon, title, description }) => (
                  <div
                    key={id}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-foreground xl:text-lg">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {description}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Mobile / tablet: vertical stepper */}
          <div className="relative lg:hidden">
            <div
              aria-hidden
              className="absolute top-2 bottom-2 left-5 w-px bg-border"
            />
            <div className="relative flex flex-col gap-8">
              {EXPEDIENTE_DOCUMENTS.map(
                ({ id, icon: Icon, title, description }) => (
                  <div key={id} className="flex items-start gap-4">
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground sm:text-lg">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
                        {description}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

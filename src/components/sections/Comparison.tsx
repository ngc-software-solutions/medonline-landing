import { Check, X } from "lucide-react";

const SIN_ITEMS = [
  "Expedientes en papel o Excel, difíciles de consultar y de proteger",
  "Cada nota clínica editable en cualquier momento, sin registro de cambios",
  "Riesgo directo frente a la obligación legal de digitalización (decreto DOF, enero 2026)",
  "Coordinar el expediente entre varios médicos depende de carpetas físicas o archivos sueltos",
  "Sistema genérico (o ninguno) que no distingue Historia Clínica de Nota de Evolución ni de Interconsulta",
];

const CON_ITEMS = [
  "Expediente clínico electrónico centralizado, disponible desde cualquier dispositivo",
  "Firma digital: una vez firmado, el documento queda protegido y no se puede alterar",
  "Diseñado conforme a NOM-004-SSA3-2012, con los cinco documentos del expediente ya estructurados",
  "Todo el equipo médico trabaja sobre el mismo expediente, con roles y permisos diferenciados",
  "Cada tipo de nota clínica en su propio formato, siguiendo la estructura que exige la normativa",
];

export default function Comparison() {
  return (
    <section
      id="sin-con-medonline"
      className="bg-background pt-4 pb-20 md:pb-28 lg:pb-32"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="timeline-view animate-zoom-in animate-range-entry text-center">
          <h2 className="text-4xl lg:text-[3rem] leading-tight lg:leading-[1.08] font-semibold tracking-tight text-foreground sm:text-3xl">
            Así se ve el cambio
          </h2>
          <p className="mt-3 text-foreground/70">
            Así es tu consulta general hoy, y así puede ser con MedOnline
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div className="timeline-view animate-zoom-in animate-range-entry">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/60 uppercase">
              Sin MedOnline
            </h3>
            <ul className="mt-4">
              {SIN_ITEMS.map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-3 border-b border-border/60 py-3 last:border-0"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-border/50 text-foreground/60">
                    <X className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-sm text-foreground/80 sm:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="timeline-view animate-zoom-in animate-range-entry animate-delay-150">
            <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
              Con MedOnline
            </h3>
            <ul className="mt-4">
              {CON_ITEMS.map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-3 border-b border-border/60 py-3 last:border-0"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-muted/60 text-primary">
                    <Check className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-sm text-foreground/80 sm:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

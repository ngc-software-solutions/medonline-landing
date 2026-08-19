import Image from "next/image";
import { Calendar, Info, Search, Tag, UserCog, Users } from "lucide-react";

const MODULES = [
  {
    id: "agenda",
    icon: Calendar,
    title: "Agenda",
    description:
      "Calendario de citas con pre-registro rápido de pacientes nuevos.",
  },
  {
    id: "pacientes",
    icon: Users,
    title: "Pacientes",
    description: "Registro, búsqueda y acceso directo al expediente completo.",
  },
  {
    id: "servicios",
    icon: Tag,
    title: "Servicios",
    description:
      "Catálogo de precios, con tarifas especiales configurables por doctor.",
  },
  {
    id: "usuarios",
    icon: UserCog,
    title: "Usuarios",
    description:
      "Gestión de doctores y enfermeras, con roles y permisos diferenciados.",
  },
  {
    id: "bitacora",
    icon: Search,
    title: "Bitácora de auditoría",
    description:
      "Registro de toda la actividad del sistema, con vista simplificada para administradores de clínica.",
  },
];

const MODULE_SHOTS = [
  {
    id: "agenda",
    icon: Calendar,
    label: "Agenda",
    src: "/images/schedule.webp",
    alt: "Calendario semanal de citas médicas en el módulo de Agenda de MedOnline, con reprogramación y vista por día, semana o mes",
  },
  {
    id: "pacientes",
    icon: Users,
    label: "Pacientes",
    src: "/images/patients.webp",
    alt: "Módulo de Pacientes de MedOnline con listado de expedientes, número de expediente, CURP y estado de cada paciente",
  },
  {
    id: "servicios",
    icon: Tag,
    label: "Servicios",
    src: "/images/services.webp",
    alt: "Catálogo de servicios y precios de consulta en MedOnline, con estado activo/inactivo por servicio",
  },
  {
    id: "bitacora",
    icon: Search,
    label: "Bitácora de auditoría",
    src: "/images/audit.webp",
    alt: "Bitácora de auditoría de MedOnline, con filtros por acción, tipo de recurso, usuario y rango de fechas",
  },
];

export default function Modules() {
  return (
    <section id="modulos" className="bg-background py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Intro */}
        <div className="timeline-view max-w-3xl animate-zoom-in animate-range-entry">
          <span className="font-mono text-xs tracking-wide text-primary uppercase">
            Módulos de gestión de clínica
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-foreground lg:text-[3rem] lg:leading-[1.08]">
            Más que un expediente: la operación completa de tu consulta
          </h2>
        </div>

        {/* Five modules */}
        <div className="timeline-view relative mt-16 grid grid-cols-1 gap-x-10 gap-y-10 animate-zoom-in animate-range-entry animate-delay-150 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {MODULES.map(({ id, icon: Icon, title, description }) => (
            <div key={id} className="border-t border-border pt-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary-muted/40 text-primary">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground sm:text-lg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Module screenshots: Agenda, Pacientes, Servicios & Bitácora */}
        <div className="timeline-view relative mt-16 grid grid-cols-1 gap-6 animate-zoom-in animate-range-entry animate-delay-300 sm:grid-cols-2 md:mt-20 md:gap-8">
          {MODULE_SHOTS.map(({ id, icon: Icon, label, src, alt }) => (
            <div key={id}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-muted/40 py-1.5 pr-3.5 pl-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background text-primary">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-xs font-semibold tracking-wide text-foreground">
                  {label}
                </span>
              </div>
              <div className="relative mt-3">
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
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer: datos ilustrativos */}
        <p className="mt-6 flex max-w-3xl items-start gap-1.5 text-xs text-[#94a3b8]">
          <Info
            className="h-3.5 w-3.5 shrink-0 translate-y-0.5"
            strokeWidth={2}
            aria-hidden
          />
          <span>
            Los datos de pacientes, citas y actividad mostrados en estas
            capturas son generados aleatoriamente, con fines ilustrativos. No
            corresponden a personas reales.
          </span>
        </p>
      </div>
    </section>
  );
}

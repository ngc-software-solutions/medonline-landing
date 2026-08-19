import Image from "next/image";
import { Calendar, Info, Search, Tag, UserCog, Users } from "lucide-react";

const MODULES = [
  {
    id: "agenda",
    icon: Calendar,
    title: "Agenda",
    description:
      "Calendario de citas con pre-registro rápido de pacientes nuevos.",
    src: "/images/schedule.webp",
    alt: "Calendario semanal de citas médicas en el módulo de Agenda de MedOnline, con reprogramación y vista por día, semana o mes",
  },
  {
    id: "pacientes",
    icon: Users,
    title: "Pacientes",
    description: "Registro, búsqueda y acceso directo al expediente completo.",
    src: "/images/patients.webp",
    alt: "Módulo de Pacientes de MedOnline con listado de expedientes, número de expediente, CURP y estado de cada paciente",
  },
  {
    id: "servicios",
    icon: Tag,
    title: "Servicios",
    description:
      "Catálogo de precios, con tarifas especiales configurables por doctor.",
    src: "/images/services.webp",
    alt: "Catálogo de servicios y precios de consulta en MedOnline, con estado activo/inactivo por servicio",
  },
  {
    id: "usuarios",
    icon: UserCog,
    title: "Usuarios",
    description:
      "Gestión de doctores y enfermeras, con roles y permisos diferenciados.",
    src: "/images/users.webp",
    alt: "Módulo de Usuarios de MedOnline con listado de doctores, cédula profesional, especialidad y estado de cuenta",
  },
  {
    id: "bitacora",
    icon: Search,
    title: "Bitácora de auditoría",
    description:
      "Registro de toda la actividad del sistema, con vista simplificada para administradores de clínica.",
    src: "/images/audit.webp",
    alt: "Bitácora de auditoría de MedOnline, con filtros por acción, tipo de recurso, usuario y rango de fechas",
  },
];

export default function Modules() {
  return (
    <section id="modulos" className="bg-background py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Intro + modules grid: single scroll-triggered entrance */}
        <div className="max-w-3xl timeline-view animate-zoom-in animate-range-entry">
          <span className="font-mono text-xs tracking-wide text-primary uppercase">
            Módulos de gestión de clínica
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-foreground lg:text-[3rem] lg:leading-[1.08]">
            Más que un expediente: la operación completa de tu consulta
          </h2>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 timeline-view animate-zoom-in animate-range-entry">
          {MODULES.map(({ id, icon: Icon, title, description, src, alt }) => (
            <div key={id} className="flex flex-col justify-between">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary-muted/40 text-primary">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground sm:text-lg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
                {description}
              </p>

              <div className="relative mt-5">
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
        <p className="mt-8 flex max-w-3xl items-start gap-1.5 text-xs text-[#94a3b8]">
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

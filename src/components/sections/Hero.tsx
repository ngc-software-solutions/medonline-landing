import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Headset,
  Info,
  Lock,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import CardSwap, { Card } from "@/components/CardSwap";
import Button from "@/components/ui/Button";
import HeroScrollButton from "@/components/sections/HeroScrollButton";

const NOM_004_LINK = (
  <a
    href="http://www.conamed.gob.mx/gobmx/capacitacion/pdf/p2norte.pdf"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Consultar el texto oficial de la NOM-004-SSA3-2012 (PDF, se abre en una pestaña nueva)"
    className="inline-flex items-center gap-0.5 underline decoration-foreground/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
  >
    NOM-004-SSA3-2012
    <ArrowUpRight className="h-3 w-3" aria-hidden />
  </a>
);

const TRUST_BULLETS: {
  id: string;
  icon: typeof ShieldCheck;
  text: ReactNode;
}[] = [
  {
    id: "nom-004",
    icon: ShieldCheck,
    text: <>Diseñado conforme a {NOM_004_LINK}</>,
  },
  {
    id: "instancia-dedicada",
    icon: Lock,
    text: "Instancia dedicada por clínica. Tus datos, solo tuyos.",
  },
  {
    id: "soporte-directo",
    icon: Headset,
    text: "Soporte directo del equipo que construye el sistema",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background lg:h-screen mt-18 lg:mt-0"
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 sm:px-8 lg:h-full lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-0">
        {/* Content */}
        <div className="flex flex-col items-start lg:h-full lg:justify-center">
          <Image
            id="hero-logo"
            src="/logo/logo_medonline.svg"
            alt="MedOnline"
            width={168}
            height={40}
            priority
            className="h-12 w-auto animate-fade-in-right"
          />

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning-soft/60 px-4 py-1.5 animate-fade-in-right animate-delay-100">
            <span aria-hidden className="text-sm leading-none">
              <TriangleAlert className="h-3 w-3 text-warning" strokeWidth={2} />
            </span>
            <span className="font-mono text-[0.7rem] tracking-wide text-warning uppercase">
              Decreto 2026: Digitalización obligatoria del expediente clínico
            </span>
          </div>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:mt-6 lg:text-[3.25rem] lg:leading-[1.08] animate-fade-in-right animate-delay-150">
            <span className="text-primary">Tu expediente clínico</span>,
            completo y conforme a NOM-004
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg animate-fade-in-right animate-delay-200">
            Desde el 15 de enero de 2026, el decreto que modifica la Ley General
            de Salud hace obligatoria la digitalización del expediente clínico.
            <strong className="text-foreground"> MedOnline</strong> está
            diseñado conforme a{" "}
            <strong className="text-primary">NOM-004-SSA3-2012</strong> para que
            tu clínica de consulta general cumpla, sin volverse un dolor de
            cabeza operativo.
          </p>

          <div className="mt-10 flex flex-col items-start gap-3 lg:mt-9 animate-fade-in-right animate-delay-250">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight />}>
              Solicitar información
            </Button>
            <p className="text-sm text-foreground/50">
              Sin compromiso. Te contactamos para entender tu clínica.
            </p>
          </div>

          <ul className="mt-10 flex w-full flex-col gap-5 border-t border-border pt-8 lg:mt-4 lg:gap-4 animate-fade-in-right animate-delay-300">
            {TRUST_BULLETS.map(({ id, icon: Icon, text }) => (
              <li key={id} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-muted/60 text-primary">
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-sm text-foreground/75">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel */}
        <div className="relative hidden h-full w-full lg:block animate-fade-in-left">
          <div className="absolute h-126.5 w-225 top-1/2 -right-72 -translate-y-1/2">
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              height={510}
              width={910}
              delay={3000}
            >
              <Card>
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/home.webp"
                    alt="Panel de inicio de MedOnline mostrando la agenda de citas del día y acceso rápido a los módulos de Pacientes, Agenda y Servicios"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </Card>
              <Card>
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/patients.webp"
                    alt="Módulo de Pacientes de MedOnline con listado de expedientes, número de expediente, CURP y estado de cada paciente"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </Card>
              <Card>
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/clinicRecord.webp"
                    alt="Expediente clínico electrónico de un paciente en MedOnline, con acceso a Hoja Frontal, Historia Clínica y Notas de Evolución en un solo lugar"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </Card>
              <Card>
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/schedule.webp"
                    alt="Calendario semanal de citas médicas en el módulo de Agenda de MedOnline, con reprogramación y vista por día, semana o mes"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </Card>
            </CardSwap>
          </div>

          {/* Disclaimer: datos ilustrativos */}
          <p className="absolute bottom-0 inset-x-0 flex items-start gap-1.5 text-start text-xs text-[#94a3b8]">
            <Info
              className="h-3.5 w-3.5 shrink-0 translate-y-0.5"
              strokeWidth={2}
              aria-hidden
            />
            <span>
              Los datos mostrados en estas capturas son generados aleatoriamente
              con fines ilustrativos. No corresponden a pacientes reales.
            </span>
          </p>
        </div>
      </div>

      <HeroScrollButton />
    </section>
  );
}

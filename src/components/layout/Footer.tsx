import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  HomeIcon,
  LayoutGrid,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const navItems = [
  { href: "/#hero", label: "Inicio", icon: HomeIcon },
  { href: "/#cliente-fundador", label: "Testimonio", icon: Stethoscope },
  { href: "/#nom-004", label: "Cumplimiento", icon: ShieldCheck },
  { href: "/#modulos", label: "Módulos", icon: LayoutGrid },
  { href: "/#cta-final", label: "Solicitar información", icon: Send },
];

const legalItems = [
  { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
];

const CONTACT_ITEMS = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    trailingIcon: ArrowUpRight,
    href: "https://wa.me/5660267647",
    external: true,
    label: "WhatsApp",
    detail: "+52 1 566 026 7647",
  },
  {
    id: "email",
    icon: Mail,
    trailingIcon: ChevronRight,
    href: "mailto:ngcsoftwaresolutions@gmail.com",
    external: false,
    label: "Correo",
    detail: "ngcsoftwaresolutions@gmail.com",
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary">
      {/* Ambient glow, echoes the module cards' halo treatment */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-2xl -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-16 pb-10 sm:px-8 lg:px-12 lg:pt-24 lg:pb-12">
        <div className="timeline-view grid grid-cols-1 gap-14 animate-zoom-in animate-range-entry sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Identidad */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <div className="relative h-11 w-48">
              <Image
                src="/logo/logo_blanco.svg"
                alt="MedOnline"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="max-w-sm text-base leading-relaxed text-white/85">
              Expediente clínico electrónico para clínicas privadas en México,
              diseñado conforme a{" "}
              <span className="font-medium text-white">NOM-004-SSA3-2012</span>.
            </p>

            <a
              href="https://ngcsoftwaresolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 py-2 pr-4 pl-4 text-sm text-white/85 transition-all duration-300 hover:border-white/50 hover:bg-white/20 hover:text-white"
            >
              Una solución de
              <span className="font-semibold text-white">
                NGC Software Solutions
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-white/60 transition-colors group-hover:text-white"
                aria-hidden
              />
            </a>
          </div>

          {/* Navegación */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            <h3 className="font-mono text-xs tracking-wide text-white/60 uppercase">
              Navegación
            </h3>
            <ul className="flex flex-col gap-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group -mx-2.5 flex items-center gap-3 rounded-lg px-2.5 py-1.5 transition-all duration-300 hover:bg-white/10"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/20 group-hover:text-white">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="flex-1 text-base text-white/85 transition-colors group-hover:text-white">
                      {label}
                    </span>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 -translate-x-1 text-white/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            <h3 className="font-mono text-xs tracking-wide text-white/60 uppercase">
              Contacto
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CONTACT_ITEMS.map(
                ({
                  id,
                  icon: Icon,
                  trailingIcon: TrailingIcon,
                  href,
                  external,
                  label,
                  detail,
                }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 transition-all duration-300 hover:border-white/30 hover:bg-white/15"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 transition-colors duration-300 group-hover:border-white/50 group-hover:bg-white/20">
                        <Icon
                          className="h-[1.15rem] w-[1.15rem] shrink-0 text-white"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-xs text-white/55">{label}</span>
                        <span className="truncate text-base text-white">
                          {detail}
                        </span>
                      </span>
                      <TrailingIcon
                        className="h-4 w-4 shrink-0 -translate-x-1 text-white/50 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  </li>
                ),
              )}
              <li>
                <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                    <MapPin
                      className="h-[1.15rem] w-[1.15rem] shrink-0 text-white"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-white/55">Ubicación</span>
                    <span className="text-base text-white">
                      Cuernavaca, Morelos, México
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <h3 className="font-mono text-xs tracking-wide text-white/60 uppercase">
              Legal
            </h3>
            <ul className="flex flex-col gap-3.5">
              {legalItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-base text-white/85 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/20 pt-6 sm:flex-row sm:justify-between lg:mt-16">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} NGC Software Solutions. Todos los
            derechos reservados.
          </p>
          <p className="text-sm text-white/50">Hecho en Cuernavaca, Morelos</p>
        </div>
      </div>
    </footer>
  );
}

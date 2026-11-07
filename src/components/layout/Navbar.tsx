"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  HomeIcon,
  GitCompare,
  Stethoscope,
  ShieldCheck,
  LayoutGrid,
} from "lucide-react";
import Button from "@/components/ui/Button";
import NavLink from "@/components/layout/NavLink";

const navItems = [
  { id: "hero", label: "Inicio", icon: HomeIcon },
  { id: "sin-con-medonline", label: "Beneficios", icon: GitCompare },
  { id: "cliente-fundador", label: "Testimonio", icon: Stethoscope },
  { id: "nom-004", label: "Cumplimiento", icon: ShieldCheck },
  { id: "modulos", label: "Módulos", icon: LayoutGrid },
];

const WHATSAPP_URL = "https://wa.me/message/6G2TM7JVJ35VJ1";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Mobile menu links arrive 60ms apart; the whole sequence stays under 400ms.
const staggerDelay = (index: number) => `${Math.min(index * 60, 360)}ms`;

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(navItems[0].id);
  const headerRef = useRef<HTMLElement>(null);

  // rAF throttled: at most one state check per frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Align the pill's vertical position with the Hero logo on lg+ screens,
  // where the header is anchored to the right instead of stacking under it.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const alignToLogo = () => {
      if (window.innerWidth < 1024) {
        header.style.top = "";
        return;
      }
      // getBoundingClientRect() is viewport-relative: once the user scrolls
      // past the Hero, the logo is off-screen and its top goes negative.
      // Skip recalculating in that case so a resize event doesn't clamp the
      // header to top:0 — it just stays anchored at its last good position.
      if (window.scrollY > 100) return;
      const logo = document.getElementById("hero-logo");
      if (!logo) return;
      const logoRect = logo.getBoundingClientRect();
      const top = logoRect.top + logoRect.height / 2 - header.offsetHeight / 2;
      header.style.top = `${Math.max(top, 0)}px`;
    };

    alignToLogo();
    const raf = requestAnimationFrame(() => requestAnimationFrame(alignToLogo));
    // Hero's entrance animation can shift layout briefly; re-align once it settles.
    const settleTimeout = window.setTimeout(alignToLogo, 700);

    window.addEventListener("resize", alignToLogo);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimeout);
      window.removeEventListener("resize", alignToLogo);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile panel: lock page scroll, close on Escape or when resizing to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 640px)");
    const onBreakpoint = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Shared entrance classes for each item of the mobile panel.
  const panelItemClass = `transition-[opacity,transform] duration-500 ${EASE} motion-reduce:translate-y-0 ${
    menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-7 left-1/2 z-30 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 lg:left-auto lg:-right-1/5"
      >
        <nav
          aria-label="Principal"
          className={`flex animate-fade-in items-center justify-between gap-3 rounded-full border py-2 pr-2 pl-4 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${EASE} sm:pl-2 ${
            scrolled || menuOpen
              ? "border-primary/20 bg-white/75 shadow-lg shadow-primary/10"
              : "border-primary-muted bg-primary-muted/50 shadow-sm shadow-primary/5"
          }`}
        >
          {/* Nav desktop */}
          <ul className="scrollbar-hide hidden flex-1 items-center gap-1 overflow-x-auto sm:flex">
            {navItems.map(({ id, label, icon: Icon }, index) => (
              <li key={id} className="shrink-0">
                <NavLink
                  id={id}
                  label={label}
                  Icon={Icon}
                  index={index}
                  isActive={id === activeId}
                  className="animate-fade-in-up"
                />
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
              title="Escríbenos por WhatsApp"
              className={`group flex size-8 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-primary transition-[color,background-color,border-color,transform] duration-300 ${EASE} hover:-translate-y-px hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:scale-[0.98] motion-reduce:hover:translate-y-0`}
            >
              <WhatsAppGlyph className="size-4" />
            </a>
            <Button
              variant="primary"
              size="sm"
              className="rounded-full text-sm"
              onClick={() => scrollTo("cta-final")}
            >
              Solicitar información
            </Button>
          </div>

          {/* Mobile: brand + quick WhatsApp + toggle */}
          <Image
            src="/logo/logo_reducido.svg"
            alt="MedOnline"
            width={140}
            height={31}
            className="h-6 w-auto sm:hidden"
          />
          <div className="flex items-center gap-1 sm:hidden">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
              className="flex size-8 items-center justify-center rounded-full text-primary transition-colors duration-300 hover:bg-primary-muted/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:scale-[0.98]"
            >
              <WhatsAppGlyph className="size-5" />
            </a>
            <button
              type="button"
              className="relative flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors duration-300 hover:bg-primary-muted/40 hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:scale-[0.98]"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {/* Two lines that morph into an X */}
              <span
                aria-hidden
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-500 ${EASE} ${
                  menuOpen ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-500 ${EASE} ${
                  menuOpen ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Nav mobile: full height panel. Rendered outside the header because the
          header's transform would otherwise make `fixed` relative to it. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-0 z-20 flex flex-col bg-background/90 px-4 pt-24 pb-8 backdrop-blur-xl transition-opacity duration-300 ${EASE} sm:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Menú móvil" className="flex flex-1 flex-col">
          <ul className="flex flex-col gap-1">
            {navItems.map(({ id, label, icon: Icon }, index) => (
              <li
                key={id}
                style={{ transitionDelay: menuOpen ? staggerDelay(index) : "0ms" }}
                className={panelItemClass}
              >
                <NavLink
                  id={id}
                  label={label}
                  Icon={Icon}
                  isActive={id === activeId}
                  onClick={closeMenu}
                  style={{}}
                  className="w-full px-4 py-3 text-base"
                />
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              style={{
                transitionDelay: menuOpen ? staggerDelay(navItems.length) : "0ms",
              }}
              className={`group flex items-center gap-3 rounded-2xl border border-primary/20 bg-white/80 p-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:scale-[0.98] ${panelItemClass}`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <WhatsAppGlyph className="size-5" />
              </span>
              <span className="flex flex-1 flex-col">
                <span className="text-sm font-medium text-foreground">
                  Escríbenos por WhatsApp
                </span>
                <span className="text-xs text-foreground/60">
                  Resolvemos tus dudas por chat
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-foreground/40 transition-colors duration-300 group-hover:text-primary"
                aria-hidden
              />
            </a>
            <div
              style={{
                transitionDelay: menuOpen
                  ? staggerDelay(navItems.length + 1)
                  : "0ms",
              }}
              className={panelItemClass}
            >
              <Button
                variant="primary"
                size="md"
                fullWidth
                className="rounded-xl text-base"
                onClick={() => {
                  scrollTo("cta-final");
                  closeMenu();
                }}
              >
                Solicitar información
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

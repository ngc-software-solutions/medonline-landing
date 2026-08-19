"use client";

import { useState, useEffect, useRef } from "react";
import {
  HomeIcon,
  GitCompare,
  Stethoscope,
  ShieldCheck,
  LayoutGrid,
  Menu,
  X,
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

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(navItems[0].id);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <header
      ref={headerRef}
      className={`fixed top-7 left-1/2 lg:left-auto lg:-right-1/5 z-30 w-[calc(100%-2rem)] -translate-x-1/2 transition-all duration-300 ${
        scrolled ? "max-w-5xl" : "max-w-4xl"
      }`}
    >
      <nav className="flex animate-fade-in items-center justify-between gap-4 rounded-full border border-primary-muted bg-primary-muted/50 px-5 py-2.5 shadow-sm backdrop-blur-[5px] transition-all duration-300">
        {/* Nav desktop */}
        <ul className="scrollbar-hide hidden items-center justify-between gap-1 overflow-x-auto sm:flex flex-1">
          {navItems.map(({ id, label, icon: Icon }, index) => (
            <li key={id} className="shrink-0">
              <NavLink
                id={id}
                label={label}
                Icon={Icon}
                index={index}
                isActive={id === activeId}
              />
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 sm:block">
          <Button
            variant="primary"
            size="sm"
            onClick={() => scrollTo("cta-final")}
          >
            Solicitar información
          </Button>
        </div>

        {/* Mobile: brand + toggle */}
        <span className="text-sm font-semibold text-foreground sm:hidden">
          MedOnline
        </span>
        <button
          className="flex items-center justify-center rounded-full border border-transparent p-1.5 text-foreground/70 transition-all duration-300 hover:border-primary/20 hover:bg-primary-muted/25 hover:text-primary sm:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </nav>

      {/* Nav mobile */}
      {menuOpen && (
        <div className="mt-2 flex animate-fade-in-down flex-col gap-1 rounded-2xl border border-primary/20 bg-primary-muted/40 px-3 py-2 shadow-sm backdrop-blur-[5px] sm:hidden">
          {navItems.map(({ id, label, icon: Icon }, index) => (
            <NavLink
              key={id}
              id={id}
              label={label}
              Icon={Icon}
              index={index}
              isActive={id === activeId}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <Button
            variant="primary"
            size="sm"
            fullWidth
            className="mt-1"
            onClick={() => {
              scrollTo("cta-final");
              setMenuOpen(false);
            }}
          >
            Solicitar información
          </Button>
        </div>
      )}
    </header>
  );
}

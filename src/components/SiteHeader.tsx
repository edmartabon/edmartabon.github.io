import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Menu, Moon, Sun, X } from "lucide-react";
import ResumeLink from "@/components/ResumeLink";
import { nav, site } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";

const sectionIds = nav.map((item) => item.href.slice(1));

function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  // Both icons are rendered and swapped with CSS rather than state, so the
  // markup is identical on the server and on first client render.
  //
  // `aria-pressed` carries the state a sighted user reads off the icon. It is
  // false during the server render and the first client render, then syncs
  // from the document, so hydration still matches.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="grid h-11 w-11 place-items-center rounded text-ink-secondary transition-colors duration-150 ease-out hover:text-ink"
      aria-label="Dark theme"
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Moon size={16} aria-hidden className="dark:hidden" />
      <Sun size={16} aria-hidden className="hidden dark:block" />
    </button>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // A sentinel at the top of the document tells us when the header has left
  // the hero, without listening to scroll.
  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // The open menu owns the keyboard and the scroll position.
  //
  // Previously it did neither: focus stayed on the trigger, Tab walked
  // straight past the menu into the page behind it, and the body kept
  // scrolling underneath. Every other control on this site is careful about
  // focus, so this one was the outlier rather than the norm.
  useEffect(() => {
    if (!menuOpen) return;

    const panel = menuRef.current;
    if (!panel) return;

    // Freeze the page. The padding compensates for a scrollbar that is about
    // to disappear, so locking does not shift the layout sideways.
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const focusables = () =>
      [...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
        (el) => el.offsetParent !== null,
      );

    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      // Wrap at both ends so the menu keeps the keyboard while it is open.
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !panel.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [menuOpen]);

  // Focus goes back where it came from, but only after a menu that was
  // actually open closes. Without the ref guard this would steal focus on
  // first mount.
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-md transition-colors duration-200 ease-out ${
        scrolled ? "border-rule" : "border-transparent"
      }`}
    >
      <div className="frame flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="inline-flex h-11 items-center rounded font-display text-[0.9375rem] font-semibold tracking-tight text-ink"
        >
          {site.name}
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative inline-flex h-11 items-center px-3 text-sm transition-colors duration-150 ease-out ${
                      isActive ? "text-ink" : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 bottom-2.5 h-px origin-left bg-ink transition-transform duration-200 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* gap-2, not gap-1: with two bordered controls side by side, four
            pixels reads as one broken segmented control rather than two
            separate actions. */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* The résumé sits in the sticky header on purpose: it is the one
              thing a recruiter came for, and it should never be more than a
              glance away regardless of how far down the page they are.

              Between md and lg there is room for exactly one of these two, so
              the résumé takes it. The address is still spelled out in full as
              the primary control in contact; the file is not repeated
              anywhere else above the fold. */}
          <ResumeLink className="btn btn-secondary hidden text-[0.8125rem] md:inline-flex" />
          <a
            href={`mailto:${site.email}`}
            className="btn btn-secondary hidden text-[0.8125rem] lg:inline-flex"
          >
            Email
          </a>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="grid h-11 w-11 place-items-center rounded text-ink md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="animate-menu origin-top border-t border-rule bg-paper md:hidden"
        >
          <nav aria-label="Sections" className="frame py-2">
            <ul className="divide-y divide-rule">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[3rem] items-center text-[0.9375rem] text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <ResumeLink
                  label="Download résumé"
                  onClick={closeMenu}
                  className="flex min-h-[3rem] items-center gap-1.5 text-[0.9375rem] text-ink"
                />
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  onClick={closeMenu}
                  className="flex min-h-[3rem] items-center text-[0.9375rem] text-ink"
                >
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

/** Small copy-to-clipboard control, reused by the contact section. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(site.email).then(
          () => setCopied(true),
          () => setCopied(false),
        );
      }}
      className="btn btn-secondary text-[0.8125rem]"
    >
      {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}

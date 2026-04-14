"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from 'react-dom';
import { useState, useEffect, useRef } from "react";
import { Menu, X, Instagram, Twitter, Facebook } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/data-provider";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [activeLink, setActiveLink] = useState("/#home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const { data: settings } = useSettings();
  const isClicking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isClicking.current) return;
      
      const sections = navLinks.map(link => {
        const id = link.href.substring(2);
        return id ? document.getElementById(id) : null;
      });
      const scrollPosition = window.scrollY + 130;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveLink(`/#${section.id}`);
          break;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      setIsMenuOpen(false);
      setActiveLink(href);
      isClicking.current = true;

      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 120; // Final precise offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Remove hash from URL if it exists
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }

      setTimeout(() => {
        isClicking.current = false;
      }, 1000);
    } else {
      setIsMenuOpen(false);
      setActiveLink(href);
    }
  };


  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = activeLink === href;
    const isHomePage = pathname === "/";

    if (isHomePage && href.startsWith("/#")) {
      return (
        <a
          href={href}
          className={cn(
            "relative py-2 text-sm font-medium transition-colors duration-300",
            isActive
              ? "text-primary"
              : "text-foreground/80 hover:text-foreground",
            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300 after:origin-left",
            isActive ? "after:scale-x-100" : "after:scale-x-0"
          )}
          onClick={(e) => handleLinkClick(e, href)}
        >
          <span>{label}</span>
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          "relative py-2 text-sm font-medium transition-colors duration-300",
          isActive
            ? "text-primary"
            : "text-foreground/80 hover:text-foreground",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300 after:origin-left",
          isActive ? "after:scale-x-100" : "after:scale-x-0"
        )}
        onClick={(e) => handleLinkClick(e, href)}
      >
        <span>{label}</span>
      </Link>
    );
  };

  // On mobile (max-width 767px), always show header since hover doesn't exist.
  // On desktop, show based on scroll or hover position.
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobileScreen(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const showHeader = isMobileScreen || isScrolled || isHovered;

  return (
    <>
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        showHeader 
          ? "translate-y-0 opacity-100 border-b border-border/60 bg-background shadow-sm" 
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="container flex h-14 items-center justify-between px-4 max-w-full">
        {pathname === "/" ? (
          <a
            href="/#home"
            onClick={(e) => handleLinkClick(e, "/#home")}
            className="flex items-baseline gap-2 shrink-0"
          >
            <span className="font-bold font-headline text-2xl md:text-3xl tracking-[0.2em]">
              THE
            </span>
            <span className="hidden sm:inline-block text-[0.65rem] md:text-xs font-body tracking-widest uppercase whitespace-nowrap opacity-80">
              Through Hardik's Eye
            </span>
          </a>
        ) : (
          <Link
            href="/#home"
            onClick={(e) => handleLinkClick(e, "/#home")}
            className="flex items-baseline gap-2 shrink-0"
          >
            <span className="font-bold font-headline text-2xl md:text-3xl tracking-[0.2em]">
              THE
            </span>
            <span className="hidden sm:inline-block text-[0.65rem] md:text-xs font-body tracking-widest uppercase whitespace-nowrap opacity-80">
              Through Hardik's Eye
            </span>
          </Link>
        )}
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
              ))}
          </nav>
          <div className="flex items-center gap-3">
            {settings?.twitter && (
              <Link href={settings.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-4 w-4 opacity-80 transition-opacity hover:opacity-100" />
              </Link>
            )}
            {settings?.facebook && (
              <Link href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-4 w-4 opacity-80 transition-opacity hover:opacity-100" />
              </Link>
            )}
            {settings?.instagram && (
              <Link href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-4 w-4 opacity-80 transition-opacity hover:opacity-100" />
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
      </div>
    </header>
    {/* Full-Screen Minimalist Mobile Menu Overlay via Portal */}
      {isMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          style={{ backgroundColor: 'hsl(40, 33%, 96%)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', zIndex: 9999, display: 'flex', flexDirection: 'column' }}
          className="md:hidden animate-in fade-in duration-300"
        >          {/* Top Bar inside overlay */}
          <div className="flex justify-between items-center px-4 h-14 w-full shrink-0">
            <a 
              href="/#contact" 
              onClick={(e) => handleLinkClick(e, "/#contact")} 
              className="flex items-center gap-2 font-body font-bold text-xs sm:text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
            >
              TOUCH <span className="text-lg leading-none transform translate-y-[-1px]">&rarr;</span> GET IN
            </a>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="hover:bg-transparent">
              <X className="h-7 w-7" strokeWidth={1.5} />
              <span className="sr-only">Close Menu</span>
            </Button>
          </div>

          <div className="flex flex-col h-full w-full overflow-y-auto">
            {/* Massive Right-Aligned Navigation */}
            <nav className="flex flex-col items-end justify-center flex-1 w-full px-6 gap-0">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      "font-body font-black text-[3.5rem] sm:text-7xl leading-[0.9] tracking-tighter uppercase transition-colors duration-300 py-1",
                      isActive 
                        ? "text-primary" 
                        : "text-foreground hover:text-foreground/70"
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            
            {/* Social Bottom Line */}
            <div className="flex items-center justify-between pb-10 px-6 pt-6 w-full shrink-0">
              <span className="text-xs uppercase tracking-widest opacity-50 font-medium">Follow</span>
              <div className="flex gap-6">
                {settings?.instagram && (
                  <Link href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5 opacity-80 hover:opacity-100 transition-opacity" />
                  </Link>
                )}
                {settings?.twitter && (
                  <Link href={settings.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-5 w-5 opacity-80 hover:opacity-100 transition-opacity" />
                  </Link>
                )}
                {settings?.facebook && (
                  <Link href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-5 w-5 opacity-80 hover:opacity-100 transition-opacity" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

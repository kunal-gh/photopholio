"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      const scrollPosition = window.scrollY + 110;

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
    setIsMenuOpen(false);
    setActiveLink(href);
    isClicking.current = true;
    
    if (pathname === '/' && href.startsWith('/#')) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        const headerOffset = 100; // Absolute pixel offset for the fixed glass header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        // Remove hash from URL if it exists
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    }
    }

    setTimeout(() => {
        isClicking.current = false;
    }, 1000); // Reset after 1 second
  };


  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = activeLink === href;
    const isHomePage = pathname === '/';
    
    if (isHomePage && href.startsWith('/#')) {
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
          onClick={(e) => handleLinkClick(e as any, href)}
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
        onClick={(e) => handleLinkClick(e as any, href)}
      >
        <span>{label}</span>
      </Link>
    );
  };

  const showHeader = isScrolled || isHovered;

  return (
    <>
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        showHeader 
          ? "translate-y-0 opacity-100 border-b border-border/60 bg-background/80 backdrop-blur-lg shadow-sm" 
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="container flex h-14 items-center justify-between px-4 sm:px-4">
        {pathname === '/' ? (
          <a href="/#home" onClick={(e) => handleLinkClick(e as any, '/#home')} className="flex items-baseline gap-2 md:gap-3">
              <span className="font-bold sm:inline-block font-headline text-2xl md:text-4xl tracking-[0.2em]">
                  THE
              </span>
              <span className="hidden sm:inline-block text-xs md:text-sm font-body tracking-widest uppercase whitespace-nowrap opacity-80">
                  Through Hardik's Eye
              </span>
          </a>
        ) : (
          <Link href="/#home" onClick={(e) => handleLinkClick(e as any, '/#home')} className="flex items-baseline gap-2 md:gap-3">
              <span className="font-bold sm:inline-block font-headline text-2xl md:text-4xl tracking-[0.2em]">
                  THE
              </span>
              <span className="hidden sm:inline-block text-xs md:text-sm font-body tracking-widest uppercase whitespace-nowrap opacity-80">
                  Through Hardik's Eye
              </span>
          </Link>
        )}
        
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
              ))}
          </nav>
          <div className="flex items-center gap-4">
            {settings?.twitter && (
              <Link href={settings.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 opacity-80 transition-opacity hover:opacity-100" />
              </Link>
            )}
            {settings?.facebook && (
              <Link href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 opacity-80 transition-opacity hover:opacity-100" />
              </Link>
            )}
            {settings?.instagram && (
              <Link href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 opacity-80 transition-opacity hover:opacity-100" />
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
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col items-center gap-4 py-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
            </nav>
        </div>
      )}
    </header>
    </>
  );
}

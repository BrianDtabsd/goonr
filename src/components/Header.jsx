import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { getSiteMeta } from '../config/siteMeta';
import { useVisibility } from '../hooks/useVisibility';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { brandName } = getSiteMeta();
  const { isPageVisible } = useVisibility();

  const navLinks = [
    { name: 'How it works', href: '/#methodology', show: true },
    { name: 'Pricing', href: '/#pricing', show: true },
    { name: 'Learn', href: '/learn', show: isPageVisible('learn') },
    { name: 'Shop', href: '/store', show: isPageVisible('store') },
  ].filter((l) => l.show);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-6 lg:px-8
        ${isScrolled ? 'py-4' : 'py-6'}
      `}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          className={`
            glass-nav flex items-center justify-between px-6 py-4 mx-auto
            transition-all duration-500 ease-out
            ${isScrolled ? 'shadow-2xl' : 'shadow-none'}
          `}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <iconify-icon icon="solar:planet-3-bold-duotone" width="24" height="24" style={{ color: 'white' }}></iconify-icon>
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
              {brandName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                href={link.href}
                variant="empty"
                className="text-sm font-medium !px-3 !py-2"
              >
                {link.name}
              </Button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isPageVisible('checkout') ? (
              <Button to="/checkout" variant="empty" className="text-sm font-medium !px-3 !py-2">
                Checkout
              </Button>
            ) : null}
            <Button href="/#pricing" variant="primary" className="text-sm">
              Subscribe
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <iconify-icon
              icon={isMobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
              width="28"
              height="28"
            ></iconify-icon>
          </button>
        </div>

        <div
          className={`
            md:hidden absolute top-full left-4 right-4 mt-2
            bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6
            transition-all duration-300 origin-top
            ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
          `}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                href={link.href}
                variant="empty"
                className="text-lg font-medium !justify-start w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Button>
            ))}
            <div className="h-px bg-white/10 my-2" />
            {isPageVisible('checkout') ? (
              <Button
                to="/checkout"
                variant="empty"
                className="text-lg font-medium !justify-start w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Checkout
              </Button>
            ) : null}
            <Button
              href="/#pricing"
              variant="primary"
              className="w-full mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Subscribe
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

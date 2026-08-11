import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useSiteMeta } from '../hooks/useSiteMeta';
import { useVisibility } from '../hooks/useVisibility';

function getScrollParent(node) {
  let el = node?.parentElement;
  while (el) {
    const { overflowY } = getComputedStyle(el);
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return el;
    }
    el = el.parentElement;
  }
  return window;
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const root = headerRef.current;
    const scroller = getScrollParent(root);
    const readY = () => (scroller === window ? window.scrollY : scroller.scrollTop);

    const handleScroll = () => {
      setIsScrolled(readY() > 8);
    };
    handleScroll();
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  const { brandName } = useSiteMeta();
  const { isPageVisible } = useVisibility();

  const navLinks = [
    { name: 'How it works', href: '/#methodology', show: true },
    { name: 'Pricing', href: '/#pricing', show: true },
    { name: 'Learn', href: '/learn', show: isPageVisible('learn') },
    { name: 'Shop', href: '/store', show: isPageVisible('store') },
  ].filter((l) => l.show);

  const linkClass =
    '!px-3 !py-2 !normal-case !tracking-[0.1em] !font-bold !text-[11px]';

  return (
    <header
      ref={headerRef}
      className={`site-header-slot ${isScrolled ? 'is-scrolled' : ''}`}
      data-scrolled={isScrolled ? 'true' : 'false'}
    >
      {/* Opaque band so scrolled content disappears under the nav */}
      <div className="site-header-mask" aria-hidden="true" />

      <div className="relative z-10 w-full">
        <div className="site-nav flex items-center justify-between gap-3 px-0 sm:px-1 py-4 w-full">
          <Link to="/" className="flex items-center gap-3 group min-w-0 shrink-0">
            <span className="flex items-center gap-2.5 min-w-0">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--ds-color-accent)' }}
                aria-hidden="true"
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.14em] truncate"
                style={{ color: 'var(--ds-color-ink)', fontFamily: 'var(--font-label)' }}
              >
                {brandName}
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 min-w-0">
            {navLinks.map((link) => (
              <Button key={link.name} href={link.href} variant="empty" className={linkClass}>
                {link.name}
              </Button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            {isPageVisible('checkout') ? (
              <Button to="/checkout" variant="empty" className={linkClass}>
                Checkout
              </Button>
            ) : null}
            <Button href="/#pricing" variant="primary">
              Subscribe
            </Button>
          </div>

          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: 'var(--ds-color-ink)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <iconify-icon
              icon={
                isMobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'
              }
              width="28"
              height="28"
            ></iconify-icon>
          </button>
        </div>

        <div
          className={`
            md:hidden absolute top-full left-0 right-0 mt-2
            border rounded-lg p-5 transition-all duration-300 origin-top z-20
            ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
          `}
          style={{
            background: 'var(--ds-color-surface)',
            borderColor: 'var(--ds-color-line)',
          }}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                href={link.href}
                variant="empty"
                className="text-lg font-medium !justify-start w-full !rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Button>
            ))}
            <div
              className="h-px my-2"
              style={{ background: 'var(--ds-color-line)' }}
            />
            {isPageVisible('checkout') ? (
              <Button
                to="/checkout"
                variant="empty"
                className="text-lg font-medium !justify-start w-full !rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Checkout
              </Button>
            ) : null}
            <Button
              href="/#pricing"
              variant="primary"
              className="w-full mt-2 !rounded-xl"
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

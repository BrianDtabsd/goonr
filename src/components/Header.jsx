import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useSiteMeta } from '../hooks/useSiteMeta';
import { useVisibility } from '../hooks/useVisibility';
import { useTheme } from '../hooks/useTheme';

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
  const { theme } = useTheme();
  const isContainer = theme.layoutMode === 'container';
  const isFoundation = theme.surfaceSystem === 'foundation';

  useEffect(() => {
    const root = headerRef.current;
    const scroller = getScrollParent(root);
    const readY = () =>
      scroller === window ? window.scrollY : scroller.scrollTop;

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

  return (
    <header
      ref={headerRef}
      className={`site-header-slot ${isScrolled ? 'is-scrolled' : ''}`}
      data-scrolled={isScrolled ? 'true' : 'false'}
    >
      {/* Opaque band so scrolled content disappears under the nav */}
      <div
        className={`site-header-mask ${isContainer ? 'site-header-mask--container' : ''}`}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        <div
          className={`
            glass-nav glass-nav--docked flex items-center justify-between gap-3
            ${isFoundation ? 'px-0 sm:px-1 py-4' : 'px-4 sm:px-5 py-3'}
            w-full
          `}
        >
          <Link to="/" className="flex items-center gap-3 group min-w-0 shrink-0">
            {isFoundation ? (
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
            ) : (
              <>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor}, color-mix(in srgb, ${theme.primaryColor} 55%, #111))`,
                  }}
                >
                  <iconify-icon
                    icon="solar:bag-bold-duotone"
                    width="20"
                    height="20"
                    style={{ color: 'white' }}
                  ></iconify-icon>
                </div>
                <span className="font-semibold text-lg tracking-tight truncate group-hover:opacity-90 transition-opacity text-[color:var(--color-heading)]">
                  {brandName}
                </span>
              </>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 min-w-0">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                href={link.href}
                variant="empty"
                className={
                  isFoundation
                    ? '!px-3 !py-2 !normal-case !tracking-[0.1em] !font-bold !text-[11px]'
                    : 'text-sm font-medium !px-3 !py-2 !rounded-lg'
                }
              >
                {link.name}
              </Button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            {isPageVisible('checkout') ? (
              <Button
                to="/checkout"
                variant="empty"
                className={
                  isFoundation
                    ? '!px-3 !py-2 !normal-case !tracking-[0.1em] !font-bold !text-[11px]'
                    : 'text-sm font-medium !px-3 !py-2 !rounded-lg'
                }
              >
                Checkout
              </Button>
            ) : null}
            <Button
              href="/#pricing"
              variant="primary"
              className={isFoundation ? '' : 'text-sm !rounded-xl'}
            >
              Subscribe
            </Button>
          </div>

          <button
            className="md:hidden p-2 transition-colors text-[color:var(--color-heading)]"
            style={{ color: isFoundation ? 'var(--ds-color-ink)' : undefined }}
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
            border p-5 transition-all duration-300 origin-top z-20
            ${isFoundation ? 'rounded-lg' : 'rounded-2xl glass-nav'}
            ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
          `}
          style={
            isFoundation
              ? {
                  background: 'var(--ds-color-surface)',
                  borderColor: 'var(--ds-color-line)',
                }
              : undefined
          }
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
              style={{
                background: isFoundation
                  ? 'var(--ds-color-line)'
                  : 'rgba(var(--frost-rgb), 0.2)',
              }}
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

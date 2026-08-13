import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { useSiteMeta } from '../hooks/useSiteMeta';
import { useVisibility } from '../hooks/useVisibility';
import { useTheme } from '../hooks/useTheme';
import { useScrollContainer } from '../context/ScrollContainerContext';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const {
    scrollElementRef,
    hasScrollElement,
    scrollToHash,
    setScrollPaddingTop,
  } = useScrollContainer();
  const location = useLocation();
  const { theme } = useTheme();
  const isFoundation = theme.surfaceSystem === 'foundation';

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (!hasScrollElement || !scrollElement) return undefined;

    const handleScroll = () => {
      setIsScrolled(scrollElement.scrollTop > 12);
    };
    handleScroll();
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [hasScrollElement, scrollElementRef]);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    const header = headerRef.current;
    if (!hasScrollElement || !scrollElement || !header) return undefined;

    const updateScrollPadding = () => {
      setScrollPaddingTop(header.offsetHeight);
    };
    updateScrollPadding();

    const observer = new ResizeObserver(updateScrollPadding);
    observer.observe(header);
    return () => observer.disconnect();
  }, [hasScrollElement, scrollElementRef, setScrollPaddingTop]);

  const handleHashClick = (event, href) => {
    if (!href.startsWith('/#') || location.pathname !== '/') return;
    if (scrollToHash(href.slice(1))) {
      event.preventDefault();
    }
  };

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
                onClick={(event) => handleHashClick(event, link.href)}
                className={
                  isFoundation
                    ? '!px-3 !py-2 !normal-case !tracking-[0.1em] !font-bold !text-[11px]'
                    : 'text-sm font-medium !px-3 !py-2 !rounded-lg text-zinc-300 hover:text-white'
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
                    : 'text-sm font-medium !px-3 !py-2 !rounded-lg text-zinc-300'
                }
              >
                Checkout
              </Button>
            ) : null}
            <Button
              href="/#pricing"
              variant="primary"
              className={isFoundation ? '' : 'text-sm !rounded-xl'}
              onClick={(event) => handleHashClick(event, '/#pricing')}
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
                onClick={(event) => {
                  handleHashClick(event, link.href);
                  setIsMobileMenuOpen(false);
                }}
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
              onClick={(event) => {
                handleHashClick(event, '/#pricing');
                setIsMobileMenuOpen(false);
              }}
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

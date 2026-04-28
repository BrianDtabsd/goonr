import React from 'react';
import Button from './Button';
import { getSiteMeta } from '../config/siteMeta';
import { useVisibility } from '../hooks/useVisibility';

export default function Footer() {
  const { brandName, footerBlurb } = getSiteMeta();
  const { isPageVisible } = useVisibility();

  return (
    <footer className="relative bg-transparent xl border-t border-transparent pt-16 pb-6 px-6 md:px-8 lg:px-12 w-full h-full">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0f172a" strokeWidth="0.6"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)"></rect>
        </svg>
      </div>

      <div className="mx-auto max-w-[1360px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full border border-blue-200/70 bg-gradient-to-br from-white to-blue-50/90">
                <svg className="w-4 h-4 text-blue-600" viewBox="0 0 48 48" aria-hidden="true" fill="none">
                  <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.6" opacity="0.9"></circle>
                  <circle cx="24" cy="24" r="5" fill="currentColor" opacity="0.95"></circle>
                  <path d="M24 7.5C30 12 33 17 33 24C33 31 30 36 24 40.5" stroke="currentColor" strokeWidth="1.4" opacity="0.7"></path>
                  <path d="M24 7.5C18 12 15 17 15 24C15 31 18 36 24 40.5" stroke="currentColor" strokeWidth="1.4" opacity="0.45"></path>
                  <path d="M8 24H40" stroke="currentColor" strokeWidth="1.2" opacity="0.35"></path>
                </svg>
              </div>
              <span className="text-[15px] font-medium tracking-tight text-slate-900 drop-shadow-sm">
                {brandName}
              </span>
            </div>
            <p className="text-sm text-slate-800/80 leading-[1.8] max-w-md font-medium">{footerBlurb}</p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-80 mb-5 drop-shadow-sm">
              Product
            </h4>
            <ul className="flex flex-col gap-2 items-start">
              <li>
                <Button href="/#features" variant="empty" className="!px-0 !py-1 !h-auto !min-h-0 text-[13.5px] font-medium opacity-80 hover:opacity-100">
                  Why subscribe
                </Button>
              </li>
              <li>
                <Button href="/#methodology" variant="empty" className="!px-0 !py-1 !h-auto !min-h-0 text-[13.5px] font-medium opacity-80 hover:opacity-100">
                  How it works
                </Button>
              </li>
              <li>
                <Button href="/#pricing" variant="empty" className="!px-0 !py-1 !h-auto !min-h-0 text-[13.5px] font-medium opacity-80 hover:opacity-100">
                  Pricing
                </Button>
              </li>
              {isPageVisible('checkout') ? (
                <li>
                  <Button href="/checkout" variant="empty" className="!px-0 !py-1 !h-auto !min-h-0 text-[13.5px] font-medium opacity-80 hover:opacity-100">
                    Checkout
                  </Button>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-80 mb-5 drop-shadow-sm">
              More
            </h4>
            <ul className="flex flex-col gap-2 items-start">
              <li>
                <Button href="/#faq" variant="empty" className="!px-0 !py-1 !h-auto !min-h-0 text-[13.5px] font-medium opacity-80 hover:opacity-100">
                  FAQ
                </Button>
              </li>
              {isPageVisible('learn') ? (
                <li>
                  <Button to="/learn" variant="empty" className="!px-0 !py-1 !h-auto !min-h-0 text-[13.5px] font-medium opacity-80 hover:opacity-100">
                    Learn
                  </Button>
                </li>
              ) : null}
              {isPageVisible('store') ? (
                <li>
                  <Button to="/store" variant="empty" className="!px-0 !py-1 !h-auto !min-h-0 text-[13.5px] font-medium opacity-80 hover:opacity-100">
                    Shop
                  </Button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="border-t border-transparent pt-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-600 font-medium">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-100/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-800 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

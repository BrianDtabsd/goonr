import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { homeSections as homeSectionsBase } from '../content/home';
import { heroContent as heroBase } from '../content/hero';
import { pricingIntro as pricingIntroBase, pricingTiers as pricingTiersBase } from '../content/pricing';
import { storeIntro as storeIntroBase, storeProducts as storeProductsBase } from '../content/store';
import { blogIntro as blogIntroBase, blogPosts as blogPostsBase } from '../content/blog';
import { salesIntro as salesIntroBase, salesProducts as salesProductsBase } from '../content/sales';
import {
  systemLogicIntro as systemLogicIntroBase,
  systemLogicSteps as systemLogicStepsBase,
} from '../content/systemLogic';

const STORAGE_KEY = 'gaqo-template-content-overrides-v1';

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function mergeDelta(cur, partial) {
  if (!partial) return cur || {};
  const out = { ...cur, ...partial };
  if (partial.cta != null && (cur?.cta != null || partial.cta)) {
    out.cta = { ...(cur?.cta || {}), ...partial.cta };
  }
  return out;
}

function mergeFlat(base, delta) {
  if (!delta) return base;
  return { ...base, ...delta };
}

function mergeHomeSections(baseSections, homePatch) {
  if (!homePatch) return baseSections;
  return baseSections.map((section) => {
    const p = homePatch[section.id];
    if (!p) return section;
    let header = section.header;
    if (section.header != null && p.header) {
      header = { ...section.header, ...p.header };
    }
    let cards = section.cards;
    if (p.cards) {
      cards = section.cards.map((c, i) => mergeCard(c, p.cards[i]));
    }
    return { ...section, header, cards };
  });
}

function mergeCard(base, delta) {
  if (!delta) return base;
  const out = mergeDelta(base, delta);
  if (delta.items != null) out.items = delta.items;
  if (delta.pills != null) out.pills = delta.pills;
  return out;
}

function mergeTier(base, delta) {
  if (!delta) return base;
  const out = { ...base, ...delta };
  if (delta.cta != null && base.cta != null) {
    out.cta = { ...base.cta, ...delta.cta };
  }
  if (delta.features != null) out.features = delta.features;
  return out;
}

const TemplateContentContext = createContext(null);

export function TemplateContentProvider({ children }) {
  const [overrides, setOverrides] = useState(loadOverrides);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch (e) {
      console.warn('Template content: could not persist to localStorage', e);
    }
  }, [overrides]);

  const mergedHomeSections = useMemo(
    () => mergeHomeSections(homeSectionsBase, overrides.home),
    [overrides.home]
  );

  const mergedHero = useMemo(
    () => mergeFlat(heroBase, overrides.hero),
    [overrides.hero]
  );

  const mergedPricingIntro = useMemo(
    () => mergeFlat(pricingIntroBase, overrides.pricing?.intro),
    [overrides.pricing?.intro]
  );

  const mergedPricingTiers = useMemo(() => {
    const d = overrides.pricing?.tiers;
    if (!d) return pricingTiersBase;
    return pricingTiersBase.map((t, i) => mergeTier(t, d[i]));
  }, [overrides.pricing?.tiers]);

  const mergedStoreIntro = useMemo(
    () => mergeFlat(storeIntroBase, overrides.store?.intro),
    [overrides.store?.intro]
  );

  const mergedStoreProducts = useMemo(() => {
    const d = overrides.store?.products;
    if (!d) return storeProductsBase;
    return storeProductsBase.map((p, i) => mergeCard(p, d[i]));
  }, [overrides.store?.products]);

  const mergedBlogIntro = useMemo(
    () => mergeFlat(blogIntroBase, overrides.blog?.intro),
    [overrides.blog?.intro]
  );

  const mergedBlogPosts = useMemo(() => {
    const d = overrides.blog?.posts;
    if (!d) return blogPostsBase;
    return blogPostsBase.map((p, i) => mergeCard(p, d[i]));
  }, [overrides.blog?.posts]);

  const mergedSalesIntro = useMemo(
    () => mergeFlat(salesIntroBase, overrides.sales?.intro),
    [overrides.sales?.intro]
  );

  const mergedSalesProducts = useMemo(() => {
    const d = overrides.sales?.products;
    if (!d) return salesProductsBase;
    return salesProductsBase.map((p, i) => mergeCard(p, d[i]));
  }, [overrides.sales?.products]);

  const mergedSystemLogicIntro = useMemo(
    () => mergeFlat(systemLogicIntroBase, overrides.systemLogic?.intro),
    [overrides.systemLogic?.intro]
  );

  const mergedSystemLogicSteps = useMemo(() => {
    const d = overrides.systemLogic?.steps;
    if (!d) return systemLogicStepsBase;
    return systemLogicStepsBase.map((s, i) => mergeFlat(s, d[i]));
  }, [overrides.systemLogic?.steps]);

  const patchHero = useCallback((partial) => {
    setOverrides((prev) => ({
      ...prev,
      hero: mergeFlat(prev.hero || {}, partial),
    }));
  }, []);

  const patchHomeSectionHeader = useCallback((sectionId, partial) => {
    setOverrides((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        [sectionId]: {
          ...prev.home?.[sectionId],
          header: mergeFlat(prev.home?.[sectionId]?.header || {}, partial),
        },
      },
    }));
  }, []);

  const patchHomeCard = useCallback((sectionId, cardIndex, partial) => {
    setOverrides((prev) => {
      const cur = prev.home?.[sectionId]?.cards?.[cardIndex] || {};
      return {
        ...prev,
        home: {
          ...prev.home,
          [sectionId]: {
            ...prev.home?.[sectionId],
            cards: {
              ...prev.home?.[sectionId]?.cards,
              [cardIndex]: mergeDelta(cur, partial),
            },
          },
        },
      };
    });
  }, []);

  const patchPricingIntro = useCallback((partial) => {
    setOverrides((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        intro: mergeFlat(prev.pricing?.intro || {}, partial),
      },
    }));
  }, []);

  const patchPricingTier = useCallback((tierIndex, partial) => {
    setOverrides((prev) => {
      const cur = prev.pricing?.tiers?.[tierIndex] || {};
      return {
        ...prev,
        pricing: {
          ...prev.pricing,
          tiers: {
            ...prev.pricing?.tiers,
            [tierIndex]: mergeDelta(cur, partial),
          },
        },
      };
    });
  }, []);

  const patchStoreIntro = useCallback((partial) => {
    setOverrides((prev) => ({
      ...prev,
      store: {
        ...prev.store,
        intro: mergeFlat(prev.store?.intro || {}, partial),
      },
    }));
  }, []);

  const patchStoreProduct = useCallback((index, partial) => {
    setOverrides((prev) => {
      const cur = prev.store?.products?.[index] || {};
      return {
        ...prev,
        store: {
          ...prev.store,
          products: {
            ...prev.store?.products,
            [index]: mergeDelta(cur, partial),
          },
        },
      };
    });
  }, []);

  const patchBlogIntro = useCallback((partial) => {
    setOverrides((prev) => ({
      ...prev,
      blog: {
        ...prev.blog,
        intro: mergeFlat(prev.blog?.intro || {}, partial),
      },
    }));
  }, []);

  const patchBlogPost = useCallback((index, partial) => {
    setOverrides((prev) => {
      const cur = prev.blog?.posts?.[index] || {};
      return {
        ...prev,
        blog: {
          ...prev.blog,
          posts: {
            ...prev.blog?.posts,
            [index]: mergeDelta(cur, partial),
          },
        },
      };
    });
  }, []);

  const patchSalesIntro = useCallback((partial) => {
    setOverrides((prev) => ({
      ...prev,
      sales: {
        ...prev.sales,
        intro: mergeFlat(prev.sales?.intro || {}, partial),
      },
    }));
  }, []);

  const patchSalesProduct = useCallback((index, partial) => {
    setOverrides((prev) => {
      const cur = prev.sales?.products?.[index] || {};
      return {
        ...prev,
        sales: {
          ...prev.sales,
          products: {
            ...prev.sales?.products,
            [index]: mergeDelta(cur, partial),
          },
        },
      };
    });
  }, []);

  const patchSystemLogicIntro = useCallback((partial) => {
    setOverrides((prev) => ({
      ...prev,
      systemLogic: {
        ...prev.systemLogic,
        intro: mergeFlat(prev.systemLogic?.intro || {}, partial),
      },
    }));
  }, []);

  const patchSystemLogicStep = useCallback((index, partial) => {
    setOverrides((prev) => {
      const cur = prev.systemLogic?.steps?.[index] || {};
      return {
        ...prev,
        systemLogic: {
          ...prev.systemLogic,
          steps: {
            ...prev.systemLogic?.steps,
            [index]: mergeFlat(cur, partial),
          },
        },
      };
    });
  }, []);

  const resetTemplateOverrides = useCallback(() => {
    setOverrides({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const exportOverridesJson = useCallback(() => {
    return JSON.stringify(overrides, null, 2);
  }, [overrides]);

  const importOverridesJson = useCallback((json) => {
    const next = JSON.parse(json);
    if (!next || typeof next !== 'object') throw new Error('Invalid JSON object');
    setOverrides(next);
  }, []);

  const value = useMemo(
    () => ({
      overrides,
      mergedHomeSections,
      mergedHero,
      mergedPricingIntro,
      mergedPricingTiers,
      mergedStoreIntro,
      mergedStoreProducts,
      mergedBlogIntro,
      mergedBlogPosts,
      mergedSalesIntro,
      mergedSalesProducts,
      mergedSystemLogicIntro,
      mergedSystemLogicSteps,
      patchHero,
      patchHomeSectionHeader,
      patchHomeCard,
      patchPricingIntro,
      patchPricingTier,
      patchStoreIntro,
      patchStoreProduct,
      patchBlogIntro,
      patchBlogPost,
      patchSalesIntro,
      patchSalesProduct,
      patchSystemLogicIntro,
      patchSystemLogicStep,
      resetTemplateOverrides,
      exportOverridesJson,
      importOverridesJson,
    }),
    [
      overrides,
      mergedHomeSections,
      mergedHero,
      mergedPricingIntro,
      mergedPricingTiers,
      mergedStoreIntro,
      mergedStoreProducts,
      mergedBlogIntro,
      mergedBlogPosts,
      mergedSalesIntro,
      mergedSalesProducts,
      mergedSystemLogicIntro,
      mergedSystemLogicSteps,
      patchHero,
      patchHomeSectionHeader,
      patchHomeCard,
      patchPricingIntro,
      patchPricingTier,
      patchStoreIntro,
      patchStoreProduct,
      patchBlogIntro,
      patchBlogPost,
      patchSalesIntro,
      patchSalesProduct,
      patchSystemLogicIntro,
      patchSystemLogicStep,
      resetTemplateOverrides,
      exportOverridesJson,
      importOverridesJson,
    ]
  );

  return (
    <TemplateContentContext.Provider value={value}>
      {children}
    </TemplateContentContext.Provider>
  );
}

export function useTemplateContent() {
  const ctx = useContext(TemplateContentContext);
  if (!ctx) {
    throw new Error('useTemplateContent must be used within TemplateContentProvider');
  }
  return ctx;
}

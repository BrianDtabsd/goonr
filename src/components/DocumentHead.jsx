import { useEffect } from 'react';
import { getSiteMeta } from '../config/siteMeta';

/** Syncs <title> and meta description from env (client-specific deploy). */
export default function DocumentHead({ title, description }) {
  useEffect(() => {
    const { documentTitle, metaDescription } = getSiteMeta();
    document.title = title || documentTitle;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description || metaDescription);
  }, [title, description]);

  return null;
}

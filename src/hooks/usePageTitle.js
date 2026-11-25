import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | भारतीय डाक योजनाएं` : 'भारतीय डाक योजनाएं';
  }, [title]);
}

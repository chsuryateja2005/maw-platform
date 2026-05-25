import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "maw_wishlist";

export interface UseWishlistReturn {
  wishlistIds: string[];
  toggle: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  isLoading: boolean;
}

export function useWishlist(): UseWishlistReturn {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    }
  }, [wishlistIds, isLoading]);

  const toggle = useCallback((id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const isInWishlist = useCallback(
    (id: string) => wishlistIds.includes(id),
    [wishlistIds],
  );

  return { wishlistIds, toggle, isInWishlist, isLoading };
}

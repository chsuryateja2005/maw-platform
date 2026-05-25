import { useCallback, useState } from "react";

export interface GeoAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface UseGeolocationReturn {
  getLocation: () => Promise<GeoAddress>;
  isLoading: boolean;
  error: string | null;
}

export function useGeolocation(): UseGeolocationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async (): Promise<GeoAddress> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setIsLoading(false);
        setError("Geolocation is not supported by your browser.");
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              { headers: { "Accept-Language": "en" } },
            );
            if (!res.ok) {
              throw new Error("Failed to fetch address from coordinates.");
            }
            const data = await res.json();
            const addr = data.address || {};

            const street =
              addr.road || addr.street || addr.pedestrian || addr.suburb || "";
            const city =
              addr.city || addr.town || addr.village || addr.county || "";
            const postalCode = addr.postcode || "";
            const country = addr.country || "";

            const result: GeoAddress = { street, city, postalCode, country };
            setIsLoading(false);
            resolve(result);
          } catch (err) {
            const msg =
              err instanceof Error
                ? err.message
                : "Network error while fetching address.";
            setError(msg);
            setIsLoading(false);
            reject(new Error(msg));
          }
        },
        (err) => {
          let msg = "Unable to retrieve your location.";
          if (err.code === 1)
            msg =
              "Location permission denied. Please enable location access in your browser settings.";
          else if (err.code === 2)
            msg = "Location unavailable. Please try again.";
          else if (err.code === 3)
            msg = "Location request timed out. Please try again.";
          setError(msg);
          setIsLoading(false);
          reject(new Error(msg));
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 },
      );
    });
  }, []);

  return { getLocation, isLoading, error };
}

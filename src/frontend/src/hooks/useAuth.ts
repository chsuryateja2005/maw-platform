import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMemo } from "react";

export interface AuthState {
  isAuthenticated: boolean;
  principal: string | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

export function useAuth(): AuthState {
  const ii = useInternetIdentity();

  const principal = useMemo(() => {
    if (ii.identity) {
      try {
        return ii.identity.getPrincipal().toText();
      } catch {
        return null;
      }
    }
    return null;
  }, [ii.identity]);

  return {
    isAuthenticated: ii.isAuthenticated ?? false,
    principal,
    login: ii.login,
    logout: ii.clear,
    isLoading: ii.isInitializing ?? false,
  };
}

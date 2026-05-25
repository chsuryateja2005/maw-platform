import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useSearch } from "@tanstack/react-router";
import { Loader2, ShoppingBag, User } from "lucide-react";
import { motion } from "motion/react";

export default function CustomerLogin() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const search = useSearch({ from: "/user/login" }) as {
    returnTo?: string;
  };

  if (isAuthenticated) {
    const returnTo =
      typeof search.returnTo === "string" && search.returnTo.startsWith("/")
        ? search.returnTo
        : "/user";
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-background"
      >
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            You are already signed in.
          </p>
          <Link
            to={returnTo}
            className="text-primary hover:underline font-medium"
            data-ocid="login.already_signed_in.link"
          >
            Continue shopping
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-center text-foreground mb-2">
            Sign in to MAW
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Access your orders, wishlist, and saved addresses.
          </p>

          <Button
            onClick={() => login()}
            disabled={isLoading}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
            data-ocid="login.internet_identity.button"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <User className="w-4 h-4 mr-2" />
            )}
            {isLoading ? "Signing in..." : "Sign in with Internet Identity"}
          </Button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              or
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Link
            to="/user"
            search={{}}
            className="block w-full"
            data-ocid="login.guest.link"
          >
            <Button
              variant="outline"
              className="w-full h-11 rounded-lg border-border hover:bg-muted transition-colors"
            >
              Continue as Guest
            </Button>
          </Link>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By signing in, you agree to our{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}

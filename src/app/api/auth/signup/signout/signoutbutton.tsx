"use client"; // Ensure this is a client component

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  async function handleSignOut() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message + "fdsf" || "Failed to sign out. Please try again.");
        setIsLoading(false);
        return;
      }

      // Handle successful sign-out, e.g., redirect to home or login page
      toast.success("Signed out successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? "Signing Out..." : "Sign Out"}
    </Button>
  );
}

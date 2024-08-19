"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

async function handleClick(
  poolId: string,
  setLoading: (loading: boolean) => void,
) {
  setLoading(true);
  try {
    const response = await fetch("/api/pools/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ poolId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to join pool");
    }

    toast.success("Successfully joined the pool!");
  } catch (error) {
    console.error("Error joining pool:", error);
    toast.error("Error", {
      description:
        error instanceof Error ? error.message : "Failed to join pool",
    });
  } finally {
    setLoading(false);
  }
}

export default function JoinPoolButton({
  poolId,
  joined,
}: {
  poolId: string;
  joined?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      size="sm"
      onClick={() => handleClick(poolId, setLoading)}
      disabled={loading || joined}
    >
      {loading ? "Joining..." : "Join Pool"}
    </Button>
  );
}

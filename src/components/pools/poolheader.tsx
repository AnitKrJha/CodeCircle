import React from "react";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import Link from "next/link";

export default function PoolHeader({ type }: { type: "Pools" | "Problems" }) {
  return (
    <header className="flex justify-between items-center p-4 bg-background shadow-sm mb-2">
      <div className="text-sm font-medium text-foreground">My {type}</div>
      {type === "Pools" ? (
        <Button asChild size={"sm"}>
          <Link href="/pools/create">New Pool +</Link>
        </Button>
      ) : (
        "Open any pool to create a problem"
      )}
    </header>
  );
}

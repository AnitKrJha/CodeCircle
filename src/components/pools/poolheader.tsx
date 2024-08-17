import React from "react";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import Link from "next/link";

export default function PoolHeader() {
  return (
    <header className="flex justify-between items-center p-4 bg-background shadow-sm mb-2">
      <div className="text-sm font-medium text-foreground">
        My Pools
      </div>
      <Button asChild size={"sm"}>
        <Link href="/pools/create">
        New Pool +
        </Link>
      </Button>
    </header>
  );
}

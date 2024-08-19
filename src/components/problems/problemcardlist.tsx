import { createSClient } from "@/lib/supabase/server";
import ProblemCard from "./problemcard";
import ErrorComponent from "../errordisplay";
import Link from "next/link";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export default async function ProblemList({ poolId }: { poolId: string }) {
  const supabase = createSClient();

  const { data: problems, error } = await supabase
    .from("Problems")
    .select("*,users(*)")
    .eq("pool_id", poolId);
  console.log({ problems, error });

  if (error) {
    console.error("Error fetching problems:", error);
    return <ErrorComponent message={error.message} />;
  }

  if (!problems || problems.length === 0) {
    return <NoProblemMessage poolId={poolId} />;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
          <CreateProblemButton poolId={poolId} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <ProblemCard
              key={problem.problem_id}
              problem={{ ...problem, pool_name: null }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CreateProblemButton({ poolId }: { poolId: string }) {
  return (
    <Button asChild>
      <Link href={`/pools/${poolId}/problem/create`}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create New Problem
      </Link>
    </Button>
  );
}

function NoProblemMessage({ poolId }: { poolId: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-muted">
      <h2 className="text-2xl font-semibold mb-4">
        No problems found for this pool
      </h2>
      <p className="text-muted-foreground mb-8">
        Get started by creating your first problem!
      </p>
      <CreateProblemButton poolId={poolId} />
    </div>
  );
}

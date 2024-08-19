import { createSClient } from "@/lib/supabase/server";
import ProblemCard from './problemcard';
import ErrorComponent from "../errordisplay";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function ProblemList({ poolId }:{poolId:string}) {
  const supabase=createSClient();
  // Fetch problems from the "Problems" table where "pool_id" matches the provided poolId
  const { data: problems, error } = await supabase
    .from('Problems')
    .select('*')
    .eq('pool_id', poolId);

    console.log(problems);
    

  if (error) {
    console.error('Error fetching problems:', error);
    return <ErrorComponent message={error.message} />;
  }

  if (!problems || problems.length === 0) {
    return <p className="text-center text-gray-500">No problems found for this pool.</p>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h1 className="mx-auto max-w-5xl my-2 text-lg">Problems</h1>
        <Button asChild>
          <Link href={`/pools/${poolId}/problem/create`}>Create New Problem</Link>
        </Button>
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <ProblemCard key={problem.problem_id} problem={problem} />
          ))}
        </div>
      </div>
    </section>
  );
}

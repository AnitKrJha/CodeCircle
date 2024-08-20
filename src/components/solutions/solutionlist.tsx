"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import SolutionTile from "./solutiontile"; // Import the SolutionTile component
import { createBClient } from "@/lib/supabase/client";

export type solutiondata =
  | {
      solution_id: string;
      created_by: string;
      created_at: string;
      language: string | null;
      solution: string;
      users: {
        username: string | null;
      } | null;
    }[]
  | null;

export default function PreviousSolutions({
  problemId,
}: {
  problemId: string;
}) {
  const [solutions, setSolutions] = useState<solutiondata>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBClient();

  useEffect(() => {
    async function fetchSolutions() {
      try {
        const { data, error } = await supabase
          .from("Solutions")
          .select(
            "solution_id, created_by, created_at,language, solution, users (username)",
          )
          .eq("problem_id", problemId);

        if (error) {
          throw error;
        }

        setSolutions(data);
      } catch (error: any) {
        toast.error("Failed to fetch solutions", {
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSolutions();
  }, [problemId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (solutions?.length === 0) {
    return <p>No solutions found.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Previous Solutions</h2>
      <div className="grid gap-4">
        {solutions?.map((solution: any) => (
          <SolutionTile
            key={solution.id}
            user={solution.users.username}
            language={solution.language}
            created_at={solution.created_at}
            solution={solution.solution}
          />
        ))}
      </div>
    </div>
  );
}

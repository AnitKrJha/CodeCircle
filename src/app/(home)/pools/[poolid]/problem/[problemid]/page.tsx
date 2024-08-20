import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createSClient } from "@/lib/supabase/server";
import ErrorComponent from "@/components/errordisplay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SolutionCodeEditorForm } from "@/components/problems/codeEditorForm.tsx";
import PreviousSolutions from "@/components/solutions/solutionlist";

function PreviousSolutionsss() {
  const mockSolutions = [
    { id: 1, user: "Alice", language: "Python", submittedAt: "2024-03-15" },
    { id: 2, user: "Bob", language: "JavaScript", submittedAt: "2024-03-14" },
    { id: 3, user: "Charlie", language: "Java", submittedAt: "2024-03-13" },
    { id: 3, user: "Charlie", language: "Java", submittedAt: "2024-03-13" },
    { id: 3, user: "Charlie", language: "Java", submittedAt: "2024-03-13" },
    { id: 3, user: "Charlie", language: "Java", submittedAt: "2024-03-13" },
    { id: 3, user: "Charlie", language: "Java", submittedAt: "2024-03-13" },
    { id: 3, user: "Charlie", language: "Java", submittedAt: "2024-03-13" },
    { id: 3, user: "Charlie", language: "Java", submittedAt: "2024-03-13" },
    { id: 3, user: "Charlie", language: "Java", submittedAt: "2024-03-13" },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Previous Solutions</h2>
      <ScrollArea className="h-96 space-y-4">
        {mockSolutions.map((solution) => (
          <Card key={solution.id}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {solution.user}'s solution in {solution.language}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Submitted on {solution.submittedAt}
              </p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}

export default async function IndividualProblemPage({
  params,
}: {
  params: { poolid: string; problemid: string };
}) {
  const { poolid, problemid } = params;
  const supabase = createSClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("Authentication failed. Please try again.");
    }

    const { data: membershipData, error: membershipError } = await supabase
      .from("PoolMembers")
      .select("*")
      .eq("pool_id", poolid)
      .eq("user_id", user.id)
      .single();

    if (membershipError || !membershipData) {
      throw new Error("You are not a member of the pool the Problem is From.");
    }

    const { data: problem, error: problemError } = await supabase
      .from("Problems")
      .select("*, users(*)")
      .eq("problem_id", problemid)
      .eq("pool_id", poolid)
      .single();

    if (problemError) {
      throw new Error(
        "Failed to fetch problem details. Please try again later.",
      );
    }

    if (!problem) {
      throw new Error("The requested problem does not exist.");
    }

    return (
      <div className="min-h-screen ">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold tracking-tight mb-4">
                  {problem.title}
                </h1>
                <p className="mb-6">{problem.description}</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Author" />
                    <AvatarFallback>
                      {problem.users?.username?.at(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {problem.users?.username || "Unknown"}
                    </p>
                    <p className="text-sm ">
                      Posted on{" "}
                      {new Date(problem.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <PreviousSolutions problemId={problemid} />
            </div>
            <div className="space-y-6">
              <SolutionCodeEditorForm problemId={problemid} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("Error in IndividualProblemPage:", error.message);
    return <ErrorComponent message={error.message} />;
  }
}

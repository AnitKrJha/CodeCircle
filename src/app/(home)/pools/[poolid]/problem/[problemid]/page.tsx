
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Clock,
  EyeIcon,
  FilePenIcon,
  TrashIcon,
  User,
  UserIcon,
} from "lucide-react";
import ErrorComponent from "@/components/errordisplay";
import { createSClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function ProblemHeader({ title }: { title: string }) {
  const imageUrl = `https://og.anit.dev/og?title=${title}&type=a`;
  return (
    <header className="w-full bg-primary-foreground py-6 md:py-12 lg:py-16">
      <div className="container px-2 md:px-3">
        <div className="mx-auto max-w-5xl">
          <Image
            src={imageUrl}
            width="1270"
            height="300"
            alt="Problem Banner"
            className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
          />
        </div>
      </div>
    </header>
  );
}

function ProblemDetails({
  title,
  description,
  createdAt,
  authorName,
}: {
  title: string;
  description: string;
  createdAt: string;
  authorName: string;
}) {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {title}
          </h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{authorName.at(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{authorName}</p>
              <p className="text-sm text-muted-foreground">
                Created on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </section>
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

    // Check if user is a member of the pool
    const { data: membershipData, error: membershipError } = await supabase
      .from("PoolMembers")
      .select("*")
      .eq("pool_id", poolid)
      .eq("user_id", user.id)
      .single();

    if (membershipError || !membershipData) {
      throw new Error("You are not a member of the pool the Problem is From.");
    }

    // Fetch problem details
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
      <div className="min-h-screen bg-background">
        <ProblemHeader title={problem.title} />
        <ProblemDetails
          title={problem.title}
          description={problem.description}
          createdAt={problem.created_at}
          authorName={problem.users?.username || "Unknown"}
        />
        {/* Add more components here for problem-specific content */}
      </div>
    );
  } catch (error: any) {
    console.error("Error in IndividualProblemPage:", error.message);
    return <ErrorComponent message={error.message} />;
  }

}

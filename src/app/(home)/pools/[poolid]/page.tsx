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
import ProblemCard from "@/components/problems/problemcard";
import JoinPoolButton from "@/components/pools/joinpoolbutton";
import { MembersList } from "@/components/pools/poolMembersList";
import ProblemList from "@/components/problems/problemcardlist";

function PoolHeader({ title }: { title: string }) {
  const imageUrl = `https://og.anit.dev/og?title=${title}&type=a`;
  return (
    <header className="w-full bg-primary-foreground py-6 md:py-12 lg:py-16">
      <div className="container px-2 md:px-3">
        <div className="mx-auto max-w-5xl">
          <Image
            src={imageUrl}
            width="1270"
            height="300"
            alt="Event Banner"
            className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
          />
        </div>
      </div>
    </header>
  );
}

function PoolDetails({
  id,
  name,
  desc,
  isAuthor,
  createdAt,
  authorName,
}: {
  id: string;
  name: string;
  desc: string;
  isAuthor: boolean;
  createdAt: string;
  authorName: string;
}) {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {name}
          </h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{authorName.at(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{authorName}</p>
              <p
                className={`text-sm ${isAuthor ? "text-primary font-semibold" : "text-muted-foreground"}`}
              >
                {isAuthor ? "You are the pool owner" : "You are a pool member"}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-muted-foreground">
              <JoinPoolButton poolId={id} />
            </div>
          </div>
          <p className="text-muted-foreground">{desc}</p>
        </div>
      </div>
    </section>
  );
}

export default async function IndividualPoolPage({
  params,
}: {
  params: { poolid: string };
}) {
  const { poolid } = params;
  const supabase = createSClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) {
      throw new Error("Authentication failed. Please try again.");
    }

    const { data: pool, error: poolError } = await supabase
      .from("ProblemPools")
      .select("*,users!PoolMembers(*)")
      .eq("pool_id", poolid)
      .single();

    if (poolError) {
      throw new Error("Failed to fetch pool details. Please try again later.");
    }

    if (!pool) {
      throw new Error("The requested pool does not exist.");
    }

    const isAuthor = pool.created_by === user?.id;

    return (
      <div className="min-h-screen bg-background">
        <PoolHeader title={pool.pool_name} />
        <PoolDetails
          id={pool.pool_id}
          name={pool.pool_name}
          desc={pool.pool_desc || "No description available"}
          isAuthor={isAuthor}
          authorName={pool.users[0].username || "Unknown"}
          createdAt={pool.created_at}
        />
        <MembersList poolId={poolid} />
        <ProblemList poolId={poolid} />
      </div>
    );
  } catch (error: any) {
    console.error("Error in IndividualPoolPage:", error.message);
    return <ErrorComponent message={error.message} />;
  }
}

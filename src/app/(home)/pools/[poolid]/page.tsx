import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import ErrorComponent from "@/components/errordisplay";
import { createSClient } from "@/lib/supabase/server";
import JoinPoolButton from "@/components/pools/joinpoolbutton";
import ProblemList from "@/components/problems/problemcardlist";

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
    if (authError) throw new Error("Authentication failed. Please try again.");

    const { data: pool, error: poolError } = await supabase
      .from("ProblemPools")
      .select("*, users!PoolMembers(*)")
      .eq("pool_id", poolid)
      .single();
    console.log(pool?.users);

    if (poolError || !pool)
      throw new Error("Failed to fetch pool details. Please try again later.");

    const isAuthor = pool.created_by === user?.id;

    return (
      <div className="w-full">
        <div className="relative h-[200px] md:h-[300px] overflow-hidden">
          <Image
            src={`https://og.anit.dev/og?title=${pool.pool_name}&type=a`}
            alt="Pool Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="container px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
          <h1 className=" md:text-3xl font-bold">{pool.pool_name}</h1>
          <JoinPoolButton poolId={pool.pool_id} />
          <div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Pool Creator" />
                <AvatarFallback>
                  {pool.users[0].username?.at(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-muted-foreground text-xs">created by</p>
                <h2 className="text font-semibold text-sm">
                  {pool.users[0].username || "Unknown"}
                </h2>
                {/* {isAuthor ? "Pool Creator" : "Pool Member"} */}
              </div>
            </div>
            <Separator className="my-3" />
            <div className="grid gap-3">
              <Card>
                <CardHeader>
                  <CardTitle>Pool Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {pool.pool_desc || "No description available"}
                  </p>
                </CardContent>
              </Card>

              <ProblemList poolId={poolid} />
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pool Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {pool.users.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" alt="Member" />
                        <AvatarFallback>
                          {member.username?.at(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-semibold">
                          {member.username}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {member.user_id === pool.created_by
                            ? "Creator"
                            : "Member"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("Error in IndividualPoolPage:", error.message);
    return <ErrorComponent message={error.message} />;
  }
}

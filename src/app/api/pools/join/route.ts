import { NextResponse } from "next/server";
import { createSClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const supabase = createSClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Get poolId from request body
  const { poolId } = await request.json();

  if (!poolId) {
    return NextResponse.json(
      { message: "Pool ID is required" },
      { status: 400 },
    );
  }

  // Insert into PoolMembers table
  const { error: insertError } = await supabase
    .from("PoolMembers")
    .insert({ pool_id: poolId, user_id: user.id });

  if (insertError) {
    console.error("Error inserting into PoolMembers:", insertError);
    if (insertError.code === "23505")
      return NextResponse.json(
        { message: "You are already a member of the pool" },
        { status: 500 },
      );
    return NextResponse.json({ message: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Successfully joined pool" });
}

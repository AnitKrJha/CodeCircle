import { createSClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const prerender = false;

export async function POST(request: NextRequest) {
  const supabase = createSClient();
  const body = await request.json();
  
  const { data, error } = await supabase.auth.signUp(body);
  
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({message:"Login Succesfully"})

}

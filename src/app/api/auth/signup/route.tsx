import { createSClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const supabase = createSClient();
  const {email,password,name} = await request.json();
  
  const { data, error } = await supabase.auth.signUp({
    email:email,
    password:password,
    options:{
      data:{
        display_name:name
      }
    }
  });
  
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({message:"Login Succesfully"})

}

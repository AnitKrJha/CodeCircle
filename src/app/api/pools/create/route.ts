import { createSClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = createSClient();
    
    // Get the current authenticated user
    const { data: user, error: authError } = await supabase.auth.getUser();
    
    // Check if the user is authenticated
    if (authError || !user) {
        const errorMessage = authError?.message || "You are not authenticated";
        return NextResponse.json({ error: errorMessage }, { status: 401 });
    }

    try {
        const body = await request.json();
        console.table(body);

        // Insert data into the 'ProblemPools' table
        const { data, error } = await supabase
            .from('ProblemPools')
            .insert([
                { pool_desc: body.poolDesc, pool_name: body.poolName,created_by:user.user.id}
            ])
            .select();
        console.table(data?.at(0));    
        // Handle any error during the insert operation
        if (error) {
            const errorMessage = error.message || "Failed to create the pool";
            return NextResponse.json({ error: errorMessage }, { status: 500 });
        }

        // If successful, return the inserted data
        return NextResponse.json({ data }, { status: 201 });

    } catch (error:any) {
        // Handle any unexpected errors
        const errorMessage = error.message || "An unexpected error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

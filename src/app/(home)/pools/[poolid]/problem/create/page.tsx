import Createnewpool from "@/components/pools/createpoolform";

import CreatenewProblem from "@/components/problems/createproblemform";
import { Button } from "@/components/ui/button";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";

export default function CreateProblemPage({params}:{params:{poolid:string}}){

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[94vh]">
            <div className="flex items-center justify-center bg-background px-2 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-lg space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl">Create New Problem in Pool</h1>
                        <p className="text-xs">in {params.poolid}</p>
                        <p className="text-muted-foreground">
                            Pools are like lockers where you can keep your favourite questions and invite your friends to view and solve.
                        </p>
                    </div>
                    <CreatenewProblem poolId={params.poolid}/>
                    <div className="flex items-center justify-center">
                        <Button asChild variant={"link"} size={"sm"}>
                        <Link href="/dashboard/my-pools"  prefetch={false}>

                            <ArrowLeftSquare size={16} className="mr-2"/> Back to Your Pools
                        </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid bg-gradient-to-b from-red-600 to-secondary h-full place-items-center text-3xl" >
            Problem Create 
            </div>
        </div>
    )

}
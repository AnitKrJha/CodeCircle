import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import { Grid, LinkIcon, LucideIcon } from "lucide-react"; // Adjust the import path based on your setup
import Link from "next/link";

type PoolCardProps = {
    name: string;
    desc: string;
};

export default function PoolCard({ name, desc }: PoolCardProps) {
    return (
        <Card className="w-full max-w-md flex flex-col roundd-none">
            <div className="w-full aspect-video overflow-hidden  bg-gradient-to-tr from-black to-purple-600">
                
            </div>
            <CardContent className="p-2 space-y-2 flex flex-col flex-1 justify-start">
                <h3 className="text-lg font-bold" >{name}</h3>
                <p className="text-muted-foreground text-sm grow">{desc}</p>
                <div className="space-x-2 my-auto">
                    <Button
                    asChild
                    variant="outline"
                        className="flex items-center space-x-2"
                    >
                        <Link href="#">
                            <LinkIcon className="w-4 h-4" /> 
                            <span>View More</span>
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

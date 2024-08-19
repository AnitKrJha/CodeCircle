import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import {
  Grid,
  LinkIcon,
  LucideIcon,
  StarIcon,
  TelescopeIcon,
  UserCheck2Icon,
} from "lucide-react"; // Adjust the import path based on your setup
import Link from "next/link";
import { Badge } from "../ui/badge";
import Image from "next/image";

export type PoolCardProps = {
  id: string;
  name: string;
  desc: string | null;
  author: boolean;
};

export default function PoolCard({ name, desc, author, id }: PoolCardProps) {
  const imageurl = `https://og.anit.dev/og?title=${name}&type=pool}`;
  return (
    <Card className="w-full max-w-xs flex flex-col">
      <div className="relative">
        <Image
          src={imageurl}
          alt="Product image"
          width={300}
          height={100}
          className="rounded-t-lg object-cover w-full aspect-video"
        />
        <Badge variant={"secondary"} className="absolute top-1 left-0">
          Pool
        </Badge>
      </div>
      <CardContent className="p-2 space-y-3 flex flex-col flex-grow">
        <div className="grow">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
        <div className="flex items-end justify-between">
          <Button asChild size={"sm"}>
            <Link href={`/pools/${id}`}>
              Explore <TelescopeIcon className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <div className="flex items-end gap-2 text-primary">
            {author && (
              <>
                <UserCheck2Icon className="w-4 h-4 text-success" />
                <span className="text-xs font-semibold">You are the owner</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  UserCircle,
  Folder,
  ArrowRight,
  ArrowRightIcon,
} from "lucide-react";

export interface ProblemWithPoolNameInterface {
  created_at: string;
  created_by: string;
  description: string;
  pool_id: string;
  problem_id: string;
  title: string;
  pool_name?: string | null;
  users: {
    username: string | null;
    email: string;
    user_id: string;
    created_at: string;
  } | null;
}

export default function ProblemCard({
  problem,
}: {
  problem: ProblemWithPoolNameInterface;
}) {
  const createdDate = new Date(problem.created_at).toLocaleDateString();

  return (
    <Card className="flex flex-col max-w-sm space-y-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-primary">
          {problem.title}
        </CardTitle>
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <UserCircle className="w-4 h-4 mr-1" />
            <span>{problem.users?.username || "Anonymous"}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{createdDate}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-3 flex-grow flex flex-col justify-between">
        <p className="text-sm line-clamp-3 mb-4 text-muted-foreground">
          {problem.description}
        </p>
        {problem.pool_name && (
          <div className="flex items-center justify-between">
            <span className="text-xs flex items-center text-primary">
              Pool <ArrowRightIcon className="ml-2 h-3 w-3" />
            </span>
            <Badge variant="outline" className="flex items-center w-fit">
              <Folder className="w-3 h-3 mr-1" />
              <Link
                href={`/pools/${problem.pool_id}`}
                className="hover:text-primary transition-colors duration-200"
              >
                {problem.pool_name}
              </Link>
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button
          asChild
          variant="secondary"
          className="w-full transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
        >
          <Link
            href={`/pools/${problem.pool_id}/problem/${problem.problem_id}`}
          >
            View Problem
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

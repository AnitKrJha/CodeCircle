import { FilePenIcon, TrashIcon, EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";

export default function ProblemCard(){
    return( <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>JavaScript Fundamentals Quiz</CardTitle>
          <CardDescription>A 20-question quiz to test your JavaScript knowledge.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Questions</div>
              <div className="font-medium">20</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Average Score</div>
              <div className="font-medium">87%</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button size="sm" variant="outline">
            <FilePenIcon className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button size="sm" variant="outline">
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <Button size="sm">
            <EyeIcon className="w-4 h-4 mr-2" />
            View
          </Button>
        </CardFooter>
      </Card>)
}
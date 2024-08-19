import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '../ui/button';

export default function ProblemCard({ problem }:{problem:any}) {
  return (
    <Card className="shadow-lg rounded-l">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{problem.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{problem.difficulty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{problem.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

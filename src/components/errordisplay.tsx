import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ErrorComponent({ message }: { message: string }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 bg-background">
      <Card className="w-full max-w-md shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-foreground">
              Oops! Something went wrong
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              We encountered an unexpected issue. Here's what we know:
            </p>
            <div className="w-full p-3 bg-muted rounded-md">
              <p className="text-sm font-mono text-foreground break-words">
                {message}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center pt-2 pb-6">
          <p className="text-xs text-center text-muted-foreground">
            If this problem persists, please contact our support team for
            assistance.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

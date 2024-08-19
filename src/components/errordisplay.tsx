import { AlertTriangle } from "lucide-react";

type ErrorComponentProps = {
  message: string;
};

export default function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center  px-4 py-12 bg-background">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="rounded-lg bg-card p-4 shadow-lg ">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div className="space-y-2 text-center">
              <h1 className="text-lg font-bold">There's been an error</h1>
              <p className="text-red-500 text-sm ">{props.message}</p>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          If you continue to have issues, please contact support.
        </p>
      </div>
    </div>
  );
}

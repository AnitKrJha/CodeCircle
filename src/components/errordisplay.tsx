/**
 * v0 by Vercel.
 * @see https://v0.dev/t/g7KuF7M5Pqp
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { AlertTriangle } from "lucide-react"

type ErrorComponentProps={
    message:string
}

export default function ErrorComponent(props:ErrorComponentProps) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div className="space-y-2 text-center">
              <h1 className="text-lg font-bold">There's been an error</h1>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {props.message}
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          If you continue to have issues, please contact support.
        </p>
      </div>
    </div>
    )
  }
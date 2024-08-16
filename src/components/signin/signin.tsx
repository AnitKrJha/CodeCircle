import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SignInForm from "./signinform"

export function LoginComponent() {
  return (
    <div className="w-full  lg:grid  lg:grid-cols-2 min-h-[94vh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <SignInForm/>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <div
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-gradient-to-tr from-orange-200 to-black"
        />
      </div>
    </div>
  )
}

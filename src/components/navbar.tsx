import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createSClient } from "@/lib/supabase/server";
import { ModeToggle } from "./ui/modetoggle";
import SignOutButton from "@/app/api/auth/signup/signout/signoutbutton";

export default async function NavBar() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full bg-background sticky top-0 z-50">
      <header className="container mx-auto flex items-center h-14 px-4 md:px-6   top-0">
        <Link href="/" className="mr-6 flex items-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="flex-1 hidden md:flex justify-center">
          <Link
            href="/features"
            className="mx-2.5 inline-flex items-center rounded-md text-sm font-medium [&:hover]:bg-gray-100 [&:hover]:text-gray-900 transition-colors"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="mx-2.5 inline-flex items-center rounded-md text-sm font-medium [&:hover]:bg-gray-100 [&:hover]:text-gray-900 transition-colors"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="mx-2.5 inline-flex items-center rounded-md text-sm font-medium [&:hover]:bg-gray-100 [&:hover]:text-gray-900 transition-colors"
            prefetch={false}
          >
            Contact Us
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <div className="flex gap-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>

              <SignOutButton />
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
          <ModeToggle />
        </div>
      </header>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

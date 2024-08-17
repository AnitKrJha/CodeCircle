import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connect and Code with Peercode
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Peercode is a collaborative platform where friends can share
                coding problems, solve them in their unique ways, and engage in
                discussions. Join us to enhance your coding skills through peer
                collaboration and learning.
              </p>
            </div>
            <ActionButtons />
          </div>
          <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 sm:w-full lg:order-last lg:aspect-square">
            <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="relative w-full h-full">
              {/* Add additional content here if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ActionButtons() {
  return (
    <div className="flex flex-col gap-2 min-[400px]:flex-row">
      <Link href="/dashboard" prefetch={false}>
        <Button>Get Started</Button>
      </Link>
      <Link href="/features" prefetch={false}>
        <Button variant="outline">Learn More</Button>
      </Link>
    </div>
  );
}

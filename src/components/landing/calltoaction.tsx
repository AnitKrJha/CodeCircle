import Link from "next/link";
import { ActionButtons } from "./hero";

export default function CallToActionSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-3 text-left">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Join Peercode and Level Up Your Coding
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Connect with friends, share coding challenges, and learn from diverse solutions. Get started with Peercode today and enhance your coding skills through collaboration.
          </p>
        </div>
        <div className="mt-8 flex">
          <ActionButtons />
        </div>
      </div>
    </section>
  );
}

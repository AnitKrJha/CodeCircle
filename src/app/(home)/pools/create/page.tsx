/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Bhsphr4ZAXo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 h-[80dvh]">
            <div className="flex items-center justify-center bg-background px-2 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-lg space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-4xl">Create New Problem Pool</h1>
                    </div>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="pool-name" className="text-base">Pool Name</Label>
                            <Input id="pool-name" type="text" placeholder="Enter pool name" className="h-12 placeholder:text-base" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-base">Description</Label>
                            <Input id="description" placeholder="Enter description (optional)" className="h-12 placeholder:text-base" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags" className="text-base">Tags</Label>
                            <Input id="tags" type="text" placeholder="Enter tags (optional, comma-separated)" className="h-12 placeholder:text-base" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Button type="submit" className="w-full bg-black text-base h-12 hover:text-black-700 ">
                                Create Pool
                            </Button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center">
                        <Link href="/dashboard" className="text-base text-black font-medium hover:underline" prefetch={false}>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-b from-primary to-secondary h-full" />
        </div>
    )
}
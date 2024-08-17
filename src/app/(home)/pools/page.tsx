import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlaneTakeoff } from "lucide-react"

export default function Component() {
  return (
    <main className="flex items-center justify-center h-screen bg-background">
      

<Card className="w-full max-w-md p-6 space-y-4">
  <CardHeader>
    <CardTitle>Welcome</CardTitle>
    <CardDescription>Only private pools are supported at the moment.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <p>To view your pools, please go to the dashboard.</p>
    <Button asChild
      className="flex items-center space-x-2"
      >   
    <Link
      href="/dashboard/my-pools">
      <PlaneTakeoff className="w-4 h-4 mr-2" /> {/* Replace 'grid' with the desired Lucide icon name */}
      <span>Go to My Pools</span>
    </Link>
    </Button>
  </CardContent>
</Card>

    </main>
  )
}
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UserIcon } from "lucide-react"
import ErrorComponent from "@/components/errordisplay"
import { createSClient } from "@/lib/supabase/server"

function PoolHeader({ title }: { title: string }) {
  return (
    <header className="bg-primary text-primary-foreground p-6">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  )
}

function PoolDetails({ id, name, desc, isAuthor, createdAt, authorName }: { 
  id: string, 
  name: string, 
  desc: string, 
  isAuthor: boolean, 
  createdAt: string,
  authorName: string 
}) {
  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <CalendarIcon className="h-4 w-4" />
          <span>Created on {new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <UserIcon className="h-4 w-4" />
          <span>Created by {authorName}</span>
        </div>
        {isAuthor && (
          <Badge variant="secondary" className="mt-2">
            You are the author
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}

export default async function IndividualPoolPage({ params }: { params: { poolid: string } }) {
  const { poolid } = params
  const supabase = createSClient()

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) {
      throw new Error('Authentication failed. Please try again.')
    }

    const { data: pool, error: poolError } = await supabase
      .from("ProblemPools")
      .select("*,users!PoolMembers(*)")
      .eq("pool_id", poolid)
      .single()
    
    if (poolError) {
      throw new Error('Failed to fetch pool details. Please try again later.')
    }

    if (!pool) {
      throw new Error('The requested pool does not exist.')
    }

    const isAuthor = pool.created_by === user?.id

    return (
      <div className="min-h-screen bg-background">
        <PoolHeader title={pool.pool_name} />
        <PoolDetails
          id={pool.pool_id}
          name={pool.pool_name}
          desc={pool.pool_desc || "No description available"}
          isAuthor={isAuthor}
          authorName={pool.users[0].username || "Unknown"}
          createdAt={pool.created_at}
        />
      </div>
    )
  } catch (error: any) {
    console.error('Error in IndividualPoolPage:', error.message)
    return <ErrorComponent message={error.message} />
  }
}
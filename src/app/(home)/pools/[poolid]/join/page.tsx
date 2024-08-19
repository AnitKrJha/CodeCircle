import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import JoinPoolButton from "@/components/pools/joinpoolbutton"

export default function Component({ params }: { params: { poolid: string } }) {
  return (
    <Card className="w-full max-w-md shadow-lg rounded-lg p-6">
      <div className="flex items-center text-card-foreground">
        <Avatar className="mr-4">
          <AvatarImage src="/placeholder-user.jpg" alt="Olivia Davis" />
          <AvatarFallback>OD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">Olivia Davis</h3>
          <p className="text-card-foreground">Invites you to the team meetup</p>
        </div>
      </div>
      <p className="mt-4">
        Hey there! I'd love for you to join me and the rest of the team for our quarterly meetup. It's a great chance to
        catch up, share ideas, and connect with everyone. Hope you can make it!
      </p>
      <div className="mt-6 flex justify-end">
        <JoinPoolButton poolId={params.poolid}/>
      </div>
    </Card>
  )
}
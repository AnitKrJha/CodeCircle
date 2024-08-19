"use client"
import { useEffect, useState } from 'react';
import { createBClient} from '@/lib/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function MembersList({ poolId }:{poolId:string}) {
  const [members, setMembers] = useState<any>([]);
  const supabase=createBClient();  
  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from('PoolMembers')
        .select('users (username, email)')
        .eq('pool_id', poolId);

      if (error) {
        console.error('Error fetching pool members:', error);
      } else {
        setMembers(data);
        console.log(data);
        
      }
    }

    fetchMembers();
  }, [poolId]);

  return (
    <section className="w-full py-6 md:py-12 lg:py-16 border">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Pool Members</h2>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {members.map((member:any, index:any) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>{member.users.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{member.users.username}</p>
                  <p className="text-sm text-muted-foreground">{member.users.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

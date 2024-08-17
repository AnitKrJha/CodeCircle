"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Loader } from "lucide-react";
export default function Createnewpool() {

    const [poolName, setPoolName] = useState("");
    const [poolDesc, setPoolDesc] = useState("");
    const [loading,setIsLoading]=useState(false);
  
        async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            setIsLoading(true);
            
            try {
                const response = await fetch("/api/pools/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ poolName, poolDesc }),
                });
            
                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(errorData.error || "Something went wrong");
                    setIsLoading(false);
                    return;
                }
            
                // Handle successful pool creation
                toast.success("Pool created successfully!");
                // Redirect or update UI as needed
            } catch (error:any) {
                toast.error(error.message || "Failed to create the pool. Please try again.");
            } finally {
                setIsLoading(false);
            }
            
        }

    return (<form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="pool-name" >Pool Name</Label>
            <Input id="pool-name" type="text" placeholder="Enter pool name" name="pool_name" value={poolName}
                onChange={(e) => setPoolName(e.target.value)} required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="description" >Description</Label>
            <Textarea rows={5} id="description" placeholder="Enter description (optional)" name="pool_desc" value={poolDesc}
                onChange={(e) => setPoolDesc(e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="tags" >Tags</Label>
            <Input id="tags" type="text" placeholder="Enter tags (optional, comma-separated)" />
        </div>
        <div className="flex items-center justify-between">
            <Button type="submit" className="w-full" disabled={loading}>
                {loading&&<Loader className="mr-2 h-4 w-4 animate-spin"/>}
                Create Pool
            </Button>
        </div>
    </form>)
}
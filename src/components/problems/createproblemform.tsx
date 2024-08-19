"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Loader } from "lucide-react";
export default function CreatenewProblem({poolId}:{poolId:string}) {

    const [problemName, setproblemName] = useState("");
    const [problemDesc, setproblemDesc] = useState("");
    const [loading,setIsLoading]=useState(false);
  
        async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            setIsLoading(true);
            
            try {
                const response = await fetch("/api/problems/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ problemName, problemDesc,poolId }),
                });
            
                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(errorData.error || "Something went wrong");
                    setIsLoading(false);
                    return;
                }
            
                // Handle successful problem creation
                toast.success("problem created successfully!");
                // Redirect or update UI as needed
            } catch (error:any) {
                toast.error(error.message || "Failed to create the problem. Please try again.");
            } finally {
                setIsLoading(false);
            }
            
        }

    return (<form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="problem-name" >Problem Name</Label>
            <Input id="problem-name" type="text" placeholder="Enter problem name" name="problem_name" value={problemName}
                onChange={(e) => setproblemName(e.target.value)} required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="description" >Problem Content</Label>
            <Textarea rows={5} id="description" placeholder="Enter contents" name="problem_desc" value={problemDesc}
                onChange={(e) => setproblemDesc(e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="tags" >Tags</Label>
            <Input id="tags" type="text" placeholder="Enter tags (optional, comma-separated)" />
        </div>
        <div className="flex items-center justify-between">
            <Button type="submit" className="w-full" disabled={loading}>
                {loading&&<Loader className="mr-2 h-4 w-4 animate-spin"/>}
                Create problem
            </Button>
        </div>
    </form>)
}
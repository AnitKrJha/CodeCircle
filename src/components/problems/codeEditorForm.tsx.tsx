"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { createBClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

export function SolutionCodeEditorForm({ problemId }: { problemId: string }) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].value);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    problemId: string,
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createBClient();

      // Check authentication
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        toast.error("Authentication Error", {
          description: "Please sign in to submit a solution.",
        });
        return;
      }

      // Validate input
      if (!code.trim()) {
        toast.error("Invalid Submission", {
          description: "Please enter your code before submitting.",
        });
        return;
      }

      // Submit solution
      const { data, error } = await supabase.from("Solutions").insert([
        {
          created_by: user.id,
          solution: code,
          problem_id: problemId,
          language: selectedLanguage,
        },
      ]);

      if (error) throw error;

      // Success message
      toast.success("Solution Submitted", {
        description: "Refresh to see your latest submission.",
      });

      // Optionally, clear the form or redirect
      setCode("");
      setSelectedLanguage(languages[0].value);
    } catch (error) {
      console.error("Error submitting solution:", error);
      toast("Submission Error", {
        description:
          "An error occurred while submitting your solution. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, problemId)}
      className=" rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <Label htmlFor="code" className="text-lg font-semibold">
          Your Solution
        </Label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        <Textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here..."
          className="w-full min-h-[300px] p-4 font-mono text-sm bg-transparent resize-none outline-none"
        />
        <ScrollArea className="h-96">
          <h2 className="capitalize my-2 text-sm font-extrabold">preview:</h2>
          <SyntaxHighlighter
            language={selectedLanguage}
            style={vscDarkPlus}
            className="!m-0 !p-4 !bg min-h-[300px]"
          >
            {code}
          </SyntaxHighlighter>
        </ScrollArea>
      </div>
      <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Solution"}
      </Button>
    </form>
  );
}

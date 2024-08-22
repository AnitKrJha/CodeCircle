"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Card } from "../ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SolutionTile({
  user,
  language,
  created_at,
  solution,
}: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Card
        className="p-4 border rounded-lg shadow cursor-pointer hover:border-primary"
        onClick={openDialog}
      >
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">{user}</p>
          <span className="text-xs font-semibold  bg-accent rounded-full px-2 py-1">
            {language}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Submitted on {new Date(created_at).toLocaleDateString()}
        </p>
      </Card>
      <div className="sm:max-w-[250px] md:max-w-[450px]">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button style={{ display: "none" }}>Open Dialog</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {user}'s {language} Solution
              </DialogTitle>
              <DialogDescription>
                <div className="mt-4 max-w-[450px] max h-[450px] overflow-scroll">
                  <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={vscDarkPlus}
                    className="!m-0 !p-4 !bg-gray-800 min-h-[300px] rounded-lg"
                  >
                    {solution}
                  </SyntaxHighlighter>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";

export function ClipboardCopy({ copyText }: { copyText: string }) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="text" value={copyText} readOnly hidden />
      {/* Bind our handler function to the onClick button property */}
      <Button size="sm" onClick={handleCopyClick}>
        <span className="flex items-center gap-2 text-xs">
          {isCopied ? "Copied!" : "Copy"} <Clipboard className="w-3 h-3" />
        </span>
      </Button>
    </div>
  );
}

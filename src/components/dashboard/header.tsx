"use client"
import React from 'react';
import { Package2, Bell, Home, Pocket, Bug, Settings, Eye, CircleUser, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "../ui/sheet";
import SignOutButton from "@/app/api/auth/signup/signout/signoutbutton";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SheetClose asChild>

    <Link
      href={href}
      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
        isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'
      }`}
      >
      <Icon className="h-5 w-5" />
      {children}
    </Link>
      </SheetClose>
  );
};

export default function DashboardHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold border-b pb-4 "
            >
              <Package2 className="h-6 w-6" />
              <span className="">Peercode</span>
            </Link>
            <SidebarLink href="/dashboard/my-pools" icon={Pocket}>
              My Pools
            </SidebarLink>
            <SidebarLink href="/dashboard/my-problems" icon={Bug}>
              My Problems
            </SidebarLink>
            <SidebarLink href="/dashboard/my-solutions" icon={Settings}>
              My Solutions
            </SidebarLink>
            <SidebarLink href="/dashboard/overview" icon={Eye}>
              Overview
            </SidebarLink>
          </nav>
          <div className="mt-auto">
            {/* Footer content if needed */}
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <h1>Welcome to your Dashboard!</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="block mx-auto"><div><SignOutButton/></div></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
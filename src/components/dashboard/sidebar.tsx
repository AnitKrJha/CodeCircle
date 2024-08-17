"use client"

import React from 'react';
import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users, Pocket, Bug, Settings, Eye } from "lucide-react";
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
        isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
};

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Peercode</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
        </div>
        <div className="mt-auto p-4">
          {/* Footer content if needed */}
        </div>
      </div>
    </div>
  )
}
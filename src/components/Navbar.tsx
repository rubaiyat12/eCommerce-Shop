"use client";
import React, { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar: FC = () => {
  const navItems = [
    { name: "Favourite", href: "/favourite" },
    { name: "Create Product", href: "/create-product" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-zinc-900 flex items-center justify-between px-4 py-3 border-b shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        ProductApp
      </Link>

      {/* for Desktop view */}
      <div className="hidden md:flex gap-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn("text-sm font-medium hover:text-primary")}
          >
            {item.name}
          </Link>
        ))}
        <ThemeToggle /> 
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center">
        <ThemeToggle /> 
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-4 pl-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;

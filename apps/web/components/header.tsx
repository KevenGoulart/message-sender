"use client";

import Link from "next/link";
import { IoPersonCircleSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export default function Header() {
  const token = localStorage.getItem("token-MS");

  const logout = () => {
    localStorage.removeItem("token-MS");
    window.location.href = "/";
  };

  return (
    <div className="bg-slate-700/90 p-4 flex">
      <Link href="/" className="text-4xl text-white ml-4 mr-6">
        Message Sender
      </Link>
      <div className="flex items-center gap-2 text-2xl ml-auto">
        <div className="flex items-center gap-4 text-xl mr-4">
          <Link href="/data" className="cursor-pointer hover:text-white/70">
            Envio Individual
          </Link>
          <Separator orientation="vertical" className="h-8 bg-white/50" />
          <Link
            href="/dashboard"
            className="cursor-pointer hover:text-white/70"
          >
            Envio em Lote
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {token ? (
              <Avatar size="lg">
                <AvatarImage src="https://avatars.githubusercontent.com/u/94140750?v=4" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar size="lg">
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuItem asChild>
              <button
                onClick={() => logout()}
                className="w-full cursor-pointer font-semibold"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

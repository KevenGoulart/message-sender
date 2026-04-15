"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export default function Header() {
  const token = Cookies.get("token-MS");

  const logout = () => {
    Cookies.remove("token-MS");
    window.location.href = "/";
  };

  return (
    <div className="bg-slate-700/90 p-4 flex">
      <Link href="/" className="text-4xl text-white ml-4 mr-6">
        Message Sender
      </Link>
      <div className="flex items-center gap-2 text-2xl ml-auto">
        <div className="flex items-center gap-4 text-xl mr-4">
          <Link href="/single" className="cursor-pointer hover:text-white/70">
            Envio Individual
          </Link>
          <Separator orientation="vertical" className="h-8 bg-white/50" />
          <Link href="/group" className="cursor-pointer hover:text-white/70">
            Envio em Lote
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {token ? (
              <Avatar size="lg" className="cursor-pointer">
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
            {token ? (
              <DropdownMenuItem asChild>
                <button
                  onClick={() => logout()}
                  className="w-full cursor-pointer font-semibold"
                >
                  Logout
                </button>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <button
                  onClick={() => redirect("/")}
                  className="w-full cursor-pointer font-semibold"
                >
                  Login
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

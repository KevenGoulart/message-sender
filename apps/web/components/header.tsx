"use client";

import Link from "next/link";
import { IoPersonCircleSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const token = localStorage.getItem("token-MS");

  const logout = () => {
    localStorage.removeItem("token-MS");
    window.location.href = "/";
  };

  return (
    <div className="bg-slate-700 p-4 flex">
      <Link href="/" className="text-3xl text-white ml-8">
        Message Sender
      </Link>
      <div className="flex items-center gap-2 text-2xl ml-auto">
        {token ? (
          <p className="text-green-600">Logado</p>
        ) : (
          <p className="text-red-600">Deslogado</p>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoPersonCircleSharp size={44} className="ml-auto cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="w-full font-semibold">
                Perfil
              </Link>
            </DropdownMenuItem>
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

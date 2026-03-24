"use client";

import { IoPersonCircleSharp } from "react-icons/io5";

export default function Header() {
  const token = localStorage.getItem("token-MS");

  return (
    <div className="bg-slate-700 p-4 flex">
      <h1 className="text-3xl text-white ml-12">Message Sender</h1>
      <div className="flex items-center gap-2 text-2xl ml-auto">
        {token ? (
          <p className="text-green-600">Logado</p>
        ) : (
          <p className="text-red-600">Deslogado</p>
        )}
        <IoPersonCircleSharp size={44} className="ml-auto cursor-pointer" />
      </div>
    </div>
  );
}

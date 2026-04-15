"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token-MS");

    if (token != null) {
      redirect("/group");
    }
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await loginUser(
      formData.get("email") as string,
      formData.get("password") as string,
    );

    localStorage.setItem("token-MS", response.data.accessToken);

    window.location.href = "/group";
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="w-full flex flex-col gap-3 justify-center items-center">
        <div className="flex flex-col bg-slate-700 p-4 rounded-2xl mt-6">
          <h1 className="text-4xl mb-2 text-slate-100 font-semibold">Login</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="p-3 rounded-md bg-zinc-700 text-white focus:outline-none"
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              className="p-3 rounded-md bg-zinc-700 text-white focus:outline-none"
            />

            <Button type="submit" className="p-2 font-semibold cursor-pointer">
              Entrar
            </Button>
          </form>
        </div>

        <p className="text-slate-400">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-primary underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

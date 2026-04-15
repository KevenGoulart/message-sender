"use client";

import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/user";

export default function Register() {
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await registerUser(
      formData.get("email") as string,
      formData.get("password") as string,
    );
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="bg-slate-700 p-4 rounded-2xl gap-12 mt-6 mx-auto">
          <h1 className="text-4xl mb-2 text-slate-100 font-semibold">
            Cadastro
          </h1>

          <form onSubmit={handleRegister} className="flex flex-col gap-2">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="p-2 rounded-xl bg-zinc-700 text-white focus:outline-none"
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              className="p-2 rounded-xl bg-zinc-700 text-white focus:outline-none"
            />

            <Button type="submit" className="p-2 font-semibold cursor-pointer">
              Cadastro
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

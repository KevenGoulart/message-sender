"use client";

import { FormEvent } from "react";
import api from "@/lib/axios";

export default function Register() {
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    api.post("/users/register", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <div className="bg-slate-300 min-h-screen">
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="bg-slate-400 p-4 rounded-2xl gap-12 mt-6 mx-auto">
          <h1 className="text-4xl mb-2 text-slate-100 font-semibold">
            Cadastro
          </h1>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="p-2 rounded-xl bg-zinc-700 text-white focus:outline-none"
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              className="p-2 rounded-xl bg-zinc-700 text-white focus:outline-none"
            />

            <button
              type="submit"
              className="bg-purple-700 text-slate-100 p-2 font-semibold rounded-xl cursor-pointer hover:bg-purple-600"
            >
              Cadastro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

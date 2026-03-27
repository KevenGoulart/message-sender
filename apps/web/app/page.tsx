"use client";

import api from "@/lib/axios";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export default function Home() {
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await api.post("/users/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    localStorage.setItem("token-MS", response.data.accessToken);

    redirect("/data");
  };

  return (
    <div className="bg-slate-300 min-h-screen">
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="flex flex-col bg-slate-400 p-4 rounded-2xl mt-6">
          <h1 className="text-4xl mb-2 text-slate-100 font-semibold">Login</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="p-3 rounded-xl bg-zinc-700 text-white focus:outline-none"
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              className="p-3 rounded-xl bg-zinc-700 text-white focus:outline-none"
            />

            <button
              type="submit"
              className="bg-purple-700 text-slate-100 p-2 font-semibold rounded-xl cursor-pointer hover:bg-purple-600"
            >
              Entrar
            </button>
          </form>
        </div>

        <p className="text-slate-500">
          Não tem uma conta?{" "}
          <a href="/register" className="text-purple-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}

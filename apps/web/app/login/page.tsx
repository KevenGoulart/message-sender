'use client'

import api from "@/lib/axios";
import { FormEvent } from "react";

export default function Login() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        api.post('/users/register', {
            email: formData.get('email'),
            password: formData.get('password'),
        })
    }

  return (
    <div className="w-full flex gap-12 justify-center items-center mt-28">
      <div>
        <h1 className="text-4xl text-white mb-2">Cadastro</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <button type="submit" className="bg-purple-700 p-2 font-semibold rounded-xl">
          Cadastro
        </button>
      </form>
      </div>

      {/* <div>
        <h1 className="text-4xl text-white mb-2">Login</h1>

      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded-xl bg-zinc-700 text-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded-xl bg-zinc-700 text-white focus:outline-none"
        />

        <button type="submit" className="bg-purple-700 p-2 font-semibold rounded-xl">
          Entrar
        </button>
      </form>
      </div> */}
    </div>
  );
}
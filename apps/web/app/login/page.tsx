'use client'

import api from "@/lib/axios";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        api.post('/users/register', {
            email: formData.get('email'),
            password: formData.get('password'),
        })
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData =  new FormData(e.currentTarget);

      const response = await api.post('/users/login', {
        email: formData.get('email'),
        password: formData.get('password'),
      })

      localStorage.setItem('token-MS', response.data.accessToken)

      redirect('/data')
    }


  return (
    <div className="w-full flex gap-12 justify-center items-center mt-28">
      <div>
        <h1 className="text-4xl text-white mb-2">Cadastro</h1>

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

        <button type="submit" className="bg-purple-700 p-2 font-semibold rounded-xl">
          Cadastro
        </button>
      </form>
      </div>

      <div>
        <h1 className="text-4xl text-white mb-2">Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          Entrar
        </button>
      </form>
      </div>
    </div>
  );
}
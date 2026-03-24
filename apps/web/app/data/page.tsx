"use client";

import api from "@/lib/axios";
import { FormEvent } from "react";

export default function Data() {
  const submitEmail = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    api.post("/email/send", {
      to: formData.get("email"),
      subject: formData.get("subject"),
      html: formData.get("html"),
    });
  };

  return (
    <div className="bg-slate-800 min-h-screen flex">
      <div className="w-[50%]">
        <div className="flex justify-center items-center gap-2 mt-8">
          <h1 className="text-5xl">Envie um email</h1>
        </div>
        <div className="mt-12 max-w-[50%] mx-auto">
          <form onSubmit={submitEmail} className="flex flex-col gap-4 mt-8">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="subject"
              placeholder="Assunto"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="html"
              placeholder="Conteúdo"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-purple-700 font-semibold text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Enviar Email
            </button>
          </form>
        </div>
      </div>
      <div className="w-[50%]">
        <div className="flex justify-center items-center gap-2 mt-8">
          <h1 className="text-5xl">Histórico de Emails</h1>
        </div>
      </div>
    </div>
  );
}

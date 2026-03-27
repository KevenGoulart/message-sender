"use client";

import api from "@/lib/axios";
import { FormEvent, useEffect, useState } from "react";

export default function Data() {
  const [emailHistory, setEmailHistory] = useState([]);

  const [newEmail, setNewEmail] = useState(false);

  useEffect(() => {
    const fetchEmailHistory = async () => {
      const response = await api.get("/email/history");
      setEmailHistory(response.data);
    };

    fetchEmailHistory();
  }, [newEmail]);

  const submitEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await api.post("/email/send", {
      to: formData.get("email"),
      subject: formData.get("subject"),
      html: formData.get("html"),
    });

    setNewEmail((prev) => !prev);
  };

  return (
    <div className="bg-slate-800 min-h-screen flex">
      <div className="w-[50%]">
        <div className="flex justify-center items-center gap-2 mt-8">
          <h1 className="text-5xl">Envie um email</h1>
        </div>
        <div className="mt-8 max-w-[50%] mx-auto">
          <form onSubmit={submitEmail} className="flex flex-col gap-4 mt-8">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-700"
            />

            <input
              name="subject"
              placeholder="Assunto"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-700"
            />

            <textarea
              name="html"
              placeholder="Conteúdo"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-700"
            />

            <button
              type="submit"
              className="bg-purple-700 font-semibold text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Enviar Email
            </button>
          </form>
        </div>
      </div>
      <div className="w-[50%]">
        <div className="flex flex-col justify-center items-center gap-2 mt-8">
          <h1 className="text-5xl">Histórico de Emails</h1>

          {emailHistory?.toReversed().map((email: any) => (
            <div key={email.id} className="bg-gray-700 rounded-xl p-3 mt-2">
              <p>
                <strong>Para:</strong> {email.sentTo}
              </p>
              <p>
                <strong>Assunto:</strong> {email.subject}
              </p>
              <p>
                <strong>Conteúdo:</strong> {email.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

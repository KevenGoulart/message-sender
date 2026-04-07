"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import { FormEvent, useEffect, useState } from "react";

interface EmailProps {
  id: string;
  sentTo: string;
  subject: string;
  body: string;
}

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
      <div className="w-[40%] ml-auto">
        <div className="flex justify-center items-center gap-2 mt-8">
          <h1 className="text-5xl">Envie um email</h1>
        </div>
        <div className="mt-8 max-w-[50%] mx-auto">
          <form onSubmit={submitEmail} className="flex flex-col gap-2 mt-8">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="border border-gray-700 rounded-md p-2"
            />

            <Input
              name="subject"
              placeholder="Assunto"
              className="border border-gray-700 rounded-md p-2"
            />

            <Textarea
              name="html"
              placeholder="Conteúdo"
              className="border border-gray-700 rounded-md p-2"
            />

            <Button
              type="submit"
              className="text-lg font-semibold cursor-pointer h-11"
            >
              Enviar Email
            </Button>
          </form>
        </div>
      </div>
      <div className="bg-slate-400 h-screen w-px" />
      <div className="w-[40%] mr-auto">
        <div className="flex flex-col justify-center items-center gap-2 mt-8">
          <h1 className="text-5xl">Histórico de Emails</h1>

          {emailHistory?.toReversed().map((email: EmailProps) => (
            <ul key={email.id} className="bg-slate-900 rounded-xl p-2 mt-1">
              <li>
                <strong>Para:</strong> {email.sentTo}
              </li>
              <li>
                <strong>Assunto:</strong> {email.subject}
              </li>
              <li>
                <strong>Conteúdo:</strong> {email.body}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

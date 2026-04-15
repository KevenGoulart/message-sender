"use client";

import { historyColumns } from "@/components/historic-columns";
import { DataTable } from "@/components/templates-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";

export default function Data() {
  const queryClient = useQueryClient();

  const { data: emailHistory } = useQuery({
    queryKey: ["emailHistory"],
    queryFn: async () => api.get("/email/history").then((res) => res.data),
  });

  const submitEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await api.post("/email/send", {
      to: formData.get("email"),
      subject: formData.get("subject"),
      html: formData.get("html"),
    });

    queryClient.invalidateQueries({ queryKey: ["emailHistory"] });
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel>
          <div className="flex justify-center items-center gap-2 mt-4">
            <h1 className="text-3xl">Envie um email</h1>
          </div>
          <div className="mt-4 max-w-[50%] mx-auto">
            <form onSubmit={submitEmail} className="flex flex-col gap-2">
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

              <Button type="submit" className="text-lg font-semibold h-11">
                Enviar Email
              </Button>
            </form>
          </div>
        </ResizablePanel>
        <ResizableHandle className="min-h-screen" />
        <ResizablePanel>
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <h1 className="text-3xl">Histórico de Emails</h1>

            <DataTable columns={historyColumns} data={emailHistory ?? []} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

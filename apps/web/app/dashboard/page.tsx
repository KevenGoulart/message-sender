"use client";

import SendEmailDialog from "@/components/send-email-dialog";
import api from "@/lib/axios";
import { ArrowRight } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await api.get("/group/all");
      setGroups(response.data);
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await api.get("/template/all");
      setTemplates(response.data);
    };

    fetchTemplates();
  }, []);

  const handleCreateGroup = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    await api.post("/group/create", {
      name: formData.get("name"),
    });
  };

  const handleAddToGroup = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    await api.post("/group/add-to-group", {
      name: formData.get("name"),
      email: formData.get("addTo"),
      groupId: formData.get("groupId"),
    });
  };

  const handleCreateTemplate = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    await api.post("/template/create", {
      name: formData.get("name"),
      content: formData.get("content"),
    });
  };

  const handleSendEmail = async () => {
    setDialogOpen(false);
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="flex">
        <div className="mx-auto w-full mt-2">
          <h2 className="text-3xl text-center">Grupos de Usuários</h2>

          <div className="flex flex-col items-center text-xl">
            <form onSubmit={handleCreateGroup} className="flex flex-col">
              <input
                name="name"
                type="text"
                placeholder="Nome do grupo"
                className="bg-slate-700 p-2 rounded-lg text-slate-100 mt-2"
              />

              <button
                type="submit"
                className="cursor-pointer bg-purple-800 hover:bg-purple-700 p-2 rounded-lg mt-2"
              >
                Criar novo grupo
              </button>
            </form>

            <hr className="bg-slate-400 w-full mt-2" />

            <ul className="flex gap-4 mr-auto ml-4">
              {groups?.map((group: any) => (
                <form
                  onSubmit={handleAddToGroup}
                  key={group.id}
                  className="flex flex-col gap-1 mt-4 w-56"
                >
                  <li className="flex items-center gap-2 text-2xl font-semibold bg-slate-600 p-2 rounded-lg cursor-pointer">
                    {group.name}{" "}
                    <ArrowRight
                      className="ml-auto cursor-pointer hover:text-purple-600 hover:scale-150 transition-transform duration-300"
                      size={32}
                      onClick={() => setDialogOpen(true)}
                    />
                  </li>

                  <input type="hidden" name="groupId" value={group.id} />
                  <input
                    name="addTo"
                    type="text"
                    placeholder="Email a adicionar"
                    className="bg-slate-700 p-2 rounded-lg mt-2"
                  />
                  <input
                    name="name"
                    type="text"
                    placeholder="Destinatário"
                    className="bg-slate-700 p-2 rounded-lg"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer bg-purple-800 hover:bg-purple-700 p-2 rounded-lg"
                  >
                    Adicionar ao grupo
                  </button>
                  <ul className="mt-2">
                    {group.receiver.map((receiver: any) => (
                      <li
                        key={receiver.id}
                        className="bg-slate-500 p-1 rounded-md text-sm text-center mt-1"
                      >
                        {receiver.receiver.name} <br />
                        {receiver.receiver.email}
                      </li>
                    ))}
                  </ul>
                </form>
              ))}
            </ul>
          </div>
        </div>
        <div className="ml-auto mr-4 flex gap-2 min-h-screen">
          <hr className="bg-slate-400 h-full w-px" />

          <div className="mt-1">
            <h2 className="text-3xl">Templates de Email</h2>

            <div className="flex flex-col items-center text-xl gap-2 mt-2">
              <form
                onSubmit={handleCreateTemplate}
                className="flex flex-col gap-1"
              >
                <input
                  name="name"
                  className="bg-slate-700 p-2 rounded-2xl mt-1"
                  placeholder="Nome"
                />
                <input
                  name="content"
                  className="bg-slate-700 p-2 rounded-2xl mt-1"
                  placeholder="Conteúdo"
                />
                <button className="cursor-pointer bg-purple-800 hover:bg-purple-700 p-2 rounded-xl mt-2">
                  Criar novo template
                </button>
              </form>

              <ul className="mt-2">
                {templates.map((template: any) => (
                  <li
                    key={template.id}
                    className="bg-slate-500 p-1 rounded-md text-sm text-center mt-1"
                  >
                    {template.name} - {template.content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <SendEmailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleSendEmail}
      />
    </div>
  );
}

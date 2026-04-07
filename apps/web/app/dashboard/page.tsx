"use client";

import SendEmailDialog from "@/components/send-email-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/axios";
import { ArrowRight } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export interface GroupProps {
  id: string;
  name: string;
  receiver: {
    receiverId: string;
    receiver: ReceiverProps;
  }[];
}

export interface ReceiverProps {
  id: string;
  email: string;
  name: string;
}

export interface TemplateProps {
  id: string;
  name: string;
  content: string;
}

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupProps>({
    id: "",
    name: "",
    receiver: [],
  });

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
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await api.post("/group/create", {
      name: formData.get("name"),
    });
  };

  const handleAddToGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await api.post("/group/add-to-group", {
      name: formData.get("name"),
      email: formData.get("addTo"),
      groupId: formData.get("groupId"),
    });
  };

  const handleCreateTemplate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await api.post("/template/create", {
      name: formData.get("name"),
      content: formData.get("content"),
    });
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="flex">
        <div className="mx-auto w-full mt-2">
          <h2 className="text-3xl text-center">Grupos de Usuários</h2>

          <div className="flex flex-col items-center text-xl">
            <form onSubmit={handleCreateGroup} className="flex flex-col">
              <Input
                name="name"
                type="text"
                placeholder="Nome do grupo"
                className="bg-slate-700 p-2 rounded-lg text-slate-100 mt-2"
              />

              <Button
                type="submit"
                className="cursor-pointer p-2 rounded-lg mt-2"
              >
                Criar novo grupo
              </Button>
            </form>

            <Separator className="mt-2" />

            <ul className="flex gap-4 mr-auto ml-4">
              {groups?.map((group: GroupProps) => (
                <form
                  onSubmit={handleAddToGroup}
                  key={group.id}
                  className="flex flex-col gap-1 mt-4 w-56"
                >
                  <li className="flex items-center gap-2 text-2xl font-semibold bg-slate-600 p-2 rounded-lg cursor-pointer">
                    {group.name}{" "}
                    <ArrowRight
                      className="ml-auto cursor-pointer hover:text-blue-800 hover:scale-150 transition-transform duration-300"
                      size={32}
                      onClick={() => {
                        setSelectedGroup(group);
                        setDialogOpen(true);
                      }}
                    />
                  </li>

                  <Input type="hidden" name="groupId" value={group.id} />
                  <Input
                    name="addTo"
                    type="text"
                    placeholder="Email a adicionar"
                    className="bg-slate-700 p-2 rounded-lg mt-2"
                  />
                  <Input
                    name="name"
                    type="text"
                    placeholder="Destinatário"
                    className="bg-slate-700 p-2 rounded-lg"
                  />
                  <Button
                    type="submit"
                    className="cursor-pointer p-2 rounded-lg"
                  >
                    Adicionar ao grupo
                  </Button>
                  <ul className="mt-2">
                    {group.receiver.map((member) => (
                      <li
                        key={member.receiver.id}
                        className="bg-slate-700 p-1 rounded-md text-sm text-center mt-1"
                      >
                        {member.receiver.name} <br />
                        {member.receiver.email}
                      </li>
                    ))}
                  </ul>
                </form>
              ))}
            </ul>
          </div>
        </div>
        <div className="ml-auto mr-4 flex gap-2 min-h-screen">
          <Separator orientation="vertical" />

          <div className="mt-1">
            <h2 className="text-3xl text-center">Templates de Email</h2>

            <div className="flex flex-col items-center text-xl gap-2 mt-2">
              <form
                onSubmit={handleCreateTemplate}
                className="flex flex-col gap-1"
              >
                <Input
                  name="name"
                  className="bg-slate-700 p-2 mt-1"
                  placeholder="Nome"
                />
                <Input
                  name="content"
                  className="bg-slate-700 p-2 mt-1"
                  placeholder="Conteúdo"
                />
                <Button className="cursor-pointer p-2 mt-2">
                  Criar novo template
                </Button>
              </form>

              <ul className="mt-2">
                {templates.map((template: TemplateProps) => (
                  <li
                    key={template.id}
                    className="bg-slate-700 p-1 rounded-md text-sm text-center mt-1"
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
        templates={templates}
        group={selectedGroup}
      />
    </div>
  );
}

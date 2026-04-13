"use client";

import AddToGroupDialog from "@/components/add-to-group-dialog";
import CreateGroupDialog from "@/components/create-group-dialog";
import CreateTemplateDialog from "@/components/create-template-dialog";
import SendEmailDialog from "@/components/send-email-dialog";
import { templateColumns } from "@/components/templates-columns";
import { DataTable } from "@/components/templates-table";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/axios";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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

  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [addToGroupDialogOpen, setAddToGroupDialogOpen] = useState(false);

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

  return (
    <div className="bg-slate-800 min-h-screen">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel>
          <div className="mx-auto w-full mt-2">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-3xl text-center">Grupos de Usuários</h2>

              <Button
                type="submit"
                onClick={() => {
                  setGroupDialogOpen(true);
                }}
                className="cursor-pointer p-2 rounded-lg"
              >
                Criar grupo
              </Button>
            </div>

            <div className="flex flex-col items-center text-xl">
              <Separator className="mt-2" />

              <ul className="flex gap-4 mr-auto ml-4">
                {groups?.map((group: GroupProps) => (
                  <div
                    key={group.id}
                    className="flex flex-col gap-1 mt-4 w-60 bg-slate-900/30 border-2 border-black/20 p-2 rounded-2xl"
                  >
                    <Item className="border border-white-500">
                      <ItemContent>
                        <ItemTitle className="font-semibold text-2xl">
                          {group.name}
                        </ItemTitle>
                      </ItemContent>
                      <ArrowRight
                        className="ml-auto cursor-pointer hover:text-slate-400 hover:scale-150 transition-transform duration-300"
                        size={32}
                        onClick={() => {
                          setSelectedGroup(group);
                          setDialogOpen(true);
                        }}
                      />
                    </Item>
                    <Button
                      type="submit"
                      onClick={() => {
                        setAddToGroupDialogOpen(true);
                      }}
                      className="cursor-pointer p-2 rounded-lg"
                    >
                      Adicionar membros
                    </Button>
                    <ul className="mt-1">
                      {group.receiver.map((member) => (
                        <Item
                          key={member.receiver.id}
                          variant="muted"
                          className="border-white/10 mt-1"
                        >
                          <ItemContent>
                            <ItemTitle>{member.receiver.name}</ItemTitle>
                            <ItemDescription>
                              {member.receiver.email}
                            </ItemDescription>
                          </ItemContent>
                        </Item>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="ml-auto mr-4 flex gap-2 min-h-screen">
            <div className="mx-auto mt-2">
              <div className="flex justify-center items-center gap-4 mb-2">
                <h2 className="text-3xl text-center">Templates de Email</h2>
                <Button
                  onClick={() => {
                    setTemplateDialogOpen(true);
                  }}
                  className="cursor-pointer p-2 mt-1"
                >
                  Criar template
                </Button>
              </div>

              <DataTable columns={templateColumns} data={templates} />
            </div>
          </div>
        </ResizablePanel>
        <AddToGroupDialog
          open={addToGroupDialogOpen}
          onOpenChange={setAddToGroupDialogOpen}
          group={selectedGroup}
        />
        <CreateGroupDialog
          open={groupDialogOpen}
          onOpenChange={setGroupDialogOpen}
        />
        <CreateTemplateDialog
          open={templateDialogOpen}
          onOpenChange={setTemplateDialogOpen}
        />
        <SendEmailDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          templates={templates}
          group={selectedGroup}
        />
      </ResizablePanelGroup>
    </div>
  );
}

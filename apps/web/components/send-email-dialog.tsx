import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { FormEvent } from "react";
import api from "@/lib/axios";
import { GroupProps, TemplateProps } from "@/app/group/page";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";

interface SendEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: TemplateProps[];
  group: GroupProps;
}

export default function SendEmailDialog({
  open,
  onOpenChange,
  templates,
  group,
}: SendEmailDialogProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateProps | null>(null);

  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTemplate != null) {
      const promises = group.receiver.map((member) =>
        api.post("/email/send", {
          to: member.receiver.email,
          subject: selectedTemplate.name,
          html: selectedTemplate.content,
        }),
      );

      await Promise.all(promises);
    } else {
      const formData = new FormData(e.currentTarget);

      const promises = group.receiver.map((member) =>
        api.post("/email/send", {
          to: member.receiver.email,
          subject: formData.get("name"),
          html: formData.get("content"),
        }),
      );

      await Promise.all(promises);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Enviar email para esse grupo</DialogTitle>
        </DialogHeader>
        <div>
          <DialogDescription>
            Digite o conteúdo ou selecione um template
          </DialogDescription>
          <form onSubmit={handleSendEmail}>
            <div className="mt-2">
              <h3>Envio manual:</h3>
              <Input
                name="name"
                type="text"
                placeholder="Título"
                className={`w-full p-2 rounded-lg mt-1 ${selectedTemplate ? "bg-slate-900" : "bg-slate-700"}`}
                disabled={!!selectedTemplate}
              />
              <Input
                name="content"
                type="text"
                placeholder="Conteúdo"
                className={`w-full p-2 rounded-lg mt-1 ${selectedTemplate ? "bg-slate-900" : "bg-slate-700"}`}
                disabled={!!selectedTemplate}
              />
            </div>

            <ul className="mt-4">
              <h3>Templates:</h3>
              {templates?.map((template: TemplateProps) => (
                <Item
                  key={template.id}
                  className={`${selectedTemplate?.id === template.id ? "bg-slate-900" : "bg-slate-700"} p-2 rounded-md text-center mt-1 cursor-pointer`}
                  onClick={() =>
                    setSelectedTemplate(
                      selectedTemplate?.id === template.id ? null : template,
                    )
                  }
                >
                  <ItemContent>
                    <ItemTitle>{template.name}</ItemTitle>
                    <ItemDescription>{template.content}</ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <Button
                variant="secondary"
                className="mr-2 px-4 py-2 rounded-md cursor-pointer"
                onClick={() => {
                  onOpenChange(false);
                  setSelectedTemplate(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 rounded-md cursor-pointer bg-primary hover:bg-primary/80"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

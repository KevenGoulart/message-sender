import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { createTemplate } from "@/services/template";

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateTemplateDialog({
  open,
  onOpenChange,
}: CreateTemplateDialogProps) {
  const queryClient = useQueryClient();

  const handleCreateTemplate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await createTemplate(
      formData.get("name") as string,
      formData.get("content") as string,
    );

    queryClient.invalidateQueries({ queryKey: ["templates"] });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Criar Template</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleCreateTemplate}>
            <div className="mt-2">
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
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="secondary"
                className="mr-2 px-4 py-2 rounded-md cursor-pointer"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 rounded-md cursor-pointer bg-blue-900 hover:bg-blue-800 text-slate-100"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Criar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

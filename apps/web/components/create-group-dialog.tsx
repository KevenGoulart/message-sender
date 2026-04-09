import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { FormEvent } from "react";
import api from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateGroupDialog({
  open,
  onOpenChange,
}: CreateGroupDialogProps) {
  const handleCreateGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await api.post("/group/create", {
      name: formData.get("name"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Criar Grupo</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleCreateGroup}>
            <div className="mt-2">
              <Input
                name="name"
                className="bg-slate-700 p-2 mt-1"
                placeholder="Nome do grupo"
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

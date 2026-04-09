import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { FormEvent } from "react";
import api from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GroupProps } from "@/app/dashboard/page";

interface AddToGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: GroupProps;
}

export default function AddToGroupDialog({
  open,
  onOpenChange,
  group,
}: AddToGroupDialogProps) {
  const handleAddToGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await api.post("/group/add-to-group", {
      name: formData.get("name"),
      email: formData.get("addTo"),
      groupId: group.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Adicionar Destinatário ao Grupo</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleAddToGroup}>
            <div className="mt-2">
              <Input
                name="name"
                className="bg-slate-700 p-2 mt-1"
                placeholder="Nome"
              />
              <Input
                name="addTo"
                className="bg-slate-700 p-2 mt-1"
                placeholder="Email"
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

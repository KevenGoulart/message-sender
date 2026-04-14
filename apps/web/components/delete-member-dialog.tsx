import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { FormEvent } from "react";
import api from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GroupProps } from "@/app/dashboard/page";

interface DeleteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: GroupProps;
}

export default function DeleteMemberDialog({
  open,
  onOpenChange,
  group,
}: DeleteMemberDialogProps) {
  const handleRemoveFromGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await api.delete("/group/remove-from-group", {
      data: {
        email: formData.get("removeFrom"),
        groupId: group.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Remover destinatário do grupo</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleRemoveFromGroup}>
            <div className="mt-2">
              <Input
                name="removeFrom"
                className="bg-slate-700 p-2 mt-1"
                placeholder="Email"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="secondary"
                className="mr-2 px-4 py-2 rounded-md"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                type="submit"
                className="px-4 py-2 rounded-md"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Remover
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

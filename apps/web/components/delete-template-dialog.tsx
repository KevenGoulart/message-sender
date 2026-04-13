import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import api from "@/lib/axios";
import { Button } from "./ui/button";
import { TemplateProps } from "@/app/dashboard/page";

interface DeleteTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: TemplateProps;
}

export default function DeleteTemplateDialog({
  open,
  onOpenChange,
  template,
}: DeleteTemplateDialogProps) {
  const handleDeleteTemplate = async (template: TemplateProps) => {
    await api.delete("/template/delete", {
      data: {
        templateId: template.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Excluir Template</DialogTitle>
        </DialogHeader>
        <div>
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
              variant="destructive"
              type="submit"
              className="px-4 py-2 rounded-md cursor-pointer"
              onClick={() => {
                onOpenChange(false);
                handleDeleteTemplate(template);
              }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SendEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function SendEmailDialog({
  open,
  onOpenChange,
  onConfirm,
}: SendEmailDialogProps) {
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
          <div></div>
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TemplateColumns } from "./templates-table";
import { Button } from "./ui/button";
import { formatDateTime } from "@/lib/format-date";
import DeleteTemplateDialog from "./delete-template-dialog";
import { useState } from "react";
import EditTemplateDialog from "./edit-template-dialog";

function TemplateActions({ template }: { template: TemplateColumns }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
          Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setDeleteOpen(true)}
        >
          Excluir
        </Button>
      </div>

      <DeleteTemplateDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        template={template}
      />

      <EditTemplateDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        template={template}
      />
    </>
  );
}

export const templateColumns: ColumnDef<TemplateColumns>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "content",
    header: "Conteúdo",
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const template = row.original;
      return <span>{formatDateTime(template.createdAt)}</span>;
    },
  },
  {
    accessorKey: "options",
    header: "Opções",
    cell: ({ row }) => <TemplateActions template={row.original} />,
  },
];

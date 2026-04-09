"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TemplateColumns } from "./templates-table";

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
  },
];

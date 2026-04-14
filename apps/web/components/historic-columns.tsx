"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HistoryColumns } from "./templates-table";

export const historyColumns: ColumnDef<HistoryColumns>[] = [
  {
    accessorKey: "sentTo",
    header: "Enviado para",
  },
  {
    accessorKey: "subject",
    header: "Nome",
  },
  {
    accessorKey: "body",
    header: "Conteúdo",
  },
];

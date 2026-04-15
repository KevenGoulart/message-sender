import api from "@/lib/axios";

export async function fetchTemplates() {
  const response = await api.get("/template/all");
  return response.data;
}

export function createTemplate(name: string, content: string) {
  return api.post("/template/create", { name, content });
}

export function deleteTemplate(templateId: string) {
  return api.delete(`/template/${templateId}`);
}

export function editTemplate(
  templateId: string,
  name: string,
  content: string,
) {
  return api.put("/template/edit", {
    templateId,
    name,
    content,
  });
}

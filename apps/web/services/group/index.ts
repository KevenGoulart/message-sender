import api from "@/lib/axios";

export async function fetchGroups() {
  const response = await api.get("/group/all");
  return response.data;
}

export function addToGroup(name: string, email: string, groupId: string) {
  api.post("/group/add-to-group", {
    name,
    email,
    groupId,
  });
}

export function createGroup(name: string) {
  api.post("/group/create", {
    name,
  });
}

export function removeFromGroup(email: string, groupId: string) {
  api.delete("/group/remove-from-group", {
    data: {
      email,
      groupId,
    },
  });
}

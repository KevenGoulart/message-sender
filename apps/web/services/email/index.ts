import api from "@/lib/axios";

export async function fetchEmailHistory() {
  const response = await api.get("/email/history");
  return response.data;
}

export function sendEmail(to: string, subject: string, html: string) {
  api.post("/email/send", {
    to,
    subject,
    html,
  });
}

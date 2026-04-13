export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

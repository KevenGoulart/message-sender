import api from "@/lib/axios";

export function registerUser(email: string, password: string) {
  return api.post("/users/register", {
    email,
    password,
  });
}

export function loginUser(email: string, password: string) {
  return api.post("/users/login", {
    email,
    password,
  });
}

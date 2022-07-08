export interface User {
  id: number | null;
  name: string;
  email: string;
  password: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Adriano Monteiro",
    email: "aluno@gmail.com",
    password: "alunopassword",
  },
  {
    id: 2,
    name: "Alexsandra Amorim",
    email: "aluna@gmail.com",
    password: "alunapassword",
  },
];

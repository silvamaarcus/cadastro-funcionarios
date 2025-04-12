import { useEffect, useState } from "react";

import { User } from "../types/User";

export interface UseFormProps {
  onSubmit: (user: User) => void;
  initialData?: User;
  isEditing?: boolean;
}

export const UseForm = ({ onSubmit, initialData, isEditing }: UseFormProps) => {
  const [form, setForm] = useState<User>(initialData || {
    id: '',
    name: '',
    email: '',
    status: 'ATIVO',
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ id:'', name: '', email: '', status: 'ATIVO' });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-dark rounded shadow border border-gray-600">
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 bg-dark-light rounded focus:outline-none "
        required
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 bg-dark-light rounded focus:outline-none "
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 bg-dark-light rounded focus:outline-none "
      >
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:opacity-70 cursor-pointer"
      >
        {isEditing ? 'Atualizar' : 'Cadastrar'}
      </button>
      </form>
    </>
  );
};

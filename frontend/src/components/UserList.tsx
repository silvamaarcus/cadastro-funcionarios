import { Pencil, Trash } from "lucide-react";
import { User } from "../types/User";

export interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Funcionários cadastrados</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark border border-gray-600 shadow">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-600 hover:bg-dark-light">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.status === 'ATIVO'
                        ? 'bg-teal-900 text-teal-100'
                        : 'bg-red-900 text-red-100'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-4 space-x-4">
                  <button
                    onClick={() => onEdit(user)}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(user.id!)}
                    className="cursor-pointer hover:text-red-500"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Nenhum funcionário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

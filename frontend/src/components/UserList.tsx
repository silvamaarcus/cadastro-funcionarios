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
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.status === 'ATIVO'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(user.id!)}
                    className="text-red-600 hover:underline"
                  >
                    Deletar
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

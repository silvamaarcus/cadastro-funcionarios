import { useEffect, useState } from 'react';
import { UseForm } from './components/UseForm';
import { UserList} from './components/UserList';
import { User } from './types/User';


const API_URL = 'https://cadastro-funcionarios-production.up.railway.app/users';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleCreateOrUpdate = async (user: User) => {
    try {
      if (editingUser) {
        // Atualização
        await fetch(`${API_URL}/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        setEditingUser(null);
      } else {
        // Criação
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      }
      fetchUsers();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cadastro de Funcionários</h1>
      <UseForm 
      onSubmit={handleCreateOrUpdate}
      initialData={editingUser ?? undefined}
      isEditing={!!editingUser}
      />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;

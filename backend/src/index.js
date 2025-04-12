import express from "express"; // Framework web (rotas, middleware etc.)
import cors from "cors"; // Permite que o backend se comunique com o frontend (API)
import { PrismaClient } from "@prisma/client"; // ORM que conecta com o PostgreSQL
import dotenv from "dotenv"; // Carrega variáveis do arquivo .env

// Inicializa o dotenv
dotenv.config();

// Inicializa o app Express
const app = express();
// Inicializa o Prisma para fazer queries no banco
const prisma = new PrismaClient();

// Habilita o CORS para requisições externas
app.use(cors());
// Habilita o JSON para receber requisições
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

//* GET /users - listar todos os usuários
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

//* POST /users - criar um novo usuário
app.post("/users", async (req, res) => {
  const { name, email, status } = req.body;

  if (!name || !email || !status) {
    return res
      .status(400)
      .json({ error: "Nome, email e status são obrigatórios" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        status,
      },
    });
    // 201 significa que o usuário foi criado com sucesso
    res.status(201).json(newUser); // Retorna os dados do usuário em JSON
  } catch (error) {
    console.error(error);

    // Verifica se o erro é "P2002". O Prisma retorna P2002 se você tentar cadastrar um email já existente.
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email já cadastrado" }); // erro de unique
    }

    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

//* GET /users/:id - buscar um usuário específico
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

//* PUT /users/:id - atualizar um usuário
app.put("/users/:id", async (req, res) => {
  const { id } = req.params; // Captura o id da URL
  const { name, email, status } = req.body; // Captura os dados do corpo da requisição

  try {
    // Verifica se usuário existe
    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualiza usuário
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        status,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

//* DELETE /users/:id - deletar um usuário
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

// Inicializando o servidor na porta 3000, definida no arquivo .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

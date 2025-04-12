# 💼 Sistema de Cadastro de Funcionários — Full Stack App

Projeto full stack com CRUD completo de funcionários, feito com **Node.js, PostgreSQL, Prisma e React**. Desenvolvido para demonstrar habilidades completas em desenvolvimento web — desde o backend com API REST até a interface moderna no frontend.

---

## 🧰 Tecnologias Utilizadas

### Backend:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Neon](https://neon.tech/) (banco de dados em nuvem)

### Frontend:

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/) _(opcional)_

### Deploy:

- [Railway](https://railway.app/) ou [Render](https://render.com/) (Backend)
- [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/) (Frontend)

---

## 🚀 Funcionalidades

- Cadastro de usuários com:
  - Nome (`name`)
  - Email único (`email`)
  - Status (`ATIVO`, `INATIVO`, `AGUARDANDO`)
- API RESTful completa:
  - `POST /users` — Cria um novo usuário
  - `GET /users/:id` — Busca usuário por ID
  - `PUT /users/:id` — Atualiza um usuário
  - `DELETE /users/:id` — Deleta um usuário
- Validações básicas e tratamento de erros
- Integração com banco relacional PostgreSQL
- Testes via Thunder Client / Insomnia

---

## 📂 Estrutura do Projeto

1. É necessário ter o Node.js e o PostgreSQL instalados.
2. Precisa criar um arquivo `.env` na raiz do projeto com as variáveis de ambiente.

```bash
📦 backend/
 ┣ 📦 node_modules/       # Dependências do Node.js
 ┣ 📦 prisma/
 ┃ ┣ 📜 schema.prisma     # Modelo do banco via Prisma
 ┣ 📦 src/
  ┣ 📜 index.js           # API Express com rotas CRUD
 ┣ 📜 package.json        # Dependências e scripts
 ┣ 📜 package-lock.json   #  Gerenciador de dependências

📦 frontend/
```

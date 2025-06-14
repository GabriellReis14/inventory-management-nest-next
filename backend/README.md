# 🛠️ Backend - API NestJS

Backend responsável por autenticação de usuários e controle de estoque de produtos.

---

## 🚀 Tecnologias utilizadas:

- NestJS
- TypeScript
- Prisma ORM
- GraphQL
- SQLite (por padrão)
- JWT para autenticação
- bcrypt para criptografia de senhas

---

## ✅ Funcionalidades:

- Cadastro de usuários
- Login de usuários (gera token JWT)
- Cadastro de produtos
- Edição e exclusão de produtos
- Endpoint de dashboard (total de estoque acumulado)

---

## ⚙️ Como rodar o backend localmente:

1. Entre na pasta `/backend`
2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados (SQLite por padrão):

```bash
npx prisma migrate dev --name init
```

4. Rode o servidor:

```bash
npm run start:dev
```

Por padrão, o projeto usa SQLite para facilitar os testes locais, mas com poucas alterações no .env pode ser apontado para PostgreSQL.

---

## ✅ Observação sobre CORS:

O CORS está habilitado apenas para:  
`http://localhost:3000`

Se o frontend estiver em outra porta, ajuste o `main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:3000',
});
```

---

## 📌 Principais queries e mutations GraphQL:

- **Mutation:** `createUser` → Cadastro de usuário
- **Mutation:** `signIn` → Login de usuário (retorna token JWT)
- **Query:** `products` → Listar produtos
- **Query:** `product/:id` → Listar produtos
- **Mutation:** `createProduct` → Cadastrar produto
- **Mutation:** `updateProduct` → Editar produto
- **Mutation:** `removeProduct` → Deletar produto

---

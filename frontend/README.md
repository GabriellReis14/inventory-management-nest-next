# 🖥️ Frontend - Next.js

Frontend em Next.js responsável pela interface de usuário para:

✅ Login  
✅ Cadastro de usuários  
✅ Cadastro, edição e exclusão de produtos  
✅ Dashboard com total de estoque

---

## 🚀 Tecnologias utilizadas:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Apollo Client
- GraphQL

---

## ⚙️ Como rodar o frontend localmente:

1. Entre na pasta `/frontend`
2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env.local` com a URL da API NestJS:

```
NEXT_PUBLIC_API_URL=http://localhost:3530/graphql
```

4. Rode o frontend:

```bash
npm run dev
```

---

## ✅ Observação sobre CORS:

O backend aceita requisições apenas de:  
`http://localhost:3000`

👉 Se rodar o frontend em outra porta, ajuste o CORS no backend.

---

## ✅ Melhorias futuras:

- Proteção de rotas frontend via JWT
- Implementação de tema Dark
- Gerenciamento de permissões de usuários
- Deploy no Vercel + Render

---

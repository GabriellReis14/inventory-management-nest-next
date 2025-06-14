# 📦 Inventory Management Fullstack - NestJS + Next.js

Projeto Full Stack para **cadastro de usuários, autenticação JWT e controle de estoque de produtos**, com painel de dashboard mostrando o total de produtos no estoque.

---

## 🛠️ Tecnologias utilizadas:

- **Backend:** NestJS (Node.js), TypeScript, Prisma ORM, GraphQL
- **Frontend:** Next.js, React, TypeScript, PrimeReact
- **Banco de dados:** SQLite (por padrão, para facilitar testes)

---

## 🚀 Funcionalidades principais:

✅ Cadastro e autenticação de usuários (login com JWT)  
✅ Cadastro, edição e exclusão de produtos  
✅ Dashboard com total de estoque acumulado  
✅ Integração via API REST entre frontend e backend  
✅ Gerenciamento de estado simples no frontend

---

## 📂 Estrutura de pastas:

```
📂 inventory-management-nest-next
├── 📂 backend (API NestJS)
├── 📂 frontend (Next.js Frontend)
```

---

## ⚙️ Como rodar o projeto localmente:

### Requisitos:

- Node.js instalado
- Yarn ou npm
- (Opcional) SQLite Browser se quiser visualizar o banco

### Passos rápidos:

1. Clone o repositório:

```bash
git clone https://github.com/GabriellReis14/inventory-management-nest-next.git
```

2. Instale dependências do backend e frontend (siga os READMEs de cada pasta).

---

## ⚠️ Observação importante sobre CORS:

O backend NestJS está com o CORS liberado **apenas para a URL `http://localhost:3000`**, que é onde normalmente o Next.js roda.

👉 Se você rodar o frontend em outra porta, pode ocorrer erro de CORS.  
Se precisar, altere a configuração de CORS no backend (`main.ts`).

---

⭐️ **Feito por [Gabriell Reis](https://www.linkedin.com/in/gabriell-reis-alvarenga/)**

---

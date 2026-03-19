# 💸 Pay System

Uma aplicação full-stack moderna para gestão, aprovação e controle de pagamentos a fornecedores. Desenvolvida com foco em agilidade, segurança de dados e organização financeira.

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black)

---

## 🚀 Tecnologias

* **Framework:** Next.js 14+ (App Router)
* **ORM:** Prisma
* **Estilização:** Tabler (Baseado em Bootstrap 5)
* **Ícones:** FontAwesome
* **Banco de Dados:** MySQL (ou outro via Prisma)
* **Deployment:** Vercel

---

## 🛠️ Pré-requisitos

Antes de começar, você precisará ter instalado:

* Node.js (v18 ou superior)
* npm ou yarn
* Banco de dados (MySQl recomendado)

---

## 📦 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pay-system.git
cd pay-system
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pay_system"
NEXTAUTH_SECRET="sua_chave_secreta"
NEXTAUTH_URL="http://localhost:3000"
```

---

### 4. Configure o banco de dados

Execute as migrations:

```bash
npx prisma migrate dev
```

Se quiser popular com dados iniciais:

```bash
npx prisma db seed
```

---

### 5. Rode a aplicação

```bash
npm run dev
```

Acesse no navegador:

```
http://localhost:3000
```

---

## 🧩 Funcionalidades

* Cadastro de fornecedores
* Criação de solicitações de pagamento
* Fluxo de aprovação (multi-nível)
* Controle de status (pendente, autorizado, recusado)
* Histórico completo de ações
* Autenticação de usuários
* Dashboard com visão geral financeira

---

## 📁 Estrutura do Projeto

```bash
.
├── app/                # Rotas e páginas (App Router)
├── components/         # Componentes reutilizáveis
├── lib/                # Utilitários e helpers
├── prisma/             # Schema e migrations
├── public/             # Arquivos estáticos
├── styles/             # Estilos globais
└── types/              # Tipagens TypeScript
```

---

## 🔐 Segurança

* Autenticação com sessões seguras
* Proteção de rotas privadas
* Validação de dados no backend
* Uso de variáveis de ambiente

---

## 🚀 Deploy

### Vercel (recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

---

## 📌 Scripts disponíveis

```bash
npm run dev        # Ambiente de desenvolvimento
npm run build      # Build de produção
npm run start      # Rodar build
npm run lint       # Lint do projeto
```

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch:

```bash
git checkout -b minha-feature
```

3. Commit suas mudanças:

```bash
git commit -m "feat: minha nova feature"
```

4. Push:

```bash
git push origin minha-feature
```

5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido por você 🚀

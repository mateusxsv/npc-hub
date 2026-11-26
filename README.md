# 🎲 NPC HUB — Gerenciador de NPCs para RPG

O **NPC HUB** é um aplicativo mobile desenvolvido para facilitar o cadastro, a organização e o gerenciamento de NPCs (Personagens Não Jogáveis) utilizados em campanhas de RPG.

Com ele, o mestre pode cadastrar personagens, consultar suas informações, editar seus dados e excluir registros quando necessário.

O projeto foi desenvolvido como atividade acadêmica, utilizando React Native com Expo e consumindo uma API própria para armazenamento e gerenciamento dos dados.

## ✨ Funcionalidades

- **Cadastrar NPCs:** adicione personagens com nome, pontos de vida, descrição, campanha e categoria.
- **Listar NPCs:** visualize todos os personagens cadastrados.
- **Editar NPCs:** atualize as informações dos personagens existentes.
- **Excluir NPCs:** remova personagens que não são mais necessários.
- **Persistência de dados:** as informações são armazenadas no banco de dados através do backend.

## 🛠️ Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Expo Router
- JavaScript Fetch API

## 📋 Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- npm
- [Expo Go](https://expo.dev/go) no celular
- Git

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entrar na pasta do projeto

```bash
cd npc-hub
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar a conexão com a API

Abra o arquivo:

```text
constants/api.ts
```

Configure o endereço da API utilizando o endereço IPv4 do computador onde o backend está sendo executado:

```typescript
const API_URL = "http://SEU_IP:3000/api/npcs";

export default API_URL;
```

**Importante:** ao executar pelo Expo Go no celular, utilize o IP local do computador em vez de `localhost`. O celular e o computador devem estar conectados à mesma rede Wi-Fi.

O backend também precisa estar em execução.

### 5. Iniciar o aplicativo

```bash
npx expo start
```

Após iniciar, escaneie o QR Code utilizando o Expo Go no celular.

## 📁 Estrutura do projeto

```text
npc-hub/
│
├── app/
│   ├── _layout.tsx
│   └── index.tsx
│
├── constants/
│   └── api.ts
│
├── assets/
├── package.json
└── README.md
```

*Observação: a estrutura pode conter outros arquivos e pastas gerados pelo Expo.*

## 🔗 Backend

O NPC HUB utiliza uma API própria desenvolvida em Node.js, Express e MongoDB para realizar as operações de cadastro, consulta, edição e exclusão de NPCs.

**Repositório do backend:** URL_DO_REPOSITORIO_BACKEND

## 🎓 Projeto acadêmico

Projeto desenvolvido como atividade acadêmica com o objetivo de praticar o desenvolvimento de aplicações mobile utilizando React Native, Expo e integração com APIs REST.
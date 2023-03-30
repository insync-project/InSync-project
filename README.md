
# InSync

A plataforma é um espaço online para que desenvolvedores possam encontrar outros profissionais interessados em trabalhar em projetos em grupo. Com uma interface intuitiva e recursos de busca avançados, é fácil encontrar pessoas com as habilidades necessárias para fazer o seu projeto acontecer.

---
## Documentação da API

InSync-API é uma API RESTful construída com Node.js e PostgreSQL. Ela permite que os usuários se cadastrem, criem perfis, publiquem projetos, busquem por projetos e profissionais, e façam parcerias.

Este repositório contém o código-fonte e os Endpoints das rotas.

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
    - [Rodando a API](#34-rodando-a-api)
    - [Testes](#35-testes)
- [Estrutura da API](#4-estrutura-da-api)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral
Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)

URL base da aplicação: https://insync-api-v1-lnpi.onrender.com

---

## 2. Diagrama ER
Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![Diagrama do projeto com suas relações!](https://i.ibb.co/xFBt0dH/In-Sync-Project-drawio.png "InSync-Diragrama")

---

## 3. Início rapído
[ Voltar para o topo ](#documentação-da-api)

### 3.1. Instalando dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```
yarn install ou yarn
```

Utilizando npm

```
npm install
```

### 3.2. Variáveis de Ambiente
Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn run typeorm migration:generate ./src/migrations/InitialMigration -- -d ./src/data-source.ts
```

Suba suas migrations com o comando:

```
yarn run typeorm migration:run -- -d ./src/data-source
```

Remova suas migrations do banco com o comando:

```
yarn run typeorm migration:revert -- -d ./src/data-source
```

### 3.4. Rodando a API

Para rodar a API localmente use o comando:

```
yarn run dev
```

Segue abaixo os comandos para a build do projeto:

```
yarn run build
```

```
yarn typeorm migration:run -d dist/data-source
```

```
yarn run start
```

### 3.5. Testes

Primeiro, mude sua variavel de ambiente para test:

![Exemplo variavel test](https://i.ibb.co/9tPqj4n/env-test.png "Exemplo variavel")

Agora rode esse comando no terminal:

```
yarn run test
```

Você pode tambem rodar os testes individualmente:

```
yarn run test <Nome do arquivo.spec.ts>
```

---


## 4. Estrutura da API

[ Voltar para o topo ](#tabela-de-conteúdos)

é possivel acessar a documentação da API criada com Swagger pelo link abaixo:

[InSync-Documentação](https://insync-api-v1-lnpi.onrender.com/api-docs/)

Essa documentação descreve os recusos que a API possuí, como Endpoints, exemplos de requisição, exemplos de retorno e metodos de autenticação


## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - POST - /users
    - POST - /users/login
    - GET - /users/profile
	- GET - 	/users/profile/:nickname
  - PATCH - /users/:userId
  - DELETE - /users/:userId
- [Projects](#2-products)
    - POST - /projects
    - GET - /projects
    - GET - /projects/:projectId
    - PATCH - /projects/:projectdId
    - DELETE - /projects/:projectId
- [Technologies](#3-cart)
    - POST - /technologies
    - POST - /technologies/users
    - POST - /technologies/projects/:projectId
    - GET - /technologies
    - DELETE - /technologies/:techId
    - DELETE - /technologies/users
    - DELETE - /technologies/projects/:projectId
- [Teams](#3-cart)
    - POST - /teams/projects/:projectId
    - PUT - /teams/:projectId/users/:userId
    - DELETE - /teams/:projectId/users/:userId


---

## 1. **Users**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do usuário                  |
| name       | string | O nome do usuário.                              |
| email      | string | O e-mail do usuário.                            |
| nickname   | string | O nickname do usuário.                          |
| password   | string | A senha de acesso do usuário                    |
| admin      | boolean | Define se um usuário é Administrador ou não.   |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | [/users](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Users/post_users)     | Criação de um usuário.                  |
| POST     | [/users/login](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Users/post_users_login)    | Login com um usuário.             |
| GET      | [/users/profile](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Users/get_users_profile)    | Lista os dados do usuário logado|
| GET      | [/users/profile/:nickname](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Users/get_users_profile__nickname_)   | Lista os dados do usuário logado pelo nickname| 
| PATCH     | [/users/:userId ](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Users/patch_users__id_)  | Atualiza os dados de um usuário.   |
| DELETE     | [/users/:userId ](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Users/delete_users__id_)   | Realiza um softdelete em um usuário   |

---

## 2. **Projects**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Project é definido como:

| Campo      | Tipo   | Descrição                                       |
| -----------|--------|-------------------------------------------------|
| id         | number | Identificador único do projeto.                 |
| name       | string | O nome do projeto.                              |
| description   | string | A descrição do projeto.                      |
| devType   | string | O tipo do projeto.                               |
| status   | string | O status do projeto.                              |
| cover      | string | Imagem do projeto.                              |
| maxUsers      | number | Capacidade maxima de usuários no projeto.    |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | [/projects](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Projects/post_projects)     | Criação de um projeto.                  |
| GET      | [/projects](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Projects/get_projects)    | Listar todos os projetos.|
| GET      | [/projects/:projectId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Projects/get_projects__projectId_)   | Listar um projeto pelo id.| 
| PATCH     | [/projects/:projectId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Projects/patch_projects__projectId_)  | Atualiza os dados de um projeto.   |
| DELETE     | [/projects/:projectId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Projects/delete_projects__projectId_)   | Realiza um softdelete em um projeto.   |

---

## 3. **Technologies**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Technologies é definido como:

| Campo      | Tipo   | Descrição                                       |
| -----------|--------|-------------------------------------------------|
| id         | number | Identificador único da tecnologia.              |
| name       | string | O nome da tecnologia.                           |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | [/technologies](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Technologies/post_technologies)     | Criação de uma tecnologia.   |
| POST     | [/technologies/users](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Users/post_technologies_users)    | Adicionar tecnologias a um usuário.|
| POST     | [/technologies/projects/:projectId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Projects/post_technologies_projects__projectId_)   | Adicionar tecnologias a um projeto.| 
| GET      | [/technologies](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Technologies/get_technologies)  | Listar todas as tecnologias.   |
| DELETE     | [/technologies/:techId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Technologies/delete_technologies__techId_)   | Deleta uma tecnologia. |
| DELETE     | [/technologies/users](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Technologies/delete_technologies_users)   | Deleta tecnologia de um usuário. |
| DELETE     | [/technologies/projects/:projectId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Technologies/delete_technologies_projects__projectId_)   | Deleta tecnologia de um projeto. |

---

## 4. **Teams**
[ Voltar para os Endpoints ](#5-endpoints)

```
O objeto Teams não possui body
```

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | [/teams/projects/:userId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Teams/post_teams_projects__projectId_)     | Adicionar usuário a um time.                  |
| PUT      | [/teams/:projectId/users/:userId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Teams/put_teams__projectId__users__userId_)    | Permitir usuário a entrar no time.|
| DELETE   | [/teams/:projectId/users/:userId](https://insync-api-v1-lnpi.onrender.com/api-docs/#/Teams/delete_teams__projectId__users__userId_)   | Remover usuário de um time.| 

---


## Autores

- [@GabrielRF](https://www.github.com/GabrielRodriguesFerreira-TI)
- [@Antonio](https://github.com/AntonioSantosBJPE)
- [@Jean](https://github.com/jeanhsouza)


<h1 align="center">
     <a href="https://mydindin.netlify.app/" alt="site do ecoleta"> Backend de Transações </a>
</h1>

<p align="center">
  <img alt="typescript logo" src="https://img.shields.io/badge/-TypeScript-grey?style=flat-square&logo=typescript">
  <img alt="node logo" src="https://img.shields.io/badge/-Nodejs-grey?style=flat-square&logo=Node.js">
  <img alt="postgresql logo" src="https://img.shields.io/badge/-PostgreSQL-grey?style=flat-square&logo=postgresql">    
  <img alt="prisma logo" src="https://img.shields.io/badge/-Prisma-grey?style=flat-square&logo=prisma">  
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"> 
 
</p>

## Sobre o projeto

O projeto foi desenvolvido como solução do desafio técnico propost pelao Kinvo, o qual teve o seguinte enunciado:


>Um estudante a fim de poupar gastos e controlar suas finanças pessoais resolveu desenvolver um aplicativo para lhe ajudar nessa missão. Após um estudo de caso ele mapeou as seguintes funcionalidades:
>
>- Criação da movimentação (receitas e despesas);
>- Atualização da movimentação;
>- Exclusão da movimentação;
>- Listagem de movimentações;
>- Exibição do saldo.

*A descrição completa do desafio pode ser acessada [aqui](./README-ChallengeRequirements.md).
 
 ---

# Tabela de conteúdos

<!--ts-->

- [Funcionalidades](#funcionalidades)
- [Swagger](#swagger)
- [Como executar o projeto](#como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Rodando o projeto](#rodando-o-projeto)
- [Tecnologias](#tecnologias)
- [Autor](#autor)
- [Licença](#licença)
<!--te-->

---

## Funcionalidades 

Segue abaixo todas as funcionalidades listadas para o projeto e as que foram implementadas.

- [x] Criação da movimentação (receitas e despesas);
- [x] Atualização da movimentação;
- [x] Exclusão da movimentação;
- [x] Listagem de movimentações;
- [x] Exibição do saldo.
- [x] Filtro na listagem de movimentações por data (data inicial e data final);
- [x] Paginação na listagem de movimentações.
- [x] API Rest semântica (se escolheu desenvolver uma API Rest);
- [x] Arquitetura minimamente escalável;
- [x] Cobertura mínima de testes automatizados.
- [x] Autenticação:
  - [x] Cadastro de usuário;
  - [x] Login;
  - [x] Necessidade do usuário estar autenticado para a realização das atividades citadas no contexto.
- [ ] Dockerizar a aplicação;
- [ ] Boas práticas de POO (Exemplos: SOLID, Design Patterns, 

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 

A versão utilizada do [Node.js](https://nodejs.org/en/) foi a v16.15.0 e a comunicação com o banco de dados PostgresSQL foi feita através do [Prisma](https://www.prisma.io/).

> Ver documentação [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)

O [schema](./prisma/schema.prisma) segue o seguinte padrâo:

- Usuários
- Transações
- Filtros

#### Rodando o projeto

```bash

# Clone este repositório
$ git git@github.com:fiusks/node.js-challenge.git

# Instale as dependências
$ npm install

# Configurar as variáveis de ambiente nos arquivos .env.test e .env
## A referência de como preencher está no ./env.example

# Rodar o prisma para criar o banco de dados e gerar as tabelas
$ npx run prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3001 - acesse http://localhost:3001

```

Outros scripts estão disponíveis caso possua o [Docker](https://www.docker.com/) instalado e queira rodar os testes:

Criando banco ostgres no docker e conectando ao prisma:


```bash

# configurar o .env.test para utilizar com o Docker
DATABASE_URL="postgresql://prisma:user:password@host:port/database"

# Ex: DATABASE_URL="postgresql://prisma:prisma@localhost:5433/tests"

# Criar o container
$ docker-compose up -d

# Conferir o container e pegar o CONTAINER ID
$ docker ps

# Rodar e logar no banco de dados criado
$ docker exec -it container_id psql -U user database

# Gerar as tabelas no container psql
$ npm run migrate:postgres

# Ex docker exec -it 1322e42d833f psql -U prisma test

```
Rodando os scripts de teste com automatização do docker:

```bash

# Criar o banco de dados no docker
$ npm run docker:up

# Destruir o containr
$ npm run docker:down

# Rodar os testes unitários e de integração
$ npm run test

```
Rodando os s

## Tecnologias

#### [NodeJS](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/)

- **[Bcrypt](https://github.com/auth0/node-jsonwebtoken)**
- **[Express](https://expressjs.com/)**
- **[jest](https://jestjs.io/)**
- **[Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**
- **[Prisma](https://www.prisma.io/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[Supertest](https://github.com/visionmedia/supertest)**
- **[Swagger](https://www.postgresql.org/)**
- **[Yup](https://swagger.io/)**


> Veja todas as dependências no arquivo [package.json](https://github.com/fiusks/dindinV2/blob/main/backend/package.json)

---

## Autor

<a href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/68557347?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Rafael Barros</b></sub></a>

[![Linkedin Badge](https://img.shields.io/badge/-Rafael-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/rafabarros1/)](https://www.linkedin.com/in/rafabarros1/)
[![Gmail Badge](https://img.shields.io/badge/-rafabarros.com@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rafabarros.com@gmail.com)](mailto:rafabarros.com@gmail.com)

---

## Licença

Este projeto está sobe a licença [MIT](./LICENSE).

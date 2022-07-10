> ![Logo Kinvo](https://github.com/cbfranca/kinvo-front-end-test/blob/master/logo.svg)


# Kinvo - Desafio Back-end

De acordo com o desafio proposto, foi construída uma API que auxilia estudantes a controlarem seus gastos através de suas movimentações financeiras. Todas as movimentações são cadastradas, podendo ter suas propriedades alteradas pelo estudante, ou deletada por completo. O estudante então pode listar todas as movimentações e checar o seu saldo final.


# Sumário
1. <a href="#Hosted-APP">Hosted APP</a>
2. <a href="#Documentação-Kinvo-Challenge">Documentação Kinvo-Challenge</a>
3. <a href="#Tecnologias-Utilizadas">Tecnologias Utilizadas</a>
4. <a href="#Configurando-o-Projeto">Configurando o Projeto</a>
5. <a href="#Inicializando">Inicializando</a>
6. <a href="#Gerando-e-Implementando-Migrations-(Prisma)">Gerando e Implementando Migrations (Prisma)</a>
7. <a href="#Rodando-Testes">Rodando Testes</a>
8. <a href="#CI/CD">CI/CD</a>
9. <a href="#API-Endpoints">API Endpoints</a>
10. <a href="#Autor">Autor</a>

## Hosted APP

https://kinvochallenge.herokuapp.com/

## Documentação Kinvo-Challenge

https://kinvochallenge.herokuapp.com/api-docs

## Tecnologias Utilizadas

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://typeorm.io/)
- [Postgres](https://www.prisma.io/)
- [Jest](https://jestjs.io/)


## Configurando o Projeto

Setar variáveis de ambiente de acordo

|        Variável      |      Default     |              Notes             |
| -------------------- | ---------------- | ------------------------------ |
|     `POSTGRES_DB`    |`kinvo-challenge` |          Nome do Banco         |
|    `POSTGRES_USER`   |      `root`      |        Username do Banco       |
|  `POSTGRES_PASSWORD` |      `admin`     |          Senha do Banco        |
|        `PORT`        |      `4100`      |       Porta da Aplicação       |
|     `DATABASE_URL`   |   `PRISMA URL`   |  URL de conexão com o Postgres |
|     `USER_SECRET`    |                  |      Secret - Token Usuário    |

## Inicializando

- Clonar o repositório: `git clone git@github.com:vianagustavo/node.js-challenge.git`
- Instalar dependências: `npm ci`
- Executar aplicação: `npm run dev`

OBS: Há a alternativa de incializar a aplicação via Docker:

- Buildar imagem da aplicação: `docker build -t kinvo-challenge .`
- Executar docker-compose: `docker-compose up -d`

## Gerando e Implementando Migrations (Prisma)

Para adicionar/alterar migrations no model execute:

```
# Gerando e implementando Migrations
$ npx prisma migrate dev

```

## Rodando Testes

Com intuito de relizar testes automatizados, foram realizados testes que estão disponíveis para todos os endpoints da aplicação, e o script utilizado para o rodar o Jest pode ser encontrado no `package.json`.


```
# Rodando os testes
$ npm run test

```

## CI/CD

Aproveitando a iniciativa de utilizar o deploy na plataforma do Heroku, também foram utilizados os conceitos de CI/CD, através do GitHub Actions, sempre que for feito um push ou pull-request para a branch master, adotando boas práticas de desenvolvimento e automação da implantação da nossa aplicação.

O workflow completo pode ser encontrado em: 

``` .github/workflows/deploy.yml ```

## API Endpoints

|  Verbo   |                    Endpoint                     |                 Descrição                  |     Acessível à:      |
| :------- | :---------------------------------------------: | :----------------------------------------: | :-------------------: |
| `POST`   |                    `/student`                   |         Criação de novo estudante          |       ---------       |
| `POST`   |                  `/login/student`               |        Autenticação de estudante           |       ---------       |
| `POST`   |                   `/transaction`                |         Criação de movimentação            |       Estudante       |
| `GET`    |                   `/transaction`                |           Listagem de movimentações        |       Estudante       |
| `PATCH`  |                 `/transaction/:id`              |        Atualização de movimentação         |       Estudante       |
| `DELETE` |                 `/transaction/:id`              |            Deletar movimentação            |       Estudante       |
| `GET`    |                    `/balance`                   |            Listagem do saldo               |       Estudante       |


## Autor

- **Gustavo Ferreira Viana**
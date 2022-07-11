> ![Logo Kinvo](https://github.com/cbfranca/kinvo-front-end-test/blob/master/logo.svg)

# Kinvo - Desafio Back-end

Aplicação backend para finanças pessoais com as seguintes funcionalidades:

Criação da movimentação (receitas e despesas);
Atualização da movimentação;
Exclusão da movimentação;
Listagem de movimentações;
Exibição do saldo.

## Rodando a aplicação

```bash
yarn dev
```

ou

```bash
npm run dev
```

## Testando a aplicação

```bash
yarn test
```

```bash
yarn test tests/login.test.js
```

ou

```bash
npm run test
```

```bash
npm run test tests/login.test.js
```

## Rodando o lint da aplicação

```bash
yarn lint
```

ou

```bash
npm run lint
```

## Deploy

A aplicação encontra-se em deploy no Heroku no seguinte endpoint:

[Deploy](https://node-challenge-backend.herokuapp.com/ "Deploy")

Tendo as seguintes rotas:

Raiz: Retornando identificação da aplicação.

GET "/" https://node-challenge-backend.herokuapp.com

Usuários:

POST "/user"

GET "/user"

GET "/user/:id"

PUT "/user/:id"

DELETE "/user/:id"

Login:

POST "/login"

Revenues:

POST "/revenue"

GET "/revenue"

GET "/revenue/:id"

POST "/search-revenues"

PUT "/revenue/:id";

DELETE "/revenue/:id"

Expenses:

POST "/expense"

GET "/expense"

GET "/expense/:id"

POST "/search-expenses"

PUT "/expense/:id"

DELETE "/expense/:id"

Balance

GET "/balance"

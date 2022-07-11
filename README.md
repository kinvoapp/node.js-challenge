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

# Por: Adriano Monteiro

Software Developer

[<img width="8%" src="https://camo.githubusercontent.com/571384769c09e0c66b45e39b5be70f68f552db3e2b2311bc2064f0d4a9f5983b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f476d61696c2d4431343833363f7374796c653d666f722d7468652d6261646765266c6f676f3d676d61696c266c6f676f436f6c6f723d7768697465">](mailto:adrianomonteirodev@gmail.com)
[<img width="10%" src="https://camo.githubusercontent.com/a80d00f23720d0bc9f55481cfcd77ab79e141606829cf16ec43f8cacc7741e46/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d3030373742353f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465">](https://www.linkedin.com/in/adrianomonteirodev/)
[<img width="10%" src="https://camo.githubusercontent.com/d9d4db0a25f6d41d6ef282c6adc2f9bd5b31201ef00ba580f5a945da4063a937/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f57686174734170702d3235443336363f7374796c653d666f722d7468652d6261646765266c6f676f3d7768617473617070266c6f676f436f6c6f723d7768697465">](https://api.whatsapp.com/send?phone=5585989587554&text=Hi%2C%20Adriano...%20)

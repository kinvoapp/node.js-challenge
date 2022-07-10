> ![Logo Kinvo](https://github.com/cbfranca/kinvo-front-end-test/blob/master/logo.svg)

# Kinvo - Desafio - Back-end Junior

## Instruções

Instalar as dependencias do projeto.

```
yarn
```
ou
```
npm install
```

Depois de devidamente instaladas, basta executar:

```
yarn start
```

## Documentação da API

## Saldo

#### Retorna o saldo total

```http
  GET /transactions/amount
```

## Transações

#### Cria uma nova Transação

```http
  POST /transactions
```

#### Retorna todas as Transações

```http
  GET /transactions
```

#### Retorna Transações por data.

```http
  GET /transactions/:beginDate/:endDate
```

#### Atualiza Transação

```http
  PATCH /transactions/:id
```

#### Exclui uma Transação

```http
  DELETE /transactions/:id
```

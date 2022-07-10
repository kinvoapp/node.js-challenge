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

```
  GET /transactions/amount
```

## Transações

#### Cria uma nova Transação

```
  POST /transactions
```

#### Retorna todas as Transações

```
  GET /transactions
```

#### Retorna Transações por data.

```
  GET /transactions/:beginDate/:endDate
```

#### Atualiza Transação

```
  PATCH /transactions/:id
```

#### Exclui uma Transação

```
  DELETE /transactions/:id
```

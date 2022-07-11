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

#### Retorna o saldo total (revenues - expenses)

```
  GET /balance
```

## Depositos

#### Cria um novo Deposito

```
  POST /revenue
```

#### Retorna todos os depóstios

```
  GET /revenue
```

## Retorna a soma de todos os depóstios

```
  GET /revenue/amount
```

#### Retorna Depositos por data.

```
  GET /revenue/:beginDate/:endDat
```

#### Atualiza Deposito

```
  PATCH /revenue/:id
```

#### Exclui uma Deposito

```
  DELETE /revenue/:id
```

## Despesas

#### Cria uma nova Despesa

```
  POST /expense
```

#### Retorna todas as Despesas

```
  GET /revenue
```

## Retorna a soma de todas as Despesas

```
  GET /expense/amount
```

#### Retorna Depsesas por data.

```
  GET /expense/:beginDate/:endDat
```

#### Atualiza Despesa

```
  PATCH /expense/:id
```

#### Exclui uma Despesa

```
  DELETE /expense/:id
```

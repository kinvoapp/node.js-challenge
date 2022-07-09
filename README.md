# Kinvo - Desafio NodeJs júnior

Um projeto para a Kinvo, desafio de desenvolvimento NodeJs nível júnior, nesta API, um usuário deseja fazer uma organização de gastos, organizando o quanto economiza, o quanto gasta dentro de um período de tempo e também o saldo total que o mesmo possui.

## Documentação da API

## Saldo

#### Retorna o saldo total

```http
  GET api/v1/balance
```

## Receitas

#### Cria uma nova receita

```http
  POST api/v1/income?start={start}&end={end}&page={page}
```

| Parâmetro | Tipo     | Descrição                              |
| :-------- | :------- | :------------------------------------- |
| `name`    | `string` | **Obrigatório**. Nome da nova receita. |
| `value`   | `number` | **Obrigatório**. Valor da receita.     |

#### Retorna todos as receitas

```http
  GET api/v1/income
```

| Parâmetro | Tipo     | Descrição                                                 |
| :-------- | :------- | :-------------------------------------------------------- |
| `start`   | `string` | **Obrigatório**. Timestamp incial, dado em milissegundos. |
| `end`     | `string` | **Obrigatório**. Timestamp final, dado em milissegundos.  |
| `page`    | `string` | Número da página, padrão para 1.                          |

#### Atualiza receita

```http
  PUT api/v1/income/?incomeId={id}
```

| Parâmetro  | Tipo     | Descrição                                   |
| :--------- | :------- | :------------------------------------------ |
| `name`     | `string` | **Obrigatório**. Novo nome da nova receita. |
| `value`    | `number` | **Obrigatório**. Novo valor da receita.     |
| `incomeId` | `number` | **Obrigatório**. Id da receita em questão.  |

#### Exclui uma receita

```http
  DELETE api/v1/income/?incomeId={id}
```

| Parâmetro  | Tipo     | Descrição                                  |
| :--------- | :------- | :----------------------------------------- |
| `incomeId` | `number` | **Obrigatório**. Id da receita em questão. |

## Despesas

#### Cria uma nova despesa

```http
  POST api/v1/spend
```

| Parâmetro | Tipo     | Descrição                              |
| :-------- | :------- | :------------------------------------- |
| `name`    | `string` | **Obrigatório**. Nome da nova despesa. |
| `value`   | `number` | **Obrigatório**. Valor da despesa.     |

#### Retorna todas as despesas

```http
  GET api/v1/spend?start={start}&end={end}&page={page}
```

| Parâmetro | Tipo     | Descrição                                                 |
| :-------- | :------- | :-------------------------------------------------------- |
| `start`   | `string` | **Obrigatório**. Timestamp incial, dado em milissegundos. |
| `end`     | `string` | **Obrigatório**. Timestamp final, dado em milissegundos.  |
| `page`    | `string` | Número da página, padrão para 1.                          |

#### Atualiza despesa

```http
  PUT api/v1/spend/?spendId={id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `name`    | `string` | **Obrigatório**. Novo nome da nova despesa. |
| `value`   | `number` | **Obrigatório**. Novo valor da despesa.     |
| `spendId` | `number` | **Obrigatório**. Id da despesa em questão.  |

#### Exclui uma despesa

```http
  DELETE api/v1/spend/?spendId={id}
```

| Parâmetro | Tipo     | Descrição                                  |
| :-------- | :------- | :----------------------------------------- |
| `spendId` | `number` | **Obrigatório**. Id da despesa em questão. |

## Instalação

Instale com npm, depois de clonar este repo, no terminal execute os seguintes comandos:

```bash
  npm install
  npm run test
```

Depois de instalar as dependências e executar os testes unitários, inicie o servidor com:

```bash
  npm run dev
```

## Insomnia

Na pasta "collection" está o arquivo JSON para importar as requests da API no Insomnia, utilizando a importação por arquivo

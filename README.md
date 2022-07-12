Este projeto é uma API REST que simula o gerenciamento de finanças.

## Ferramentas utilizadas

- Node.js
- Typescript
- Banco de Dados: MySQL
- Express.js
- JWT

## Para testar em uma máquina

- Clone e acesse o diretório do projeto, instale as dependências com o comando `npm install`.
- Renomeie o arquivo `.env.example` para `.env` e preencha as informações com as suas credenciais MYSQL;
- Restaure o banco de dados executando a query do arquivo dbSchema que se encontra na raiz do projeto. Verifique se foi criado o banco com a tabela vazia 'accounts' e 'transactions'.
- Para executar a conectar a API execute no seu terminal o comando `npm start`.

## Estrutura da API

A API foi estruturada no padrão REST e possui sua organização bem definida com entities, models, services, middlewares e controllers, em que:

- Entidades: definem um contrato para a padronização das tabelas e modelos que interagem com o banco de dados;
- Controllers: lidam com as requisições, retornando a resposta esperada;
- Service: valida as informações enviadas na requisição;
- Models: acessam o banco de dados;
- Middlewares: verifica o token.

## Endpoints da API

Alguns endpoints necessitam de autenticação além do conteúdo do body necessário o envio do JWT (JSON Web Token) no campo `authorization` pelo header.

Em caso de erro ou envio de informações inválidas, será retornado uma mensagem explicativa junto com seu respectivo status HTTP.

#### `POST /account` - cria uma nova conta;

Deverá ser enviado no body da requisição um objeto JSON no seguinte formato:

```json
{
  "cpf": "15789468948",
  "name": "Nome Sobrenome"
  "password": "senhaMuitoDifícil"
}
```

#### `POST /account/login` - autentica o usuário gerando um token JWT;

As informações devem ser enviadas no body da requisição no formato:

```json
{
  "cpf": "48466486868",
  "password": "senhaMuitoDifícil"
}
```

<hr>

#### `POST /transactions` - deposita um valor para uma conta;

As informações devem ser enviadas no body da requisição no formato:
O token retornado do login deve ser encaminhado na header da requisição:

```json
{
  "value": 300,
  "description": "Primeiro salário.",
  "type": "debit" ou "credit",
  "accountId": 1,
}
```

<hr>

#### `DELETE /transactions/id` - deleta o registro da transação;

O token retornado do login deve ser encaminhado na header da requisição:

#### `PUT /transactions/id` - atualiza a descrição do registro da transação;

As informações devem ser enviadas no body da requisição no formato:
O token retornado do login deve ser encaminhado na header da requisição:

```json
{
  "description": "Primeiro salário."
}
```

#### `GET /transactions` - atualiza a descrição do registro da transação;

O token retornado do login deve ser encaminhado na header da requisição.

## Insomnia

Uma cópia da collection que utilizei para testes se encontra na raiz do projeto, em formato json com o nome `collection`.

> > Feito com carinho por [felipelouzeiro <3](https://www.linkedin.com/in/felipelouzeiro/).

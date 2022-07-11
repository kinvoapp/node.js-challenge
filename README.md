# Kinvo Challenge
Este repositório é a execução de um desafio cuja descrição está presente no arquivo "ChallengeDescription.md".
### Contexto
Um estudante a fim de poupar gastos e controlar suas finanças pessoais resolveu desenvolver um aplicativo para lhe ajudar nessa missão. Após um estudo de caso ele mapeou as seguintes funcionalidades:
- Criação da movimentação (receitas e despesas);
- Atualização da movimentação;
- Exclusão da movimentação;
- Listagem de movimentações;
- Exibição do saldo.
## Tecnologias Utilizadas
Para o desenvolvimento desta aplicação, foram utilizadas as seguintes tecnologias:
- Express
- Prisma
- SQLite
## Funcionalidades Desenvolvidas

Foram desenvolvidas as funcionalidades esperadas ao nível Júnior, além do cadastro e consulta de usuários, e acesso a transações somente para usuários autenticados.

## Como Rodar
Para rodar este projeto, pode-se utilizar o gerenciador de pacotes `yarn`, primeiramente rodando o comando `yarn`, para instalar todas as dependências.
Após isto, rodar o comando `yarn dev`, que fará funcionar a dependência `ts-node-dev`, e colocará o sistema em pé, rodando na porta 3000 do seu localhost. Como o banco de dados utilizado foi SQLite, não se faz necessária qualquer instalação. 
 
## Rotas
### Rotas de Usuário
- `/users/all`: `GET`
- `/users/:id`: `GET`
- `/users/new`: `POST`
- `/login`: `POST`

### Rotas de Transações
- `/transactions/all`: `GET` 
- `/transactions`: `GET`
- `/transactions/balance`: `GET`
- `/transactions/paginate`: `GET`
- `/transactions/new`: `POST`
- `/transactions/update/:id`: `PUT`
- `/transactions/delete/:id`: `DELETE`
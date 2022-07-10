> ![Logo Kinvo](https://github.com/cbfranca/kinvo-front-end-test/blob/master/logo.svg)

## Instruções para executar

### Comandos

Com o node já instalado, conecte o banco de dados pelo arquivo .env (deixei alguns exemplos), e caso use outro banco de dados que não seja o postgres, altere no arquivo /prisma/schema.prisma

 basta rodar os comandos abaixo:

`git clone https://github.com/otaviomartinss/challenge.git`

`npm install`

`npm run build`

`npx prisma migrate dev`

`npm run start:dev`

Pronto, agora é só entrar no insomnia, o collection está junto ao projeto.

O cache tem um TTL de 30 segundos, por isso após fazer post, update e delete, ele não vai refletir imediatamente no get. O TTL também pode ser alterado em /src/modules/carteira.module.ts, após a implementação do cache, o tempo de resposta das requisições reduziu cerca de 40 a 70%, com isso, temos uma api mais rápida e com menos requisições ao banco de dados.

### Endpoints

/api/movimentacao<br />
  POST adiciona movimentação<br />
  Obs: No "tipo" colocar se é "receita" ou "despesa", se for despesa no valor colocar negativo ex: -369.50
  GET lista todas as movimentações<br />

/api/movimentacao/:id<br />
  PUT atualiza movimentação<br />
  DELETE deleta movimentação<br />

/api/movimentacao/:page<br />
  GET utiliza paginação para listar as movimentações troque :page pelo número da página que deseja acessar (cada página vai listar 10 movimentações)<br />

/api/inicial/:dataInicial/:dataFinal<br />
  GET filtra e lista todas as movimentações entre a data inicial e a data final da mais antiga para a mais recente (para usar paginação é só adicionar /:page e trocar :page pelo número da página que deseja acessar como no anterior)<br />
  Obs: use as datas no formato => ano-mes-diaT03:00:00.000Z (pode alterar o horário também)<br />

/api/final/:dataInicial/:dataFinal<br />
  GET filtra e lista todas as movimentações entre a data inicial e a data final da mais recente para a mais antiga (para usar paginação é só adicionar /:page e trocar :page pelo número da página que deseja acessar como no anterior)<br />
  Obs: use as datas no formato => ano-mes-diaT03:00:00.000Z (pode alterar o horário também)<br />

/api/saldo<br />
  GET consulta saldo da carteira


## Descrição das versões
v1 <br />
Upload com todos os arquivos para o git<br />

v2<br />
GET, POST, PUT conectando com o banco<br />
Banco de dados atualizado<br />

v3<br />
GET, POST, PUT, DELETE 100%<br />
Table movimentacoes atualizada<br />

v4<br />
Atualizei schema.prisma<br />

v5<br />
Filtragem das datas<br />

v6<br />
Table, Service e Controller do saldo<br />

v7<br />
Consulta de saldo<br />
Paginação<br />

v8<br />
Atualização Service movimentação<br />
Atualização Controller movimentação<br />
Atualização Service saldo<br />
Atualização Controller saldo<br />
Atualização DTO<br />
Aualização schema.prisma<br />

v9<br />
Atualização dos Services e Controllers<br />
Atualização filtragem por data e paginação nos endpoints<br />

v10<br />
.env para testes<br />

v11<br />
update README.md<br />

v12<br />
update README.md<br />

v13<br />
update README.md<br />

v14<br />
add collection<br />
update README.md<br />

v15<br />
update README.md<br />

v16<br />
Atualização saldo<br />

v17<br />
cache<br />
Atualização consulta de saldo<br />
Collection<br />
Atualização gitignore<br />
Atualização packages<br />



# Kinvo - Desafio Back-end

## Instruções

- Utilize Typescript com Node;
- Desenvolva uma API REST ou GraphQL;
- Fique à vontade para escolher as libs, arquitetura, frameworks, banco de dados e etc.;
- Crie um arquivo README com instruções para executar seu projeto;
- Crie a collection do Insomnia ou Postman, salve com o nome "collection".

## Contexto

Um estudante a fim de poupar gastos e controlar suas finanças pessoais resolveu desenvolver um aplicativo para lhe ajudar nessa missão. Após um estudo de caso ele mapeou as seguintes funcionalidades:

- Criação da movimentação (receitas e despesas);
- Atualização da movimentação;
- Exclusão da movimentação;
- Listagem de movimentações;
- Exibição do saldo.

## Requisitos

### Desenvolvedor Júnior

- Filtro na listagem de movimentações por data (data inicial e data final);
- Paginação na listagem de movimentações.

### Desenvolvedor Pleno

- Todos os requisitos do Júnior;
- API Rest semântica (se escolheu desenvolver uma API Rest);
- Arquitetura minimamente escalável;
- Cobertura mínima de testes automatizados.

### Desenvolvedor Sênior

- Todos os requisitos do Pleno;
- Autenticação:
  - Cadastro de usuário;
  - Login;
  - Necessidade do usuário estar autenticado para a realização das atividades citadas no contexto.
- Dockerizar a aplicação;
- Boas práticas de POO (Exemplos: SOLID, Design Patterns, etc.).

### Diferenciais

- Cache;
- Segurança da aplicação;
- Deploy.

## Dicas

- Se optar por uma API REST, tenha cuidado ao definir as rotas e verbos HTTP: faça uso de boas práticas;
- Crie uma aplicação flexível, ou seja, que seja fácil incluir novas funcionalidades;
- Clean Code: o código deve ser fácil de entender;
- Atente-se a boas práticas de versionamento.

## Processo de submissão

1. Faça o fork deste repositório;
2. Faça seu projeto neste fork;
3. Suba as alterações para o seu fork;
4. Submeta uma PR para este repositório.

## Observações:

* O cumprimento dos requisitos solicitados para uma vaga em determinado nível não é garantia de aprovação. <strong>Focamos em avaliar a forma como os requisitos foram cumpridos.</strong>
* Apesar da listagem de requisitos mínimos acima, caso não tenha tido tempo suficiente ou tenha se esbarrado em alguma dificuldade, entregue o desafio ainda que incompleto e conte-nos na descrição do pull request quais foram as suas maiores dificuldades. Não se preocupe, avaliaremos ainda assim! :)
* Está com alguma dificuldade, encontrou algum problema no desafio ou tem alguma sugestão pra gente? Crie uma issue e descreva o que achar necessário ou entre em contato.

### Boa sorte! 🍀


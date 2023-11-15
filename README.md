> ![Logo Kinvo](https://github.com/cbfranca/kinvo-front-end-test/blob/master/logo.svg)

# Kinvo - Desafio Back-end

## Instruções

- Utilize Typescript com Node;
- Desenvolva uma API REST ou GraphQL
  > Desenvolvi uma API GraphQL;
- Fique à vontade para escolher as libs, arquitetura, frameworks, banco de dados e etc.;
  > utilizei express com apollo server e banco de dados postgresql
- Crie um arquivo README com instruções para executar seu projeto;
- Crie a collection do Insomnia ou Postman, salve com o nome "collection".
  - [auth](https://gold-trinity-287909.postman.co/workspace/kinvo-challenge~41289a9d-b2a7-460b-8c4f-b2b1d67cc158/collection/652e2982529f07d5d9fcfc74?action=share&creator=11204020&active-environment=11204020-4f42a95a-4d00-49ee-9da9-244cc0fa800a)
  - [transactions](https://gold-trinity-287909.postman.co/workspace/kinvo-challenge~41289a9d-b2a7-460b-8c4f-b2b1d67cc158/collection/6521c7b8cae43373c3e16f94?action=share&creator=11204020&active-environment=11204020-4f42a95a-4d00-49ee-9da9-244cc0fa800a)
  - [users](https://gold-trinity-287909.postman.co/workspace/kinvo-challenge~41289a9d-b2a7-460b-8c4f-b2b1d67cc158/collection/65285d836150314c8cd17623?action=share&creator=11204020&active-environment=11204020-4f42a95a-4d00-49ee-9da9-244cc0fa800a)

## Contexto

Um estudante a fim de poupar gastos e controlar suas finanças pessoais resolveu desenvolver um
aplicativo para lhe ajudar nessa missão. Após um estudo de caso ele mapeou as seguintes
funcionalidades:

- Criação da movimentação (receitas e despesas);
- Atualização da movimentação;
- Exclusão da movimentação;
- Listagem de movimentações;
- Exibição do saldo.

## Requisitos

### Desenvolvedor Júnior

- [x] Filtro na listagem de movimentações por data (data inicial e data final);
- [x] Paginação na listagem de movimentações.

### Desenvolvedor Pleno

- [x] Todos os requisitos do Júnior;
- [x] API Rest semântica (se escolheu desenvolver uma API Rest);
- [ ] Arquitetura minimamente escalável;
- [x] Cobertura mínima de testes automatizados.

### Desenvolvedor Sênior

- [ ] Todos os requisitos do Pleno;
- [x] Autenticação:
  - [x] Cadastro de usuário;
  - [x] Login;
  - [x] Necessidade do usuário estar autenticado para a realização das atividades citadas no
        contexto.
- [x] Dockerizar a aplicação;
- [ ] Boas práticas de POO (Exemplos: SOLID, Design Patterns, etc.).

### Diferenciais

- [ ] Cache;
- [ ] Segurança da aplicação;
- [ ] Deploy.

## Dicas

- Se optar por uma API REST, tenha cuidado ao definir as rotas e verbos HTTP: faça uso de boas
  práticas;
- Crie uma aplicação flexível, ou seja, que seja fácil incluir novas funcionalidades;
- Clean Code: o código deve ser fácil de entender;
- Atente-se a boas práticas de versionamento.

## Processo de submissão

1. Faça o fork deste repositório;
2. Faça seu projeto neste fork;
3. Suba as alterações para o seu fork;
4. Submeta uma PR para este repositório.

## Observações:

- O cumprimento dos requisitos solicitados para uma vaga em determinado nível não é garantia de
  aprovação. <strong>Focamos em avaliar a forma como os requisitos foram cumpridos.</strong>
- Apesar da listagem de requisitos mínimos acima, caso não tenha tido tempo suficiente ou tenha se
  esbarrado em alguma dificuldade, entregue o desafio ainda que incompleto e conte-nos na descrição
  do pull request quais foram as suas maiores dificuldades. Não se preocupe, avaliaremos ainda
  assim! :)
- Está com alguma dificuldade, encontrou algum problema no desafio ou tem alguma sugestão pra gente?
  Crie uma issue e descreva o que achar necessário ou entre em contato.

### Boa sorte! 🍀

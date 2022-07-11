### API REST com Nodejs e TypeScript

 - API REST desenvolvido com TypeScript, NodeJS;
 - Foi utilizado o TypeORM mais atualizado para executar com o NodeJS;
 - Como framework para o NodeJS, foi utilizado o Express.js;
 - Para o banco de dados foram utilizados o PostgreSQL como sistema gerenciador e o Beekeeper Studio como editor SQL;
 - Como ferramenta de teste dos métodos da API, foi utilizado o Insomnia;
## Instruções:

 - Na pasta principal, tem um documento em .json com o nome collection (para o insomnia). Importe o documento para o Insomnia.
 
 - Configure o arquivo .env:

        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=postgres
        DB_PASS=postgres
        DB_NAME=postgres

        PORT=3333
    
    > o DB_PORT deve conter a porta do seu banco de dados (geralemnte é localhost:5432);
    > Configure o DB_USER com o seu usuário do banco de dados, por exemplo: o postgres vem com usuário padrão "postgres". Você deverá escrever o nome de usuário cadastrado no seu banco de dados;
    > Em DB_PASS, você deverá colocar a senha do banco de dados: o postgres vem com a senha "postgres" como padrão. Você deverá inserir a sua;
    > DB_NAME é o nome do seu banco de dados. Aqui está como "postgres";
    > Na opção PORT, insira em qual porta a sua aplicação vai subir. (Ex: localhost:3000).
    > Se utilizar outro banco de dados, não esqueça de fazer a alteração no arquivo "data-source.ts" em:
         
         AppDataSource = new DataSource({
            type: 'postgres' >> (altere para o tipo de banco de dados que irá utilizar, caso não seja o postgres)
    
 - A aplicação tem apenas funcionalides simples de um CRUD.
 - Teste a aplicação no Insomnia seguindo as rotas que constam em "routes/routes.ts"

 


# Api Rest com sistema CRUD construído em Node.js, Express e MongoDB Atlas.

### Api Rest construída com Node.JS, Express, Sucrase, Nodemon e o MongoDB Atlas para serviços de armazenamento. O sistema permite criação, leitura, atualização e exclusão.

## Configurações Iniciais

### É preciso criar um Cluster no MongoDB Atlas. Crie um conta, clique em Build my first cluster e deixe a configuração padrão. Clique em Create Cluster. Logo após, clique em CONNECT para criar um conexão com o banco de dados, clique em Add a Different IP Address e digite o seguinte ip 0.0.0.0/0 que permite o acesso ao seu banco de dados de qualquer lugar, depois clique em Add IP Address. Na mesma página crie um username e password do banco de dados, anote as credenciais. Clique em Create MongoDB User e, em seguida, clique em Choose a connection method, escolha a opção Connect your application, selecione o driver Node.js e copie a string de conexão na parte inferior de Connection String Only. Clique em Close.

### Por fim, configure as variáveis de ambiente no arquivo .env na raíz do projeto. Cole a string de conexão no valor a ser recebido na url do mongodb. Substitua pela senha do usuário do banco de dados.

## Intale os Pacotes

### yarn install ou npm install

## Testando a API

### Utilizando o insomnia crie as rotas para testar a api

## Listar Transações

### Com o método GET http://localhost:3333/transactions 

## Listar transação por ID

### Com o método GET http://localhost:3333/transactions/id 

## Criar Transação

### Com o método POST http://localhost:3333/transactions/

## Atualizar Transação

### Com o método PUT http://localhost:3333/transactions/id

## Deletar Transação

### Com o método DELETE http://localhost:3333/transactions/id
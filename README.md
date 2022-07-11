## Instruções antes da instalação
1. Verficar se possui o docker instalado.
2. Verificar se possui o NodeJs e NPM instalados.

## Instalação 
1. Execute o comando 'npm install' na raiz do projeto. (Nota-se que a para executar o comando não se deve por as '').
2. No arquivo docker-compose.yml,  altere o diretório do volume do banco de dados.
3. Execute o comando 'docker compose up -d', para que seja criado o container do banco local.

## Execução
1. Execute o comando 'npm run start' para iniciar o projeto.

## Observações
1. Toda a configuração do banco local pode ser alterada nos arquivos ormconfig.js e no .env.
2. Utilize os arquivos de collection na pasta collection para carregar os endpoints e as variaveis globais para seu workspace no postman.
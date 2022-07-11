# Projeto Kinvo Controle de Finanças

## Foi utilizado para contrução:
- `node.js (API)`;
- `react (FRONT)`;
- `base de dados MongoDB`;

## Estrutura da base de dados:
- `Usuário (User):`
    - `name: String`
    - `password: String`
    - `email: String`
- `Movimentação (Move):`
    - `user: String`
    - `name: String`
    - `type: String`
    - `value: Number`
    - `date: Date`
    - `desc: String`

## Instalação
- `/web e /api -> npm i`;

## Inicialização
- `/web -> npm i`;
- `/api -> npm run dev`;
- `usuário padrão criado automaticamente na inicialização da aplicação: admin, senha: admin`;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/finance-control/blob/main/api/database/conn.js);
- [FRONT - conexão com a API](https://github.com/rtof83/finance-control/blob/main/web/src/api.js);

### a aplicação pode ser acessada através do link:
- http://finance-control-kinvo.s3-website-us-east-1.amazonaws.com
- `FRONT armazenado em instância Amazon S3`;
- `API instanciado em EC2 AWS (http://44.199.229.37:3001/)`;

### Implementações API:
- `Utilização de models mongoose para Usuário e Movimentações`;
- `Rotas de acesso (para os métodos GET, POST, DELETE E PATCH):`;
    - `{baseURL}/user -> retorna, atualiza, exclui usuários`;
    - `{baseURL}/move -> retorna, atualiza, exclui movimentações`;
    - `{baseURL}/statement -> retorna extrato`;
    - `{baseURL}/{rota}/:id -> retorna registro por ID`;

### Implementações FRONT:
- `Cadastro, alteração e exclusão de Usuário`;
- `Cadastro, alteração e exclusão de Movimentação`;
- `Lista Usuários`;
- `Lista Movimentações`;
- `Extrato`;
- `Login`;

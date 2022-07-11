# Kinvo_Api
Api desenvolvida como desafio técnico, baseada em uma solução de movimentações monetárias de receitas e despesas (_Incomes_ e _Expenses_)

# Como foi desenvolvida?
A api foi pensada em torno da prática com TDDs, utilizando de testes unitários (arquivos terminados em **UseCase.spec.ts**) e testes de integração (arquivos terminados em **Controller.spec.ts**), isto devido os _UseCases_ serem as regras de negócio, a aplicação das funcionalidades exigidas e regras que regem a solução, enquanto os _Controllers_ são responsáveis por controle de rotas, o que integram o funcionamento da entrada e da saída da aplicação, testando o funcionamento do início ao fim.

# Arquitetura
A divisão dos arquivos e funcionalidades foi pensada de modo a separar as funcionalidades, utilizando algumas das regras de SOLID, respeitando o principio da responsabilidade única e do Princípio da substituição de Liskov.

Essa separação fica clara ao utilizar interfaces pra os repositórios e provedores, o que facilita o processo de gerar arquivos para teste e para produção, além da utilização de ORMs, neste caso do TypeOrm (versão 0.2.45, escolhida por ser a qual tenho mais prática), a utilização do ORM não somente facilita a interação com banco de dados, como também modulariza a troca futura para um novo banco de dados caso seja necessário (No caso aqui estou utilizando Postgres)

Essa escalabilidade foi um dos pontos fortes que tentei agregar ao código, podendo sempre trocar a tecnologia por de trás dos provedores e repositórios (estes que são as ferramentas que realmente executam as funcionalidades diretamente), o que facilita o crescimento da aplicação no futuro.

# Tecnologias utilizadas
Esta aplicação foi desenvolvida em Typescript, utilizando Node.js, além de frameworks e bibliotecas que auxiliaram no desenvolvimento, como Express, Tsyringe, Jest, Supertest e Dayjs.

Outro ponto está no Eslint e Prettier, utilizados para manutenção e organização do código de forma mais automatizada (aqui optei pelo padrão AirBnb, por ser o que mais utilizo no backend).

# Lógica por de trás da aplicação
Como o tempo para desenvolvimento era relativamente curto, foquei em girar a aplicação em torno de um único módulo, e como a descrição da aplicação específica que é para uso pessoal, acaba não sendo muito problema em termos de segurança, mas é importante deixar claro que para alterar para um sistema de contas e login, seria completamente possível, a partir da criação da migração para tabela de usuários, a sua devida entidade e a correlação de sua _Foreign Key_ com a tabela de statements.

A partir disso criar as rotas, controladores e casos de usos para a respectiva necessidade, apesar de que para uso pessoal, seria importante criar uma opção de Admin que seria criável apenas por uma seed de usuário admin, que deveria ser criada na pasta *src/shared/infra/typeorm/seeds*.

A aplicação tem as seguintes rotas:

- /api/v1/statements (GET): Para puxar as statements disponíveis em a partir de uma certa data, ou até uma certa data, o sistema conta com uma forma de Paginação, usando as variáveis **date** para a Data desejada, **by** para o tipo se é por *start_date* ou por *final_date*, itensPerPageType para a seleção do tipo de paginação (quantidade de itens por página) e **pageNumber** para o número da página desejada.

- /api/v1/statements/balance (GET): Para calcular o saldo da conta, baseado nos statements criados.

- /api/v1/statements/income (POST): Para criar uma movimentação de Income (receita), repassando os dados de **amount** (valor) e **description** (descrição).

- /api/v1/statements/expense (POST): Para criar uma movimentação de Expense (despesa), repassando os dados de **amount** (valor) e **description** (descrição).

- /api/v1/statements/:id (DELETE): Para deletar um _statement_ específico, o id é repassado pelos parâmetros de rota, é feito uma verificação se o _Statement_ existe.

- /api/v1/statements/:id (PUT): Para atualizar um _statement_ específico, o id é repassado pelos parâmetros de rota, enquanto os dados de **amount** (valor) e **description** (descrição) e **type** (tipo, se é "income" ou "expense") é feito uma verificação se o _Statement_ existe.

# Como utilizar / testar
Após clonar o repositório do github, rodar `yarn` para instalar todas as dependências, cuidado com a dependência do Typeorm para que permaneça na versão 0.2.45 e não atualize para uma versão mais nova, o que causará problemas na aplicação.

Após isso, é preciso estar com o Docker instalado, e rodar o comando `docker-compose up` no terminal na pasta do projeto.

Ao terminar a instalação e levantamento dos dois containers (Aplicação e Database), rodar `yarn typeorm migration:run`, para rodar as migrations e `yarn seed:mock-data` para gerar os dados para teste aleatórios e utilizar as rotas para testar

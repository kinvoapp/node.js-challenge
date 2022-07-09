# Node.js Challenge - Jeferson Lucas

## Challenge

### Context

A student in order to save expenses and control his personal finances decided to develop an application to help him in this mission. After a case study he mapped the following features:

- Creation of movement (income and expenses);
- Movement update;
- Exclusion of the movement;
- List of movements;
- Balance display.

### Requirements

#### Junior Developer

- Filter in the list of transactions by date (start date and end date);
- Pagination in the movement listing.

#### Pleno Developer

- All Junior requirements;
- Semantic Rest API (if you chose to develop a Rest API);
- Minimally scalable architecture;
- Minimum coverage of automated tests.

#### Senior Developer

- All Plenary requirements;
- Authentication:
  - User registration;
  - Login;
  - User's need to be authenticated to carry out the activities mentioned in the context.
- Dockerize the application;
- Good OOP practices (Examples: SOLID, Design Patterns, etc.).

#### Differentials

- Cache;
- Application security;
- Deploy.

## Starting

Follow this information to start this application.

### Installing

To install, make sure you have [Node.js](https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi) and [Yarn](https://classic.yarnpkg.com/en/) (optional) installed on your computer. Make a copy of this project on your machine. Open the folder of this project in a terminal or command propt and run the following command below:

```bash
$ npm install
#or
$ yarn install
```

### Environment variables

This project makes use of environment variables. Create a `.env` file in the project root with an example of the [.env.example](.env.example) file:

```env
PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```

### Starting the application

With the necessary resources and the project installed on your computer, start the application in development mode with a terminal or command prompt with the following command:

```bash
$ npm run dev
#or
$ yarn run dev
```

The response from this command should look something like this:

```bash
$ ts-node-dev -r tsconfig-paths/register --respawn --transpile-only --ignore-watch node_modules src/server.ts
[INFO] 00:00:00 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.8.1, typescript ver. 4.7.3)
Server started!
```

Open the application on the following port [http://localhost:8080/Hello%20Word](http://localhost:8080/Hello%20Word). The response should be something similar to this:

```json
{
  "message": "Hello Word"
}
```

### Viewing tests

To view the tests for this application, run the following command in the terminal or command prompt:

```bash
$ npm run test
# or 
$ yarn run test
```

Or in watch mode test:

```bash
$ npm run test-watch
# or 
$ yarn run test-watch
```

The response of these commands should look something like this:

```bash
$ jest
 PASS  src/tests/firsTest.spec.ts (00.001 s)
 PASS  src/tests/server.spec.ts (00.001 s)

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1 s
Ran all test suites.
Done in 1s.
```

For other scripts commands, see the `package.json` file of this project.

## Deploy

See this application being deployed by [Heroku](https://nodejs-kinvo-jeferson-luckas.herokuapp.com/Hello%20Word).

## Using the application

To create HTTP requests use some API client to perform your tests and debugs like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).

This application has the following endpoints:

**/:msg**:

- **GET**: `/:msg` - Initial route for message display via parameter.

  - example: [http://localhost:8080/Hello%20Word](http://localhost:8080/Hello%20Word)

  - return:

  ```json
  {
    "message": "Hello Word"
  }
  ```

**/movement**:

- **POST**: `/create` - Creation of movement (income and expenses);.

  - example: [http://localhost:8080/movement/create](http://localhost:8080/movement/create)

  - return:

  ```json
  {
	  "type": "expense",
	  "value": 1000,
	  "category": "studies",
	  "date": "2022-04-18"
  }
  ```
  
  - Validation: this route validates that the fields are valid.

## Stacks

This project is configured with the following stacks:

- Node: `16.13.2`
- TypeScript: `4.7.3`
- Express: `4.18.1`
- Mongoose: `6.4.4`
- Yarn: `1.22.5`
- Jest: `28.1.1`
- Supertest: `6.2.3`
- Babel: `7.18.5`
- ESLint: `8.19.0`
- Git: `2.28.0`
- Git Flow: `1.12.3`

For more information check the [package.json](package.json) file of this project.

## License 

This project is licensed under the MIT license - see the [LICENSE.md](LICENSE.md) for details.
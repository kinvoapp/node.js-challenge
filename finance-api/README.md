# Finance API

REST API built with Node.js for managing personal financial transactions, tested with Jest and containerized using Docker.

This project was created to demonstrate backend development concepts such as:

- REST API design
- Error handling
- Automated testing
- Containerization using Docker
- Database management with Prisma ORM

---

# Technologies

This project uses the following technologies:

- Node.js – JavaScript runtime for building backend applications
- Express.js – Minimalist web framework for building APIs
- Prisma ORM – Database toolkit for Node.js with SQLite
- Jest – JavaScript testing framework used for automated tests
- Supertest – Library used to test HTTP requests
- Docker – Containerization platform to run the application in isolated environments

---

# Project Structure

```
finance-api
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── generated/prisma/
│   ├── lib/
│   │   └── prisma.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── modules/
│   │   └── transactions/
│   │       └── routes/
│   │           ├── transactions.js
│   │           └── balance.js
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── transactions.test.js
│   └── balance.test.js
│
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README.md
```

---

# API Endpoints

| Method | Endpoint          | Description                        |
| ------ | ----------------- | ---------------------------------- |
| GET    | /transactions     | Retrieve all transactions          |
| GET    | /transactions/:id | Retrieve a single transaction      |
| POST   | /transactions     | Create a new transaction           |
| PUT    | /transactions/:id | Update an existing transaction     |
| DELETE | /transactions/:id | Delete a transaction               |
| GET    | /balance          | Retrieve income, expense and balance |

### Query Parameters for GET /transactions

| Param     | Description                        | Example       |
| --------- | ---------------------------------- | ------------- |
| page      | Page number (default: 1)           | ?page=1       |
| limit     | Records per page (default: 10)     | ?limit=10     |
| startDate | Filter by start date               | ?startDate=2026-03-01 |
| endDate   | Filter by end date                 | ?endDate=2026-03-31   |

---

# Running the Project Locally

1. Clone the repository

```
git clone https://github.com/matheusvoliveira/finance-api.git
```

2. Install dependencies

```
npm install
```

3. Configure environment variables

```
cp .env.example .env
```

4. Run database migrations

```
npx prisma migrate deploy
```

5. Run the application

```
npm run dev
```

The API will run at:

```
http://localhost:3000
```

---

# Running Tests

The project uses **Jest** for automated testing and **Supertest** to test HTTP endpoints.

Run tests with:

```
npm test
```

Example tests included:

- Creating a transaction
- Retrieving all transactions
- Retrieving a transaction by id
- Updating a transaction
- Deleting a transaction
- Retrieving balance

---

# Running with Docker

This project can also run inside a **Docker container**, ensuring the same environment across different machines.

### Build and run with Docker Compose

```
docker-compose up --build
```

The API will be available at:

```
http://localhost:3000
```

---

# Example Requests

Create a transaction

POST `/transactions`

```json
{
  "title": "Salário",
  "amount": 5000,
  "type": "income",
  "date": "2026-03-01"
}
```

Example response:

```json
{
  "id": 1,
  "title": "Salário",
  "amount": 5000,
  "type": "income",
  "date": "2026-03-01T00:00:00.000Z"
}
```

Get balance

GET `/balance`

```json
{
  "income": 7000,
  "expense": 2310,
  "balance": 4690
}
```

---

# Features Implemented

- CRUD operations for transactions
- Balance calculation (income, expense and balance)
- Date filter and pagination on transaction listing
- Input validation
- Global error handling middleware
- Automated API tests
- Docker containerization

---

# Author

Matheus Oliveira
Back-end Developer

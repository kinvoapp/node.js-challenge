import request from "supertest";
import app from "../src/server.js";

describe("transaction api", () => {
  test("Should create a transaction", async () => {
    const response = await request(app).post("/transactions").send({
      title: "Test",
      amount: 8000,
      type: "income",
      date: "2026-03-12",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test");
    expect(response.body.type).toBe("income");
  });
});

test("Should return error if title, amount, type, date are empty", async () => {
  // Send a POST request with an empty task
  const response = await request(app).post("/transactions").send({
    title: "",
    amount: null,
    type: "",
    date: "",
  });
  // Expect API to return error 400 bad request
  expect(response.statusCode).toBe(400);
});

test("Should get transactions", async () => {
  const response = await request(app).get("/transactions");
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("data");
  expect(response.body).toHaveProperty("pagination");
  expect(Array.isArray(response.body.data)).toBe(true);
});

test("should get transaction by id", async () => {
  // create a transaction first to get the id
  const create = await request(app).post("/transactions").send({
    title: "Test",
    amount: 8000,
    type: "income",
    date: "2026-03-12",
  });

  const id = create.body.id;

  // get the transaction by id
  const response = await request(app).get(`/transactions/${id}`);

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("id");
  expect(response.body.id).toBe(id);
  expect(response.body.title).toBe("Test");
});

test("should update a transaction", async () => {
  // create a transaction first to get the id
  const create = await request(app).post("/transactions").send({
    title: "Old transaction",
    amount: 1000,
    type: "income",
    date: "2026-03-12",
  });

  const id = create.body.id;

  // update the transaction
  const response = await request(app).put(`/transactions/${id}`).send({
    title: "Updated transaction",
    amount: 2000,
    type: "expense",
    date: "2026-03-13",
  });

  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe("Updated transaction");
  expect(response.body.amount).toBe(2000);
});

test("should delete transaction", async () => {
  // Create a task so we can delete it

  const create = await request(app).post("/transactions").send({
    title: "Delete transaction",
    amount: 10000,
    type: "income",
    date: "2026-03-03",
  });

  const id = create.body.id;

  const response = await request(app).delete(`/transactions/${id}`);

  // If it returns 204 it's deleted
  expect(response.statusCode).toBe(204);
});

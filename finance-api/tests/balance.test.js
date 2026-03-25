import request from "supertest";
import app from "../src/server.js";

test("should get balance", async () => {
  // create an income transaction
  await request(app).post("/transactions").send({
    title: "Salário",
    amount: 5000,
    type: "income",
    date: "2026-03-12",
  });

  // create an expense transaction
  await request(app).post("/transactions").send({
    title: "Aluguel",
    amount: 1500,
    type: "expense",
    date: "2026-03-12",
  });

  const response = await request(app).get("/balance");

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("income");
  expect(response.body).toHaveProperty("expense");
  expect(response.body).toHaveProperty("balance");
  expect(response.body.balance).toBe(
    response.body.income - response.body.expense,
  );
});

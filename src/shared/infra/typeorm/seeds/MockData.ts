import { v4 as uuidv4 } from "uuid";

import { DayjsDateProvider } from "../../../container/providers/DateProvider/implementations/DayjsDateProvider";
import createConnection from "../index";

const dateProvider = new DayjsDateProvider();

async function create() {
  const connection = await createConnection("localhost");

  const mockDataQt = 300;

  const incomeTags = [
    "Dividendos",
    "Venda",
    "Trabalho",
    "Salário",
    "Extra",
    "Freelance",
  ];
  const expenseTags = [
    "Mercado",
    "Contas",
    "Compras",
    "Pedágio",
    "Uber",
    "IFood",
  ];

  const ids = [];
  const amounts = [];
  const types = [];
  const dates = [];
  const descriptions = [];

  for (let i = 0; i < mockDataQt; i += 1) {
    ids.push(uuidv4());

    amounts.push((Math.random() * 1000 + 100).toFixed(2));

    types.push(
      Math.floor(Math.random() * 100) % 2 === 0 ? "income" : "expense"
    );

    const test = Math.floor(Math.random() * 7);
    const randomDays = Math.floor(Math.random() * 3 + 1);
    if (test === 0) {
      dates.push(dateProvider.dateNowInUTC());
    } else if (test % 2 === 0) {
      dates.push(
        dateProvider.manipulateDaysInUTC({ days: randomDays, type: "add" })
      );
    } else {
      dates.push(
        dateProvider.manipulateDaysInUTC({ days: randomDays, type: "subtract" })
      );
    }

    if (types[i] === "income") {
      descriptions.push(
        incomeTags[Math.floor(Math.random() * incomeTags.length)]
      );
    } else {
      descriptions.push(
        expenseTags[Math.floor(Math.random() * expenseTags.length)]
      );
    }
  }

  await Promise.all(
    ids.map(async (id, index) => {
      await connection.query(
        `INSERT INTO STATEMENTS(id, amount, description, type, created_at, updated_at) values('${id}', ${amounts[index]}, '${descriptions[index]}', '${types[index]}', '${dates[index]}', '${dates[index]}')`
      );
    })
  );

  await connection.close();
}

create().then(() => console.log(`Mock Data Inserted`));

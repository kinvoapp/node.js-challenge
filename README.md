# Kinvo - Desafio Back-end

## Rodando a aplicação

```bash
yarn dev
```

ou

```bash
npm run dev
```

## Endpoints

- <details>
      <summary>POST (add a transaction)</summary>

  - Url:

    - `/api/finance`
    - Exemplo: `http://localhost:4000/api/finance`

    - Request:

        - Body

    ```json
    {
      "desc": "Saturday dinner",
      "type": "expense",
      "value": -80,
      "note": "i ordered a hamburguer."
    }
    ```

- Response: - Status: `201 Created`
</details>

- <details>
      <summary>GET (get all records)</summary>

  - Url:

    - `/api/finance/:startDate/:endDate/:limit?`
    - Exemplo: `http://localhost:4000/api/finance/2022-07-07/2022-07-10`
    - Exemplo: `http://localhost:4000/api/finance/2022-07-07/2022-07-10/2`

  - Response:
    - Status: `200 OK`
    - Body
      ```json
      {
        "record": [
          {
            "_id": "62c80b5f154aa3e6bf5de048",
            "desc": "Credit card",
            "type": "expense",
            "value": -1750,
            "note": "Juny travel",
            "createdAt": "2022-07-08T10:47:59.047Z",
            "updatedAt": "2022-07-10T22:42:11.100Z",
            "__v": 0
          },
          {
            "_id": "62c80bed154aa3e6bf5de04c",
            "desc": "Phone bill",
            "type": "expense",
            "value": -150,
            "note": "my family phone bill",
            "createdAt": "2022-07-08T10:50:21.569Z",
            "updatedAt": "2022-07-10T22:42:49.301Z",
            "__v": 0
          }
        ]
      }
      ```
    ```

    ```

</details>

- <details>
      <summary>PATCH (edit a record, by id)</summary>

  - Url:

    - `/api/finance/:id`
    - Exemplo: `http://localhost:4000/api/finance/62c80aa5154aa3e6bf5de039`
    - Request:

      - Body

      ```json
      {
        "desc": "Saturday dinner",
        "type": "expense",
        "value": -80,
        "note": "i ordered a hamburguer with fries, i paid using credit card."
      }
      ```

    - Response:
      - Status: `201 OK`

</details>

- <details>
      <summary>DELETE (delete by id)</summary>

  - Url:

    - `/api/finance/:id`
    - Exemplo: `http://localhost:4000/api/finance/62c80aa5154aa3e6bf5de039`

  - Response:
    - Status: `204 No Content`

- <details>
      <summary>GET (get account balance)</summary>

  - Url:

    - `/api/balance`
    - Exemplo: `http://localhost:4000/api/balance`

  - Response:

    - Status: `200 OK`
    - Body

      ```json
      {
        "balance": 3500
      }
      ```

</details>

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

<details>
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

  - Response: 
    - Status: `201 Created`


</details>

- <details>
      <summary>GET (get all records)</summary>

  - Url:
     - `/api/finance/:startDate/:endDate/:limit?`
     - Exemplo: `http://localhost:4000/api/finance/2022-07-07/2022-07-10`
     - Exemplo: `http://localhost:4000/api/finance/2022-07-07/2022-07-10/2`

  - Response: 
    - Status: `200 OK`


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

    - Response: 
    - Status: `201 OK`    ```



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


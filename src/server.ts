import { app } from "./infra/app"
const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

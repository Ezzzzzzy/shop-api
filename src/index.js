import express from "express"
import connect from "./config/db.config.js"

connect()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    "data": "Hello World!"
  })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

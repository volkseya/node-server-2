import dotenv from "dotenv";
import express from 'express';
import pricesRouter from "./routes/prices.mjs";
import moviesRouter from "./routes/movies.mjs";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/prices", pricesRouter);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
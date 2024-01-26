import { Router } from "express";
import db from "../db.mjs";
var pricesRouter = Router();

const pricesCollection = db.collection("prices");

pricesRouter.get("/", async (req, res) => {
  try {
    const prices = await pricesCollection.find({}).toArray();
    res.json(prices);
  } catch (error) {
    console.error("Error fetching prices", error);
    res.status(500).send("Internal Server Error");
  }
});

pricesRouter.get("/average-prices", async (req, res) => {
  try {
    const averagePrices = await pricesCollection
      .aggregate([
        {
          $group: {
            _id: "$symbol",
            averagePrices: { $avg: "$price" },
          },
        },
      ])
      .toArray();
    res.json(averagePrices);
  } catch (error) {
    console.error("Error fetching prices", error);
    res.status(500).send("Internal Server Error");
  }
});

export default pricesRouter;

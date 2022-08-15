import express from "express";
import dotenv from "dotenv";
import parseInteger from "./utils/parseInteger.js";
import isEven from "./utils/isEven.js";
import isOdd from "./utils/isOdd.js";

dotenv.config();

const app = express();

app.get("/isEven/:numString", (req, res) => {
  const { numString } = req.params;

  const parsedInt = parseInteger(numString);

  if (parsedInt.error || typeof parsedInt.number === "undefined") {
    res.status(400).json(parsedInt);
    return;
  }

  res.status(200).json({ isEven: isEven(parsedInt.number) });
});

app.get("/isOdd/:numString", (req, res) => {
  const { numString } = req.params;

  const parsedInt = parseInteger(numString);

  if (parsedInt.error || typeof parsedInt.number === "undefined") {
    res.status(400).json(parsedInt);
    return;
  }

  res.status(200).json({ isOdd: isOdd(parsedInt.number) });
});

app.listen(process.env.PORT, () => {
  console.log(
    `[Server] API is listening on https://localhost:${process.env.PORT}`
  );
});

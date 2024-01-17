import express from "express";
import { convertMoneyToWord } from "./lib.js";

const port = 3000;

const app = express();

app.get("/convert", (req, res) => {
    const money = req.query.money;
    if (!money) {
        return res.status(404).send("money parameter not defined!")
    }

    const moneyInWords = convertMoneyToWord(parseFloat(money));

    res.send({
        money: money,
        amountInWords: moneyInWords
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
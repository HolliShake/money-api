import express from "express";
import favicon from "serve-favicon";
import { convertMoneyToWord } from "./lib.js";
import path from "path";

const __dirname = path.resolve();
const port = 3000;
const app = express();

app.use(favicon(path.join(__dirname, "public", "favicon.jpeg")));
app.use("/public", express.static('public')); 

app.get("/", (req, res) => {
    res.send("Welcome to Money to Words API")
})

app.get("/convert", (req, res) => {
    const money = req.query.money;
    if (!money) {
        return res.status(404).send("Money parameter not defined!")
    }

    let regex = new RegExp(/^(\d{1, 3}(\, \d{3})*|(\d+))(\.\d{2})?$/);

    if (regex.test(money)) {
        return res.status(400).send("Money parameter is not a valid number!")
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
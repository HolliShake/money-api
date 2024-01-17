const SingleDigitWordMap = Object.freeze({
    "0": "zero",
    "1": "One",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
})

const SingleDigitNonZeroWordMap = Object.freeze({
    ...SingleDigitWordMap,
    "0": "",
})

const TwoOrMorePrepend = Object.freeze({
    "0": "",
    "1": "Ten",
    "2": "Twent",
    "3": "Thirt",
    "4": "Fourt",
    "5": "Fift",
    "6": "Sixt",
    "7": "Sevent",
    "8": "Eight",
    "9": "Nint",
})

const operators = Object.freeze({
    HUNDRED:          0x01,
    THOUSAND:         0x02,
    TEN_THOUSAND:     0x03,
    HUNDRED_THOUSAND: 0x04,
    MILLION:          0x05,
    TEN_MILLION:      0x06,
    HUNDRED_MILLION:  0x07,
})

function getOperator(placeValue) {
    switch (placeValue) {
        case 100:
            return operators.HUNDRED
        case 1_000:
            return operators.THOUSAND
        case 10_000:
            return operators.TEN_THOUSAND
        case 100_000:
            return operators.HUNDRED_THOUSAND
        case 1_000_000:
            return operators.MILLION
        case 10_000_000:
                return operators.TEN_MILLION
        case 100_000_000:
            return operators.HUNDRED_MILLION
        default:
            throw Error(`Number is too big (${placeValue})!!!`)
    }
}

function getAppend(placeValue) {
    switch (placeValue) {
        case 100:
            return "y"
        case 10:
            return "een"
        default:
            return ""
    }
}

function getPlaceValueNumber(fixedSizeNumber) {
   return Math.pow(10, (fixedSizeNumber.length - 1))
}

function moneyToWord(money, hyphen) {
    'use strict';
    if (money?.constructor.name != "Number") {
        throw Error(`invalid number format ${money}!!!`)
    }

    const decimal = money.toString().split(".").reverse().pop();
    let sentence = ""

    let infix = hyphen ? "-" : " "

    if (getPlaceValueNumber(decimal) <= 10) {
        // Once or Tens
        switch (decimal.length) 
        {
            case 1:
                sentence = SingleDigitNonZeroWordMap[decimal]
                break
            case 2:
                if (decimal.charAt(0) == "1")
                    switch (decimal.charAt(1)) {
                        case "0":
                            sentence = "ten"
                            break
                        case "1":
                            sentence = "eleven"
                            break
                        case "2":
                            sentence = "twelve"
                            break
                        default:
                            sentence = TwoOrMorePrepend[decimal.charAt(1)] + getAppend(getPlaceValueNumber(decimal))
                            break
                    }
                else {
                    const finalPrepend = SingleDigitNonZeroWordMap[decimal.charAt(1)]
                    sentence = TwoOrMorePrepend[decimal.charAt(0)] + "y" + ((finalPrepend.length > 0) ? infix : "") + finalPrepend 
                }
                break
        }

        return sentence
    }

    const firstPlaceValue = getPlaceValueNumber(decimal)
    let op = getOperator(firstPlaceValue)

    let ten, hundred, hundred_thousands, thousand, million;

    let append = ""

    switch (op) {
        case operators.HUNDRED:
            append = moneyToWord(parseInt(decimal.substring(1)), true)
            sentence = SingleDigitWordMap[decimal.charAt(0)] + 
            " " + 
            "hundred" + 
            ((append.length > 0) ? " " : "") + append
            break
        case operators.THOUSAND:
            thousand = parseInt(decimal.substring(0, 1))
            hundred = parseInt(decimal.substring(1))
            append = moneyToWord(hundred, true)
            sentence = moneyToWord(thousand) + 
            " " + 
            "thousand" + 
            ((append.length > 0) ? " " : "") + append
            break
        case operators.TEN_THOUSAND:
            ten = parseInt(decimal.substring(0, 2))
            thousand = parseInt(decimal.substring(2))
            append = moneyToWord(thousand)
            sentence = moneyToWord(ten) + 
            " " + 
            "thousand" + 
            ((append.length > 0) ? " " : "") + append
            break
        case operators.HUNDRED_THOUSAND:
            hundred = parseInt(decimal.substring(0, 3))
            thousand = parseInt(decimal.substring(3))
            append = moneyToWord(thousand, true)
            sentence = moneyToWord(hundred, true) + 
            " " + 
            "thousand" + 
            ((append.length > 0) ? " " : "") + append
            break
        case operators.MILLION:
            million = parseInt(decimal.substring(0, 1))
            hundred_thousands = parseInt(decimal.substring(1))
            append = moneyToWord(hundred_thousands, true)
            sentence = moneyToWord(million) + 
            " " + 
            "million" + 
            ((append.length > 0) ? " " : "") + append
            break
        case operators.TEN_MILLION:
                million = parseInt(decimal.substring(0, 2))
                hundred_thousands = parseInt(decimal.substring(2))
                append = moneyToWord(hundred_thousands)
                sentence = moneyToWord(million) + 
                " " + 
                "million" + 
                ((append.length > 0) ? " " : "") + append
                break
        case operators.HUNDRED_MILLION:
            million = parseInt(decimal.substring(0, 3))
            hundred_thousands = parseInt(decimal.substring(3))
            append = moneyToWord(hundred_thousands)
            sentence = moneyToWord(million) + 
            " " + 
            "million" + 
            ((append.length > 0) ? " " : "") + append
            break
        default:
            throw Error(`Operator not implemented`)
    }

    return sentence
}

export const convertMoneyToWord = (money) => {
    return moneyToWord(money, false)
}

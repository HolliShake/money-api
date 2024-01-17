# Number to word converter

## Roadmap
- [x] Support up-to 999 million.
- [ ] Currency support
- [ ] Locale support

## Test (vercel)
<a href="https://money-api-ruddy.vercel.app/convert?money=456" target="blank">Convert 456 in to word</a>

## Samples
### axios
```js
axios.get('https://money-api-ruddy.vercel.app/convert?money=456')
    .then(({ money, amountInWords }) => {

        console.log(money, "=", amountInWords)

    })
```
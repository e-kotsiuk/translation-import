const https = require('https')
const fs = require('fs')
const key = ''
const url = `https://localise.biz/api/export/locale/en-BE.json?format=multi&key=${key}`

https.get(url, (res) => {
  let body = ''
  res.on('data', (chunk) => {
    body += chunk
  })
  res.on('end', () => {
    try {
      let json = JSON.parse(body)
      if (!json || !body) {
        throw Error('Wrong response content')
      }
      fs.writeFile('./src/i18n/bundle.json', body, function (err) {
        if (err) {
          return console.log(err)
        } else {
          console.log("The file`s content has been updated!")
          console.log(body)
        }
      })
      // do something with JSON
    } catch (error) {
      console.error(error.message)
    }
  })
}).on('error', (error) => {
  console.error(error.message)
})

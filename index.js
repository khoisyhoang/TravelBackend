const express = require('express')
const path = require('path');
const port = 3000
const app = express()
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render("client/pages/home")
})

app.get('/tours', (req, res) => {
  res.render("client/pages/tour-list", {
    a: 10,
    b: 20
  })
})

app.get('/tours', (req, res) => {
  res.send('Tour lists!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

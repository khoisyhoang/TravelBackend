const express = require('express')
const path = require('path');
const database = require('./config/database.config')
const clientRoute = require('./routes/client/index.route')
require('dotenv').config();
const port = 3000
const app = express()
// Connecting to database
database.connect();


app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, "public")))

app.use("/", clientRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// khoisyhoang
// UorZnzYoVGSOsM4E
// mongodb+srv://khoisyhoang:UorZnzYoVGSOsM4E@cluster0.niopxiy.mongodb.net/tour-management
const express = require('express')
const path = require('path');
const database = require('./config/database.config')
const adminRoute = require('./routes/admin/index.route')
const clientRoute = require('./routes/client/index.route')
const variableConfig = require('./config/variable')
require('dotenv').config()
const port = 3000
const app = express()

// Connecting to database
database.connect();

// Views
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Create Global Var
app.locals.pathAdmin = variableConfig.pathAdmin;

// Allow JSON data
app.use(express.json());

// Routes
app.use("/", clientRoute)
app.use(`/${variableConfig.pathAdmin}`, adminRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

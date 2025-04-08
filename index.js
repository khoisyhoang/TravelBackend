const express = require('express')
const path = require('path');
const database = require('./config/database.config')
const adminRoute = require('./routes/admin/index.route')
const clientRoute = require('./routes/client/index.route')
const variableConfig = require('./config/variable')
var cookieParser = require('cookie-parser')


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

// Create Global Var in Pug Files
app.locals.pathAdmin = variableConfig.pathAdmin;

// Create Global Var in Backend (js files)
global.pathAdmin = variableConfig.pathAdmin;

// Allow JSON data
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Routes
app.use("/", clientRoute)
app.use(`/${variableConfig.pathAdmin}`, adminRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

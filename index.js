// index.js
//configure env
require('dotenv').config()

 // Import packages
const morgan = require('morgan')
const express = require('express')
const path = require("path");

// App
const app = express()
// Morgan
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

/**
 * App Variables
 */
const fs = require('fs')
const port = process.env.PORT || "8000";

/**
 * Routes Definitions
 */
// First route
app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
});
app.use(require('./routes/index.routes'))


  /**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
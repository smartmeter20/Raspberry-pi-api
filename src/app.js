const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("./config/db");
const user = require('./routes/user');

require('dotenv').config();
const app = express();

app.use(cors({
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', user);

app.get('/', (req, res) => {
    res.send('Welcome to Raspberry pi API .... ');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {

    console.log("your server is running on port " + port);
})
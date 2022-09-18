const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require("./controllers/register");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const db = knex({
    client: 'pg',
    connection: {
        host: 'ec2-34-253-119-24.eu-west-1.compute.amazonaws.com',
        port: 5432,
        user: 'wmmdmkbeyziwdc',
        password: '75c7f5954ee20eecaa51e16f8a90f49584c840f867e7e713d2b220ccd3897ec9',
        database: 'd2pdmphs53smt2',
        debug: true,
        ssl: { rejectUnauthorized: false }
    }
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('success') });
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
app.put("/image", (req, res) => { image.handleImage(req, res, db) });
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require("./controllers/register");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const PORT = process.env.PORT || 8080;

const getServerStatus = (port) => {
  if (port !== 8080) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    };
  } else {
    return {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'Diab1966@00',
      database: 'smart-brain'
    };
  }
}

const db = knex({
  client: 'pg',
  connection: getServerStatus(PORT)
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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
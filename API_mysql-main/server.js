const express = require("express");
const mysql = require("mysql2");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_Auther.json');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*"
  );
  next();
});


const validateApiKey = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).send('Missing or invalid authorization header');
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log("token = " + token );

    let decoded = jwt.verify(token, "shhhhh");
    
    console.log("decoded = " + decoded);
    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).send('Invalid token');
    return;
  }
};

// MYSQL Connection

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql_nodejs",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database");
    return;
  }
  console.log("Mysql succesful connecttion");
});

// Routes

app.post("/create", async (req, res) => {
  const data = req.body;

  try {
    const values = data.map(
      ({ equation, xl, xr, tolerance, maxIterations }) => [
        equation,
        xl,
        xr,
        tolerance,
        maxIterations,
      ]
    );

    connection.query(
      "INSERT INTO falseposition(equation, xl, xr , tolerance , maxIterations) VALUES ?",
      [values],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting");
          console.log(err);
          return res.status(400).send();
        }
        return res
          .status(201)
          .json({ message: "New rows successfully created" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


/**
 * @swagger
 * /bisection/random:
 *   get:
 *     summary: Returns random json
 *     description: Returns a random json
 *     responses:
 *       200:
 *         description: A random json
 */


app.post('/api/login', (req, res) => {
  const { password } = req.body;

  let token = jwt.sign( password, 'shhhhh');
  console.log(token);
  return res.status(200).json({token}).send();

});

app.get("/bisection/random",validateApiKey, async (req, res) => {
  const randomId = Math.floor(Math.random() * 10) + 1;
  console.log("random complate");
  try {
    connection.query(
      "SELECT * FROM bisection WHERE id = ?",
      [randomId],
      (err, results, fields) => {
        if (err) {
          console.log("Error while retrieving data");
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json(results[0]);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.get("/falseposition/random" , async (req, res) => {
  const randomId = Math.floor(Math.random() * 15) + 1;

  try {
    connection.query(
      "SELECT * FROM falseposition WHERE id = ?",
      [randomId],
      (err, results, fields) => {
        if (err) {
          console.log("Error while retrieving data");
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json(results[0]);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});
app.listen(3000, () => console.log("server is running at port 3000"));

module.exports = app;
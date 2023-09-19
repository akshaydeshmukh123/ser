const express = require("express");
const { connection } = require("./config/db");
const UserRouter = require("./router/User.Router");
const auth= require("./middleware/auth");
const jokesRouter = require("./router/Jokes.Route");


const app = express();

// home router
app.get("/", async (req, res) => {
  try {
    res.send(`<h1> autentication authriztion random jokes app </h1>`);
  } catch (error) {
    console.log(error.message);
  }
});

app.use("/users", UserRouter);

app.use("/", jokesRouter);

app.use("/", auth);





app.use(express.json());

// connection to server

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`app listening on port ${process.env.port}`);
  } catch (error) {
    console.log({
      error: `error in connections with the  port: ${error.message}`,
    });
  }
});

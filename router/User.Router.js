const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const UserModel = require("../models/User.Models");


const UserRouter = express.Router();

UserRouter.use(express.json());

//  ! USER REGISTER

UserRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    const user = await UserModel.find({ email });
    console.log(user);

    if (user.length > 0) {
      res.send(`User already registered`);
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const users = new UserModel({
          name,
          email: email,
          password: hash,
          
        });
        console.log(users);
        await users.save();

        res.status(201).send({ message: `User registered successfully` });
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: `Registration failed` });
  }
});

// ! User Login

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);

    const hashed_pass = user?.password;
    console.log(hashed_pass);

    if (user) {
      bcrypt.compare(password, hashed_pass, async (err, result) => {
        if (result) {
          const token = jwt.sign({ user_id: user._id }, "food-key", {
            expiresIn: "7d",
          });
          console.log(token);
          res.status(201).send({ token, message: `User Login successfully` });
        } else {
          console.log(err.message);
        }
      });
    } else {
      console.log(error.message);
      res.status(404).send({ message: "Invalid password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: `login failed` });
  }
});


//view user profile

UserRouter.get("/me", async (req, res) => {
  const { id } = req.params;
    console.log(id);
    try {
       const user = await UserModel.findById(id);
        console.log(user);
        res.status(200).json(user);
    
    } catch (error) {
        console.log(error.message);

        res.status(400).json({ message: error.message });
        
    
  }
})


module.exports = UserRouter;

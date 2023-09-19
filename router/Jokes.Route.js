const { default: axios } = require("axios");
const express = require("express");
const jokesRouter = express.Router();

jokesRouter.use(express.json());

jokesRouter.get("/random-joke", async (req, res) => {

    try {
        
        const { data } = await axios.get(
          "https://api.chucknorris.io/jokes/random"
        );
        res.status(200).send(data.value);
        
        
        

    } catch (error) {
        res.status(404).send(error.message);
        
    }
    
})



module.exports = jokesRouter
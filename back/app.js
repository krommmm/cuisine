require("dotenv").config();

const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const recetteRoutes = require("./routes/recette");
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const listRoutes = require("./routes/list");


mongoose.set('strictQuery', true);

mongoose.connect(`mongodb+srv://${process.env.IDENTIFIANTS}@clustercuisine.whyvjvz.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connection à mongoDB réussie !"))
.catch(()=>console.log("Connexion à mongoDB échouée !"))

app.use(express.json());


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,PATCH,OPTIONS");
    next();
});
 
app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/recettes", recetteRoutes);
app.use("/images", express.static(path.join(__dirname,"images")));
app.use("/api/liste",listRoutes);

module.exports = app;


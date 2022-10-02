
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: "http://localhost:4200"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import db from "./models/index.js";

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// import {create } from "./controllers/tutorial.controller.js"
app.get("/create", (req, res) => {
    // await create(req, res)

    res.json({ message: "Welcome to my apps " })
})

app.get("/findAll", (req, res) => {
    res.json({ message: "Welcome to my apps " })
})
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my apps " })
})



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`)
})



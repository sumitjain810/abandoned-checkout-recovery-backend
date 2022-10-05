import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "http://localhost:4200",
};
import db from "./models/index.js";
import cartController from "./controllers/cart.controller.js";

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/cart", cartController);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}.`);
});

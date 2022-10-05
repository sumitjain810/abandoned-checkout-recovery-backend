import { url } from "../config/db.config.js";
import Cart from "./cart.module.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.cart = Cart(mongoose);

export default db;

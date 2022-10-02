import { url } from "../config/db.config.js";
import Tutorial from "./tutorial.module.js"
import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.tutorials = (Tutorial)(mongoose);

export default db;
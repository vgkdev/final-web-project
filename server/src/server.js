import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initAPIRoutes from "./routes/api";
import { connectDB } from "./config/connectDB";
import cors from "cors";

require("dotenv").config();
const path = require("path");
const fileUpload = require("express-fileupload");

let app = express();

app.use(cors({ origin: true }));

//config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
// app.use(fileUpload());

viewEngine(app);
initWebRoutes(app);
initAPIRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is runing on the port : " + port);
});

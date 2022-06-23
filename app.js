const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const router = require("./routes/router");
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended:true }));
app.use(morgan("dev"));
app.use(router);



app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en el puerto: "+process.env.PORT);
});
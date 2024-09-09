const express = require("express");
const session = require("express-session")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.APP_PORT;
app.use((session({
  secret: "QuasartSession",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
})))

app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
var rotas = require("./app/routes/router");
app.use("/", rotas);

var rotasAdm = require("./app/routes/routerAdm");
app.use("/", rotasAdm);

var rotasEditProfile = require("./app/routes/routerEditProfile");
app.use("/", rotasEditProfile);

app.use((req, res, next) => {
  res.status(404).render("pages/error-404.ejs");
});
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});
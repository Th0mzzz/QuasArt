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
var rotas = require("./app/routes/routerHome");
app.use("/", rotas);

var rotasAdm = require("./app/routes/routerAdm");
app.use("/", rotasAdm);

var rotasEditProfile = require("./app/routes/routerEditProfile");
app.use("/", rotasEditProfile);

var rotasConta = require("./app/routes/routerConta");
app.use("/", rotasConta);

app.use((req, res, next) => {
  let token = req.session.token ? req.session.token : null;
  if (token && token.contagem < 1) {
    req.session.token.contagem++;
  } else {
    req.session.token = null;
  }
  res.status(404).render("pages/template-home", {
    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
    page: "../partial/error-404",
    classePagina: "",
    token: token,
  });
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});
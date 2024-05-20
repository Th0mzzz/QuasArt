const usuariosModel = require("../models/usuariosModel")
var bcrypt = require("bcryptjs")
var salt = bcrypt.genSaltSync(8)

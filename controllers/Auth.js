const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");


module.exports = {

    // Login
    signIn(req, res) {

        let { email, pass } = req.body;

        // Buscar usuario
        User.findOne({
            where: {
                email : email
            }
        }).then(user => {
            if(!user) {
                res.status(404).send({ msg: "Usuario no encontrado" });
            } else {
                if(bcrypt.compareSync(pass, user.pass)) {
                    
                    // Si la contraseña coincide devolvemos token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    const cookiesOption = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie("jwt", token, cookiesOption);
                    res.render("index");

                } else {
                    res.status(401).send({ msg: "Contraseña incorrecta" });
                }
            }
        }).catch(err => {
            res.status(500).send({ msg: "Se ha producido el siguiente error: "+err});
        });
    },

    // Registro
    signUp(req, res) {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.pass, Number.parseInt(authConfig.rounds)); // lo convertimos a un numero
     
        //Crear un usuario
        User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            pass: password
        }).then(user => {
            
            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.render("login");
        }).catch(err => {
            res.status(500).send("Se ha producido el siguiente error: "+err);
        });
    }
        
};



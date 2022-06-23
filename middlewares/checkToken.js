const jwt = require("jsonwebtoken");


const authorization = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(403).render("forbidden");
    }
    try {
      const data = jwt.verify(token, process.env.AUTH_SECRET);
      req.userId = data.id;
      req.userEmail = data.email;
      return next();
    } catch (error) {
      return res.status(500).send("Ha sucedido el siguiente error: "+error)
    }
  };

module.exports = authorization  



const { Newsletter } = require("../models/index");

const newNewsletter = async (req, res) => {
    try {
      const contact = await Newsletter.create({ 
          mail: req.body.mail
      });
      res.render("newsletter")
      
    } catch (error) {
        res.status(500).json("Ha sucedido el siguiente error: "+error);
    }
}

module.exports = newNewsletter;
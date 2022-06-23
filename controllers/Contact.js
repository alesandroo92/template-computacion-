const { Contact } = require("../models/index");

const newContact = async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      const contact = await Contact.create({ 
          name: name,
          email: email,
          phone: phone,
          message: message 
      });
      res.render("index")
      
    } catch (error) {
        res.status(500).json("Ha sucedido el siguiente error: "+error);
    }
}

module.exports = newContact;
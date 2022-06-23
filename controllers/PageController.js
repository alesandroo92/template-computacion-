const index = (req, res) => {
    res.render("index");
};

const about = (req, res) => {
    res.render("about");
};

const computer = (req, res) => {
    res.render("computer");
};

const laptop = (req, res) => {
    res.render("laptop");
};

const product = (req, res) => {
    res.render("product");
};

const contact = (req, res) => {
    res.render("contact");
};

const login = (req, res) => {
    res.render("login");
};

const register = (req, res) => {
    res.render("register");
};

const forum = (req, res) => {
    res.render("forum");
};

const logout = (req, res) => {
    res.clearCookie("jwt");
    return res.redirect("/");
};    

const thanksNewsletter = (req, res) => {
    res.render("newsletter");
};



module.exports = { index, about, computer, laptop, product, contact, login, register, forum, logout, thanksNewsletter };
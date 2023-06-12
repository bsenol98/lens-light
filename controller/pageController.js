
const getIndexPage = (req, res) => res.render("index", { "link": "index" })

const getAboutPage = (req, res) => res.render("about", { "link": "about" })

const getPhotosPage = (req, res) => res.render("about", { "link": "photos" })

const getRegisterPage = (req, res) => res.render("register", { "link": "register" })

const getLoginPage = (req, res) => res.render("login", { "link": "login" })

const getPanelPage = (req, res) => res.render("panel", { "link": "panel" })

const getLogoutPage = (req, res) => {
    res.cookie('token', "", { "maxAge": 0 });
    res.redirect("/login");
}

export {
    getIndexPage,
    getAboutPage,
    getPhotosPage,
    getRegisterPage,
    getLoginPage,
    getPanelPage,
    getLogoutPage
}
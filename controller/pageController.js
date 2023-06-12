
const getIndexPage = (req, res) => res.render("index")

const getAboutPage = (req, res) => res.render("about")

const getRegisterPage = (req, res) => res.render("register")

const getLoginPage = (req, res) => res.render("login")


const getPanelPage = (req, res) => {
    res.render("panel", {
        "session": true,
        "data": req.userAuth
    })
}
const getLogoutPage = (req, res) => {
    res.cookie('token', "", { "maxAge": 0 });
    res.redirect("/login");
}

export {
    getIndexPage,
    getAboutPage,
    getRegisterPage,
    getLoginPage,
    getPanelPage,
    getLogoutPage
}
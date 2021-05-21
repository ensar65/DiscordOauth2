var express = require('express')
var router = express.Router();
const passport = require("passport")
const {
    Strategy
} = require("passport-discord")
const session = require("express-session")

let settings = {
    "session": require("../settings/session.json"),
    "strategy": require("../settings/Strategy.json")
}
passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((obj, done) => {
    done(null, obj)
});


let strategy = new Strategy(settings.strategy, (accesToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
});
passport.use(strategy)


router.use(session(settings.session));

router.use(passport.initialize());

router.use(passport.session())


router.get("/login", passport.authenticate("discord", {
    scope: ["guilds", "identify"]
}))

router.get("/callback", passport.authenticate("discord", {
    failureRedirect: "/error"
}), (req, res) => {
    res.redirect("/")
})

module.exports = router

const { Router } = require('express')
const router = Router()
const passport = require("passport");
const controllerUsers = require("../controllers/usersController");

router.get('/getUsers', passport.authenticate('jwt', { session: false}), controllerUsers.getUsers);

module.exports = router
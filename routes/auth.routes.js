const { Router } = require('express')
const router = Router()
const controllerAuth = require('../controllers/authController')
const passport = require('passport')
const validator = require('../middleware/validator')

router.post('/register', validator,  controllerAuth.register);
router.post('/login', validator, controllerAuth.login);
router.get('/auth', passport.authenticate('jwt', { session: false}), controllerAuth.auth);
router.get('/logout', passport.authenticate('jwt', { session: false}), controllerAuth.logout);

module.exports = router
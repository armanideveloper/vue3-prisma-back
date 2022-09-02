const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config/passport')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.key
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done ) => {
            try {
                const user = await prisma.user.findUnique({where: { email: payload.login_name }})
                done(null, user || false)
            } catch (e) {
                return res.status(400).json({
                    message: e.message
                })
            } finally {
                await prisma.$disconnect()
            }
        })
    )
}
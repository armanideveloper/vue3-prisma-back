const jwt = require('jsonwebtoken');
const keys = require('../config/passport')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

const login = async ({email, password}) => {
    const user = await prisma.user.findUnique({where: { email }})
    if (!user) {
        throw {message: `User ${email} not found`, error: true};
    }
    const validPassword = ( await bcrypt.compareSync(password, user.password))
    if (!validPassword) {
        throw {message: `Wrong password entered`, error: true};
    }
    const token = jwt.sign({
        login_name: user.email,
        password: user.password,
        user_id: user.user_id
    }, keys.key , {expiresIn: "4h"})

    return {token,
    user: {
        email: user.email,
        gender: user.gender,
        name: user.name,
        sureName: user.sureName,
        id: user.id
    }};
}

module.exports = {
    login
} 
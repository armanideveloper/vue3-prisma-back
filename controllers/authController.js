const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const user_service = require('../services/user.service');
const bcrypt = require('bcrypt')

class authController {

    async auth(req, res) {
        try {
            const data = await prisma.user.findUnique(
                {
                    where: {
                        id: req.user.id
                    },
                    select: {
                        id: true,
                        name: true,
                        sureName: true,
                        email: true,
                        password: false,
                        gender: true
                    }
                })
            return res.status(200).json(data)
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        } finally {
            await prisma.$disconnect()
        }
    }

    async register(req, res) {
        try {
            const userData = req.body
            const userCheck = await prisma.user.findUnique({
                where: {
                   email: userData.email 
                }
            })
            if(userCheck){
                return res.status(400).json({
                    message: 'You are already registered'
                });
            }
            userData.password = await bcrypt.hash(req.body.password, 10)
            await prisma.user.create({
                data: {
                  ...userData  
                }
            })
            return res.status(200).json({
                message: "Success"
            });
        } catch (e) {
            return res.status(400).json({
                message: e.message
            });
        } finally {
            await prisma.$disconnect()
        }
    }

    async login(req, res) {
        try {
            const data = await user_service.login(req.body)
            return res.status(200).json(data)
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

    logout(req, res, next) {
        try {
            // req.logout(function(err) {
            //     if (err) { return next(err); }
            //     res.redirect('/');
            // });
            return res.status(200).json({message: "Success"})
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

}

module.exports = new authController()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class usersController {

    async getUsers(req, res) {
        try {
            const data = await prisma.user.findMany({
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

}

module.exports = new usersController()

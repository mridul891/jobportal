
const { PrismaClient } = require("@prisma/client")


const signin = async (req, res) => {
    const prisma = await PrismaClient()
    const body = req.body;
    await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
            name: body.name,
            department: body.department
        }
    })

}

module.exports = { signin }
const express = require('express')
const router = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
// Sign In Controller
router.post('/signin', async (req, res) => {

    const body = await req.body
    
    const response = await prisma.user.create({
        data: {
            email: "pandeym89s1@gmail.com",
            password: "12345678",
            name: "mridul",
            Department: "admin"
        }
    })

    res.json({ message: "Done" })
}
)

module.exports = router
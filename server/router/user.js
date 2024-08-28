const express = require('express')
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const zod = require('zod')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()
// Sign In Controller

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    name: zod.string(),
    Department: zod.string()
})
router.post('/signin', async (req, res) => {

    const { success } = await signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(401).json({ message: "Incorrect input" })
    }

    const saltRound = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound)

    const response = await prisma.user.create({
        data: {
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            Department: req.body.Department
        }
    })

    res.json(response   )
})

module.exports = router
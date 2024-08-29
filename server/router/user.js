const express = require('express')
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const zod = require('zod')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const JWTSECRET = "HelloMridul"
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

    // Exisiting user 
    const ExisitingUser = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })

    if (ExisitingUser) {
        return res.status(401).json({ message: "User Already Existed" })
    }

    const response = await prisma.user.create({
        data: {
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            Department: req.body.Department
        }
    })

    const token = jwt.sign({ id: response.id }, JWTSECRET)
    console.log(token)
    res.status(201).json({ token: token })

})

module.exports = router
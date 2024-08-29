const express = require('express')
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const zod = require('zod')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const JWTSECRET = "HelloMridul"
// Sign In Controller

const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    name: zod.string(),
    Department: zod.string()
})
router.post('/signup', async (req, res) => {

    const { success } = signupSchema.safeParse(req.body)
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


// sign in schema 
const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})

router.post('/signin', async (req, res) => {

    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(401).json({ message: "Incorrect input" })
    }

    const user = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }, select: {
            id: true,
            password: true
        }
    })
    console.log(user)

    if (user) {
        await bcrypt.compare(user.password, req.body.password)
        const token = await jwt.sign({ id: user.id }, JWTSECRET)
        return res.status(201).json({ token: token })
    }

    res.status(401).json({ message: "User Dose not existed" })
})
module.exports = router
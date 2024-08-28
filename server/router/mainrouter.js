const express = require('express')
const router = express.Router()
const adminRouter = require('./admin')
const userRouter = require('./user')

router.use('/info', userRouter)
router.use('/admin', adminRouter)

module.exports = router
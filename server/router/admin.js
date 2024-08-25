const express = require('express')
const router = express.Router()

router.get('/info', (req ,res) =>{
    res.json({message : "THis is the info of adminF"})
})

module.exports = router
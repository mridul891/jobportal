const express = require('express')
const app = express()
const PORT = 3000
const mainRouter = require('./router/mainrouter')
const cors = require('cors')
app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: "hello" })
})

app.use(cors())
app.use('/v1', mainRouter)

app.listen(PORT, () => {
    console.log(`localhost started at ${PORT}`)
})
const express = require('express')
const router = require('./routes/index')
const cors = require('cors')
const app = express();
const PORT = 3000;
const passport = require('passport')

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors())

app.use('/api', [...Object.values(router)])

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})


module.exports = app

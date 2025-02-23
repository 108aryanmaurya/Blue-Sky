const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5001
app.use(cors())
app.use(express.json())

//available routes
app.use(
    express.urlencoded({ extended: true })
);
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/blogs', require('./routes/blog'))



app.listen(port, () => {
    console.log(`app listening at port http://localhost/${port}`)
})
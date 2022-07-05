require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const uri = "mongodb+srv://almanza1112:compaqmv540@cluster0.rttnp.mongodb.net/yugioh_stocks?retryWrites=true&w=majority";

mongoose.connect(uri)
//mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouteer = require('./routes/users')
app.use('/users', usersRouteer)

const cardRouter = require('./routes/cards')
app.use('/cards', cardRouter)

app.listen(3000, () => console.log('Server Started'))
require('dotenv').config()
const { text } = require('express')
const express = require('express')
const log = console.log
const app = express()
const bodyparser=require('body-parser')

const path = require('path')
const sendEmail = require('./mail')
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(express.json())

app.post('/email', (req, res) => {
    const {name, subject,send,text } = req.body
    log('Data', req.body)
    // name, send, subject, text, cb
    sendEmail(name, subject,send, text,function (err, data) {
        if (err) {

            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.json({ message: "Email Sent" })
        }
        console.log(send)
    })
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

const Port = 4000;
module.exports = app.listen(Port, () =>log("Server started", Port));

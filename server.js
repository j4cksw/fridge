const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var items = require("./db")

var temp = 15
var maxTemp = 25
var minTemp = 12

app.get('/items', (req, res) => {
    res.json(items)
})

app.get('/items/:id', (req, res) => {
    res.json(items.find(item => item.id === req.params.id))
})

app.post('/items', (req, res) => {
    items.push(req.body)
    res.status(201).json(req.body)
})

app.put('/items/:id', (req, res) => {
    const updateIndex = items.findIndex(book => book.id === req.params.id)
    res.json(Object.assign(items[updateIndex], req.body))
})

app.delete('/items/:id', (req, res) => {
    const deletedIndex = items.findIndex(book => book.id === req.params.id)
    items.splice(deletedIndex, 1)
    res.status(204).send()
 })

app.listen(3001, () => {
    console.log('Start server at port 3001')
})

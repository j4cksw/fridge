const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

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

app.post('/item', (req, res) => {

    let maxId = _.maxBy(items, 'id').id
    let newItem = req.body
    newItem.id = maxId + 1
    
    items.push(newItem)

    res.status(201).json(newItem)
})

app.put('/item/id/:id', (req, res) => {
    const updateIndex = items.findIndex(book => book.id === parseInt(req.params.id))
    res.json(Object.assign(items[updateIndex], req.body))
})

app.delete('/item/id/:id', (req, res) => {
    const deletedIndex = items.findIndex(book => book.id === parseInt(req.params.id))
    items.splice(deletedIndex, 1)
    res.status(204).send()
 })

app.listen(3001, () => {
    console.log('Start server at port 3001')
})

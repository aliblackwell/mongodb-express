const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')


var db

MongoClient.connect('mongodb+srv://ali:H501lHqEc8ewiqeU@ali-test-35iya.azure.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('ali-test') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray(function(err, results) {

    res.render('index.ejs', {quotes: results})
    // send HTML file populated with quotes here
  })
  
})

app.post('/quotes', (req, res) => {

  db.collection('quotes').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })

})
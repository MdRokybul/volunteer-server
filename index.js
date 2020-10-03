const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteerUser:volunteerUser40@cluster0.94gfj.mongodb.net/eventdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const pass = 'volunteerUser40'

client.connect(err => {
    const event = client.db("eventdb").collection("eventCollection");
    const volunteer = client.db("volunteerdb").collection("volunteerCollection");

    app.post('/addEvent', (req, res) => {
        const events = req.body;
        event.insertOne(events)
        .then(result => {
            console.log(result);
        })
    })

    app.get('/volunteerlist', (req, res) => {
        volunteer.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })
  
    app.post('/addVolunteer', (req, res) => {
        const user = req.body;
        volunteer.insertOne(user)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

});


app.listen(5000)
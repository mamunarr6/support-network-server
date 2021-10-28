const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qzuhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const databas = client.db('supportNetwork');
        const eventsCollection = databas.collection('events');

        //GET API

        //get all events
        app.get('/events', async (req, res) => {
            const cursor = eventsCollection.find({});
            const supports = await cursor.toArray();
            res.send(supports);
        })
        //get searchEvents
        app.get('/searchEvents', async (req, res) => {
            const result = await eventsCollection.find({ title: { $regex: req.query.search }, }).toArray();
            res.send(result)
            // console.log(result)
        })

        //POST API

        //post addevent
        app.post('/addEvent', async (req, res) => {
            console.log(req.body)
            const result = await eventsCollection.insertOne(req.body);
            console.log(result)
            res.send(result)
        })

        //DELETE API

        //delte event
        //delete volunteer


    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('This is from support network server')
})

app.listen(port, () => {
    console.log('server is running at port', port)
})
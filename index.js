const express = require('express');
const cors = require('cors');
//
const ObjectId = require('mongodb').ObjectId;

const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// ____ middleware__
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wsk2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        console.log('database connected successfully');
        const database = client.db('Watch_Box');
        const productsCollection = database.collection('watch');

        app.get('/watch', async (req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })
        //  post api products
        app.post('/watch', async (req, res) => {
            const food = req.body;
            console.log('hit api ', product);


            const result = await productsCollection.insertOne(watch);
            console.log(result);
            res.json(result)
        })

        app.get('/watch/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            res.json(product);

        })

    }





    finally {

        //        await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running watch box');
})

app.listen(port, () => {
    console.log("running watch on port", port)
})
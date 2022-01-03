const {Kafka} = require('kafkajs');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const kafka = new Kafka({
    clientId : 'pubsub-app',
    brokers : ['localhost:9092']
})

const producer = kafka.producer();
const topicName = 'orderCreated';

async function sendMessage (msg) {
    await producer.connect();
    await producer.send({
        topic : topicName,
        messages : [
            {value : msg}
        ]
    })

    await producer.disconnect();
}

app.post('/orders', async (req, res) => {
    const message = req.body;

    await sendMessage(JSON.stringify(message));

    res.send(`message send to topic ${topicName}, ${message}`);
})

app.get('/orders', (req, res) => {
    res.send("you called get /orders");
})

app.listen( port, () => {
    console.log("app listen to 3000");
})

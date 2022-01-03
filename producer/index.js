const {Kafka} = require('kafkajs');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const kafka = new Kafka({
    clientId : 'kafka-basic',
    brokers : ['localhost:9092']
})

const producer = kafka.producer();

async function sendMessage (msg) {
    await producer.connect();
    await producer.send({
        topic : 'quickstart',
        messages : [
            {value : msg}
        ]
    })

    await producer.disconnect();
}

app.post('/messages', async (req, res) => {
    const message = req.body.message;
    await sendMessage(message);

    res.send('message send to topic quickstart: ' + message);
})

app.get('/messages', (req, res) => {
    res.send("you called get /messages");
})

app.listen( port, () => {
    console.log("app listen to 3000");
})

const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId : 'app1',
    brokers : ['localhost:9092']
})

const groupId = "group1";  // new Date().getTime().toString();

const consumer = kafka.consumer({groupId : groupId});

async function consumeMessage() {
    await consumer.connect();
    await consumer.subscribe({
        topic : 'quickstart',
        fromBeginning : true
    });

    await consumer.run({
        eachMessage : async ({topic, partition, message}) => {
            console.log({
                value : message.value.toString(),
            })
        }
    })
};

consumeMessage();


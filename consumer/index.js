const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId : 'app1',
    brokers : ['localhost:9092']
})

const consumer = kafka.consumer({groupId : new Date().getTime().toString()});

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


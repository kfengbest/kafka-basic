const { Kafka } = require('kafkajs');
const logMessage = require('../logMessage');

const kafka = new Kafka({
    clientId: 'pubsub-app',
    brokers: ['localhost:9092']
});

const topicName = 'orderCreated';
const consumerNumber = process.argv[2] || '1';

const processConsumer = async () => {
    const consumer = kafka.consumer({groupId : 'payments'});
    await consumer.connect();
    await consumer.subscribe({
        topic : topicName
    });

    let msgCounter = 1;
    await consumer.run({
        eachMessage : async ({topic, partition, message}) => {
            logMessage(msgCounter, `payments-consumer#${consumerNumber}`, topic, partition, message);
            msgCounter++;
        }
    })
}

processConsumer();
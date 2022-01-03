const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId : "pubsub-app",
    brokers: ['localhost:9092']
})

const topicName = 'orderCreated';

const process = async () => {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics : [{
            topic : topicName,
            numPartitions: 2,
            replicationFactor: 1
        }]
    });

    await admin.disconnect();
}

process().then(() => console.log(`topic reated: ${topicName} `));
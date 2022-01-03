# kafka-basic

## Install kafka locally with docker
    git clone https://github.com/kfengbest/kafka-basic.git
    
    cd kafka-basic/docker

    docker-compose up -d


## Test Kafka with docker

    // create a topic
    docker exec broker \
    kafka-topics --bootstrap-server broker:9092 \
                --create \
                --topic quickstart

    // write a message
    docker exec --interactive --tty broker \
    kafka-console-producer --bootstrap-server broker:9092 \
                        --topic quickstart

    // read messages
    docker exec --interactive --tty broker \
    kafka-console-consumer --bootstrap-server broker:9092 \
                        --topic quickstart \
                        --from-beginning


## Run Producer

    cd kafka-basic/producer
    node index.js

    curl --location --request POST 'http://localhost:3000/messages' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "message" : "hello app 1"
    }'

## Run Consumer

    cd kafka-basic/consumer
    node index.js

## Test with K6

    cd kafka-basic/k6
    docker run -i loadimpact/k6 run --vus 10 --duration 30s - <script.js
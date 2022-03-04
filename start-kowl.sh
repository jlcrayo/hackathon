#!/bin/bash
docker run --network=host -p 8080:8080 -e KAFKA_BROKERS=localhost:9092 -d quay.io/cloudhut/kowl:master
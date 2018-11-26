#!/bin/bash

aws --endpoint-url=http://localhost:4572 --region=eu-west-1 s3 $@

# Run it like: ./local-s3.sh ls bucketName


#!/bin/sh

aws s3 rm s3://health-care-app/ --recursive
aws s3 cp dist s3://health-care-app/ --recursive

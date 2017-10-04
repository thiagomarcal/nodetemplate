#!/bin/sh

DB_FILE=~/data
DB_NAME=/data/thiago

# Levantando mongo container e definindo arquivo DB a ser usado
sudo docker run -d -p 27017:27017 -v ${DB_FILE}:${DB_NAME} mongo

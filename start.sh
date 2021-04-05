#!/usr/bin/env bash
if [ ! -z "$PARKING_LOT_SIZE" ]
then
    echo $PARKING_LOT_SIZE
    exec node lib/src/index.js
else
    echo "Did not start due to missing PARKING_LOT_SIZE"
fi
#!/usr/bin/env bash

if [ ! -z "$PARKING_LOT_SIZE" ]
then
    echo $PARKING_LOT_SIZE
    # make a temp dirrectory and resolve ts to js in it and then run via this converted js file
    exec npm run clean-start
else
    echo "Did not start due to missing PARKING_LOT_SIZE"
fi
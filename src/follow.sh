#! /bin/bash

source ./.env

export OPENAI_API_KEY=$OPENAI_API_KEY

openai api fine_tunes.follow -i ft-5wxVRqPpJC8KqRivdcUyCahU

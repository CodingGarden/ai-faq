#! /bin/bash

source ./.env

export OPENAI_API_KEY=$OPENAI_API_KEY

openai api fine_tunes.create -t "./data/faq_prepared.jsonl" -m davinci

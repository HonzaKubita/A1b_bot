#! /bin/bash

PURPLE='\033[0;35m'
GREEN='\033[0;32m'
BGreen='\033[1;32m'
ORANGE='\033[0;33m'
CYAN='\033[0;36m'

printf "${CYAN}[DOCKER]${PURPLE} Stopping A1b_bot...\n"
sudo docker compose down
printf "${GREEN}done\n"

printf "${ORANGE}[GIT]${PURPLE} Pulling from: github.com/HonzaKubita/A1b_bot...\n"
git pull
printf "${GREEN}done\n"

printf "${CYAN}[DOCKER]${PURPLE} Rebuilding images...\n"
sudo docker compose build
printf "${GREEN}done\n"

printf "${CYAN}[DOCKER]${PURPLE} Starting A1b_bot...\n"
sudo docker compose up -d
printf "${GREEN}done\n"

printf "${BGREEN}ALL DONE\n"

#!/bin/bash

NAME=dhcp-leases
IMAGE=${NAME}:1.0
PORT=8081

function get_hostname {
    if [ -x /bin/hostname ]
    then
        hostname -s
    elif [ -f /etc/hostname ]
    then
        cat /etc/hostname
    elif [ -x /sbin/uci ]
    then
        uci get system.@system[0].hostname
    fi | tr A-Z a-z
}

function log {
    level=$1
    msg=$2
    echo $(date '+%Y:%m:%d %H:%M:%S') $1: $2 >> /var/log/${SELF}.log 2>&1
}

function do_build {
    cd image
    docker build -t ${IMAGE} .
    cd ..
}

function do_install {
    cp dhcp_leases.py /usr/local/sbin
    chmod +x /usr/local/sbin/dhcp_leases.py
}

function do_run {
    docker run \
        -d \
        --name ${NAME} \
        --restart=unless-stopped \
        -e HOSTNAME=${HOST} \
        -p 8081:8081 \
        -v /media/data:/data \
        -v ${PWD}/image:/home \
        -w /home \
        ${IMAGE} node app.js
}

function do_shell {
    docker run \
        -it \
        --rm \
        --name ${NAME} \
        -e HOSTNAME=${HOST} \
        -p 8081:8081 \
        -v /media/data:/data \
        -v ${PWD}/image:/home \
        -w /home \
        ${IMAGE} /bin/bash
}

function do_restart {
    do_stop
    sleep 5
    do_run
}

function do_stop {
    docker rm -f ${NAME}
}

function do_backup {
    filename=$(date +'%Y-%m-%d_%H%M')_${NAME}.tar.xz
    tar -c -f ${filename} .
    sudo mv ${filename} ${BACKUP_DIR}
}

HOST=$(get_hostname)
BACKUP_DIR=/backup/${HOST}

task=$1
shift
do_$task $*

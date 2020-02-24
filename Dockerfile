#use armv7hf compatible base image
FROM balenalib/armv7hf-debian:buster-20191223

#dynamic build arguments coming from the /hook/build file
ARG BUILD_DATE
ARG VCS_REF

#metadata labels
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.vcs-url="https://github.com/HilscherAutomation/netPI-nodered-fram" \
      org.label-schema.vcs-ref=$VCS_REF

#enable cross compiling (comment out next line if built on Raspberry Pi) 
RUN [ "cross-build-start" ]

#version
ENV HILSCHERNETPI_NODERED_FRAM_VERSION 1.1.0

#labeling
LABEL maintainer="netpi@hilscher.com" \
      version=$HILSCHERNETPI_NODERED_FRAM_VERSION \
      description="Node-RED including FRAM nodes"

#copy files
COPY "./init.d/*" /etc/init.d/ 
COPY "./node-red-contrib-fram/*" /tmp/

#do installation
RUN apt-get update  \
    && apt-get install curl build-essential python-dev \
#install node.js
    && curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -  \
    && apt-get install -y nodejs  \
#install Node-RED
    && npm install -g --unsafe-perm node-red@1.0.3 \
#install nodes
    && mkdir /usr/lib/node_modules/node-red-contrib-fram \
    && mv /tmp/fram.js /tmp/fram.html /tmp/package.json -t /usr/lib/node_modules/node-red-contrib-fram \
    && cd /usr/lib/node_modules/node-red-contrib-fram \
    && npm install \
#clean up
    && rm -rf /tmp/* \
    && apt-get remove curl \
    && apt-get -yqq autoremove \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/* 

#set the entrypoint
ENTRYPOINT ["/etc/init.d/entrypoint.sh"]

#Node-RED Port
EXPOSE 1880

#set STOPSGINAL
STOPSIGNAL SIGTERM

#stop processing ARM emulation (comment out next line if built on Raspberry)
RUN [ "cross-build-end" ]

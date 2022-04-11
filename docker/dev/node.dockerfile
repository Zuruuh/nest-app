ARG VERSION
FROM node:${VERSION}-alpine3.14

## Install node-gyp dependencies
RUN apk update && \
    apk add --update --no-cache \
    make \
    python3 \
    py3-pip \
    g++ \
    curl \
    sudo \
    git \
    gcc && \
    ln -sf python3 /usr/bin/python

RUN npm i -g npm@latest
RUN npm i -g node-gyp @nestjs/cli typeorm
RUN npm config set python /usr/bin/python


WORKDIR /srv

CMD ["sleep", "9999d"]
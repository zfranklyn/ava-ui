FROM node:8.6.0

WORKDIR /app

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ENV PATH="/root/.yarn/bin:${PATH}"

RUN echo "Dockerfile is Executing"

COPY . /app

RUN yarn build

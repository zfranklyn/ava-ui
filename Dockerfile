FROM node:8.6.0

WORKDIR /app

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ENV PATH="/root/.yarn/bin:${PATH}"

RUN echo "Dockerfile is Executing"

COPY . /app

RUN npm install -g create-react-app
RUN npm install -g react-scripts-ts
RUN yarn

RUN yarn build

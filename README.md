# parity

This is a test project I made to experiment with Google Cloud's [Cloud Run](https://cloud.google.com/run) serverless platform. It is a simple API built with Node + Express that can test whether a request parameter is even or odd.

## Examples:

`https://localhost:8080/isEven/4`  
responds → `{"isEven":true}`

`https://localhost:8080/isOdd/4`  
responds → `{"isOdd":false}`

`https://localhost:8080/isOdd/foo`  
responds → `{"error":"Provided query is not a number."}`

`https://localhost:8080/isEven/4.5`  
responds → `{"error":"Provided number is not an integer."}`

## Dockerfile

Cloud Run uses the Dockerfile to generate containers to scale with demand. The builder stage downloades all dependancies and compiles the Typescript files in `./src` to a `./dist` directory. In the second stage, only the compiled code artifact is copied from the builder stage, and only production modules are installed. Using stages in the Dockerfile reduced the image size from 243.6 MB to 171.3 MB. Still not exceptional, but pretty good for a Node image (alpine certainly helps!).

```Dockerfile
# Stage 1: build microservice
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm install -g typescript
RUN npm run build

# Stage 2: run microservice
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist ./dist

EXPOSE 8080

CMD [ "node", "./dist/index.js" ]
```

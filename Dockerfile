# [START cloudrun_parity_dockerfile]
# [START run_parity_dockerfile]

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

# [END run_parity_dockerfile]
# [END cloudrun_parity_dockerfile]
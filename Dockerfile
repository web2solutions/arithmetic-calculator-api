FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY serverless.yml ./
COPY tsconfig.json ./
COPY src ./src
COPY config ./config
COPY tests ./tests


# ENV DATABASE_URL="mongodb://localhost:27017/arithmetic-calculator-api"
# ENV DB_URL="mongodb://localhost:27017/arithmetic-calculator-api"

RUN npm install --ignore-scripts

# COPY . .

EXPOSE 3000

CMD ["npm","start"]

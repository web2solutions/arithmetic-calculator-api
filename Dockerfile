FROM node:16.20.0
# FROM public.ecr.aws/lambda/nodejs:16.2023.06.28.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install serverless globally
# RUN npm i -g serverless
# RUN npm i -g clean-modules

# RUN apt-get update && apt-get install -y python3 zip
# RUN curl -sO https://bootstrap.pypa.io/pip/3.3/get-pip.py
# RUN python3 get-pip.py

# RUN apt-get install jq curl -y

# RUN pip install awscli

COPY package.json ./
COPY serverless.yml ./
COPY tsconfig.json ./
COPY src ./src
COPY config ./config
COPY tests ./tests


# ENV DATABASE_URL="mongodb://localhost:27017/arithmetic-calculator-api"
# ENV DB_URL="mongodb://localhost:27017/arithmetic-calculator-api"

RUN node -v && rm -rf node_modules && rm -rf package-lock.json && rm -rf .build && npm install --ignore-scripts

# COPY . .

EXPOSE 3000

CMD ["sls", "offline", "--host", "0.0.0.0"]

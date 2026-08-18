FROM node:22-bookworm

# Install C++ compiler and basic execution utilities.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      g++ \
      coreutils \
      util-linux \
      procps \
      ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

RUN mkdir -p /tmp/elvoret-executor

EXPOSE 10000

CMD ["npm", "start"]
FROM node:18-slim AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y \
    openssl \
    procps

RUN npm i -g pnpm
# Install app dependencies
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18-slim

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]
FROM node:18-slim AS base

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y \
    openssl \
    procps

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run db:generate

EXPOSE 8080

CMD ["pnpm", "run", "start:dev"]
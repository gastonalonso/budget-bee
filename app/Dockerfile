FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /opt

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./app /opt/app

RUN pnpm install --frozen-lockfile

WORKDIR /opt/app

CMD ["pnpm", "dev"]

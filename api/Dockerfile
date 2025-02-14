FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /opt

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./api /opt/api

RUN pnpm install --frozen-lockfile

WORKDIR /opt/api

RUN pnpm prisma generate

CMD ["pnpm", "dev"]

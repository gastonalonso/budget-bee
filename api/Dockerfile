FROM node:lts-alpine

RUN npm install -g pnpm

WORKDIR /opt

COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./api /opt/api/

RUN pnpm install

WORKDIR /opt/api

CMD ["pnpm", "start"]

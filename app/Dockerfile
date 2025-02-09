
# Stage 1: Build the Vite app
FROM node:lts-alpine as build-stage

RUN npm install -g pnpm

WORKDIR /opt

COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./app /opt/app/

RUN pnpm install --frozen-lockfile

WORKDIR /opt/app

RUN pnpm build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

COPY --from=build-stage /opt/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

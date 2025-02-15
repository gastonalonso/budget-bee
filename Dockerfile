#######################################################
# REPO STAGE. Copy all sources, install dependencies. #
#######################################################
FROM node:22-alpine AS repo

RUN npm install -g pnpm

WORKDIR /opt

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY app/ /opt/app
COPY api/ /opt/api

RUN pnpm install --frozen-lockfile

################################
# APP BUILD STAGE. Bundle App. #
################################
FROM repo AS app-builder

WORKDIR /opt/app

RUN pnpm build

################################
# API BUILD STAGE. Bundle API. #
################################
FROM app-builder AS api-builder

WORKDIR /opt/api

ARG JWT_SECRET
ARG DATABASE_URL

ENV JWT_SECRET=$JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL

RUN pnpm prisma generate

RUN pnpm build:ts

################################
# CLEAN UP STAGE. Trim it down #
################################

FROM node:22-alpine AS clean

RUN npm install -g pnpm

WORKDIR /opt

# Copy package files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY app/package.json app/
COPY api/package.json api/

# Copy built assets
COPY --from=app-builder /opt/app/dist app/dist
COPY --from=api-builder /opt/api/dist api/dist
COPY --from=api-builder /opt/api/prisma api/prisma

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Set environment variables
ENV NODE_ENV=production

# Expose API port
EXPOSE 3000

WORKDIR /opt/api

RUN pnpm prisma generate

# Start the API server
CMD ["pnpm", "start"]

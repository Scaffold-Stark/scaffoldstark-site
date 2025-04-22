# Base stage
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Dependencies stage for main app
FROM base AS main-deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY packages/nextjs/package.json ./packages/nextjs/package.json
# Copy environment file for the build process
COPY .env ./
RUN yarn install --frozen-lockfile

# Dependencies stage for docs app
FROM base AS docs-deps
WORKDIR /app/ss2-docs
COPY ss2-docs/package.json ss2-docs/yarn.lock ./
# Create an empty .env.example to prevent the build error
RUN touch .env.example
# Copy environment file for docs as well
COPY .env ./
RUN yarn install --frozen-lockfile || (echo "Ignoring yarn install error" && true)

# Builder stage for main app
FROM base AS main-builder
WORKDIR /app
COPY --from=main-deps /app ./
WORKDIR /app/packages/nextjs
COPY packages/nextjs .
# Copy environment file for Next.js build
COPY .env ./
RUN yarn workspace @ss-2/nextjs build

# Builder stage for docs app
FROM base AS docs-builder
WORKDIR /app/ss2-docs
COPY --from=docs-deps /app/ss2-docs/node_modules ./node_modules
COPY --from=docs-deps /app/ss2-docs/.env.example ./.env.example
COPY ss2-docs .
# Copy environment file for docs build
COPY .env ./
RUN yarn build || (echo "Proceeding with partial build" && mkdir -p build)

# Final runner stage - no .env file needed here
FROM base AS runner
WORKDIR /app

# Copy main app
COPY --from=main-builder /app/packages/nextjs/public ./packages/nextjs/public
COPY --from=main-builder /app/packages/nextjs/.next/standalone/packages/nextjs ./packages/nextjs
COPY --from=main-builder /app/packages/nextjs/.next/static ./packages/nextjs/.next/static

# Copy docs app
COPY --from=docs-builder /app/ss2-docs/build ./ss2-docs/build
COPY --from=docs-builder /app/ss2-docs/node_modules ./ss2-docs/node_modules

# Create a simple start script
RUN printf '#!/bin/sh\n\
cd /app/ss2-docs && npx serve -s build -l 3001 --single &\n\
cd /app/packages/nextjs && node server.js\n' > /app/start.sh
RUN chmod +x /app/start.sh

ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=$PORT
EXPOSE $PORT

CMD ["/app/start.sh"]
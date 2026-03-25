# Base stage
FROM node:22-alpine AS base
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
RUN yarn install --immutable

# Dependencies stage for docs app
FROM base AS docs-deps
WORKDIR /app
COPY .yarnrc.yml ./
COPY .yarn .yarn
WORKDIR /app/packages/docs
COPY packages/docs/package.json packages/docs/yarn.lock ./
# Create an empty .env.example to prevent the build error
RUN touch .env.example
# Copy environment file for docs as well
COPY .env ./

RUN yarn install --immutable


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
WORKDIR /app
COPY .yarnrc.yml ./
COPY .yarn .yarn
WORKDIR /app/packages/docs
COPY --from=docs-deps /app/packages/docs/node_modules ./node_modules
COPY --from=docs-deps /app/packages/docs/.env.example ./.env.example
COPY packages/docs .
# Copy environment file for docs build
COPY .env ./
RUN yarn build

# Dependencies and builder stage for auco docs (npm-based submodule)
FROM base AS auco-docs-builder
WORKDIR /app/packages/auco-docs
COPY packages/auco-docs/package.json packages/auco-docs/package-lock.json ./
RUN npm ci
COPY packages/auco-docs .
RUN npm run build

# Final runner stage - no .env file needed here
FROM base AS runner
WORKDIR /app

# Copy standalone server first, then overlay static assets on top
COPY --from=main-builder /app/packages/nextjs/.next/standalone/packages/nextjs ./packages/nextjs
COPY --from=main-builder /app/packages/nextjs/public ./packages/nextjs/public
COPY --from=main-builder /app/packages/nextjs/.next/static ./packages/nextjs/.next/static

# Copy docs static builds directly into Next.js public directory
COPY --from=docs-builder /app/packages/docs/build ./packages/nextjs/public/docs
COPY --from=auco-docs-builder /app/packages/auco-docs/build ./packages/nextjs/public/auco

ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=$PORT
EXPOSE $PORT

# Single process - no second service to crash
CMD ["node", "packages/nextjs/server.js"]

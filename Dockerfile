FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY packages/nextjs/package.json ./packages/nextjs/package.json
COPY packages/hardhat/package.json ./packages/hardhat/package.json
RUN yarn install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app ./
WORKDIR /app/packages/nextjs
COPY packages/nextjs .
RUN yarn workspace @ss-2/nextjs build
## TODO : check workspace build ( name : ss-2 )

FROM base AS runner
WORKDIR /app/packages/nextjs
ARG PORT=3000
ENV NODE_ENV production
ENV PORT=$PORT
COPY --from=builder /app/packages/nextjs/public ./public
COPY --from=builder /app/packages/nextjs/.next/standalone/packages/nextjs ./
COPY --from=builder /app/packages/nextjs/.next/static ./.next/static
EXPOSE $PORT
CMD ["node", "server.js"]
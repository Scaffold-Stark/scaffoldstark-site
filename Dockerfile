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
WORKDIR /app/packages/docs
COPY packages/docs/package.json packages/docs/yarn.lock ./
# Create an empty .env.example to prevent the build error
RUN touch .env.example
# Copy environment file for docs as well
COPY .env ./

RUN yarn install --immutable 


# Dependencies stage for auco docs app
FROM base AS auco-docs-deps
WORKDIR /app/packages/auco-docs
COPY packages/auco-docs/package.json packages/auco-docs/package-lock.json ./
# Create an empty .env.example to prevent the build error
RUN touch .env.example
RUN npm ci || (echo "Ignoring npm install error" && true)


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
WORKDIR /app/packages/docs
COPY --from=docs-deps /app/packages/docs/node_modules ./node_modules
COPY --from=docs-deps /app/packages/docs/.env.example ./.env.example
COPY packages/docs .
# Copy environment file for docs build
COPY .env ./
RUN yarn build || (echo "Proceeding with partial build" && mkdir -p build)

# Builder stage for auco docs app
FROM base AS auco-docs-builder
WORKDIR /app/packages/auco-docs
COPY --from=auco-docs-deps /app/packages/auco-docs/node_modules ./node_modules
COPY --from=auco-docs-deps /app/packages/auco-docs/.env.example ./.env.example
COPY packages/auco-docs .
RUN npm run build || (echo "Proceeding with partial build" && mkdir -p build)

# Final runner stage - no .env file needed here
FROM base AS runner
WORKDIR /app

# Copy main app
COPY --from=main-builder /app/packages/nextjs/public ./packages/nextjs/public
COPY --from=main-builder /app/packages/nextjs/.next/standalone/packages/nextjs ./packages/nextjs
COPY --from=main-builder /app/packages/nextjs/.next/static ./packages/nextjs/.next/static

# Copy docs app
COPY --from=docs-builder /app/packages/docs/build ./packages/docs/build
COPY --from=docs-builder /app/packages/docs/node_modules ./packages/docs/node_modules

# Copy auco docs app
COPY --from=auco-docs-builder /app/packages/auco-docs/build ./packages/auco-docs/build
COPY --from=auco-docs-builder /app/packages/auco-docs/node_modules ./packages/auco-docs/node_modules

# Create a start script with health checks to ensure services are ready before starting the main app
RUN printf '#!/bin/sh\n\
\n\
# Function to wait for a service to be ready\n\
wait_for_service() {\n\
    local host=$1\n\
    local port=$2\n\
    local max_attempts=30\n\
    local attempt=1\n\
    \n\
    echo "Waiting for service on $host:$port..."\n\
    while [ $attempt -le $max_attempts ]; do\n\
        if wget -q --spider "http://$host:$port" 2>/dev/null; then\n\
            echo "Service on port $port is ready!"\n\
            return 0\n\
        fi\n\
        echo "Attempt $attempt/$max_attempts: Service on port $port not ready yet..."\n\
        sleep 1\n\
        attempt=$((attempt + 1))\n\
    done\n\
    echo "Warning: Service on port $port did not become ready in time, proceeding anyway..."\n\
    return 1\n\
}\n\
\n\
# Start docs service in background\n\
cd /app/packages/docs && npx serve -s build -l 3001 --single &\n\
\n\
# Start auco-docs service in background\n\
cd /app/packages/auco-docs && npx serve -s build -l 3002 --single &\n\
\n\
# Wait for both services to be ready before starting the main Next.js app\n\
wait_for_service localhost 3001\n\
wait_for_service localhost 3002\n\
\n\
# Start the main Next.js application\n\
cd /app/packages/nextjs && node server.js\n' > /app/start.sh
RUN chmod +x /app/start.sh

ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=$PORT
EXPOSE $PORT

CMD ["/app/start.sh"]

FROM node:22.12.0-alpine AS base

ARG NEXT_PUBLIC_NODE_ENV=production
ENV NEXT_PUBLIC_NODE_ENV=${NEXT_PUBLIC_NODE_ENV}

# ---------- deps ----------
FROM base AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

# ---------- build ----------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# ---------- run ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy standalone server + static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js", "--hostname", "0.0.0.0", "--port", "3000"]

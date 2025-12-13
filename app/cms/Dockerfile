FROM node:24.11.1-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------- run ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -S nodejs
RUN adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js", "--hostname", "0.0.0.0", "--port", "3000"]

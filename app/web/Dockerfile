FROM node:24.11.1 AS base

ARG NEXT_PUBLIC_NODE_ENV=production
ENV NEXT_PUBLIC_NODE_ENV=${NEXT_PUBLIC_NODE_ENV}

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare npm@10.2.4 --activate

WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm ci

COPY --from=builder /app/out/full/ .
RUN npx turbo run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN apk add --no-cache libc6-compat
RUN npm install -g pm2

COPY --from=installer /app/apps/web/public ./apps/web/public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["pm2-runtime", "start", "/app/apps/web/server.js", "-i", "max", "--name", "nextjs-app", "--", "--port", "3000", "--hostname", "0.0.0.0"]
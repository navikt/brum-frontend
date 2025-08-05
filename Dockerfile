FROM node:24@sha256:dd5c5e4d0a67471a683116483409d1e46605a79521b000c668cff29df06efd51 AS builder

WORKDIR /app

RUN --mount=type=secret,id=NODE_AUTH_TOKEN sh -c \
    'npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/NODE_AUTH_TOKEN)'
RUN npm config set @navikt:registry=https://npm.pkg.github.com

COPY package.json package-lock.json ./
RUN npm ci

COPY next.config.ts tsconfig.json ./
COPY app app
COPY components components
COPY hooks hooks
COPY lib lib
COPY mocks mocks
COPY providers providers
COPY public public
COPY styles styles
COPY middleware.ts middleware.ts

RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12@sha256:5651f73a3ed008391f5fa842312db2e9ebf22d945ede6382cb8087a2fcac9f9c AS runtime

WORKDIR /app

COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
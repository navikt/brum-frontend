FROM node:24@sha256:601f205b7565b569d3b909a873cc9aa9c6f79b5052a9fe09d73e885760237c4c AS builder

WORKDIR /app

RUN --mount=type=secret,id=NODE_AUTH_TOKEN sh -c \
    'npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/NODE_AUTH_TOKEN)'
RUN npm config set @navikt:registry=https://npm.pkg.github.com

COPY package.json package-lock.json ./
RUN npm ci

COPY next.config.ts tsconfig.json ./
COPY middleware.ts ./
COPY app app
COPY components components
COPY hooks hooks
COPY lib lib
COPY mocks mocks
COPY providers providers
COPY public public
COPY styles styles

RUN npm run build

FROM gcr.io/distroless/nodejs20-debian11@sha256:a3c4d477f3f303cfdf2b43b0a255fb5a0d435957b466819b3c0940d9d05404b6 AS runtime

WORKDIR /app

COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
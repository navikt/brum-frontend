FROM node:24@sha256:601f205b7565b569d3b909a873cc9aa9c6f79b5052a9fe09d73e885760237c4c AS builder

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

RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12@sha256:b765815eafacee5222bfa50179028f41dd8c642b68ad68ec4e6922d3b1ff2710 AS runtime

WORKDIR /app

COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
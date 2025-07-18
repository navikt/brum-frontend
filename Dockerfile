FROM node:22@sha256:9e6918e8e32a47a58ed5fb9bd235bbc1d18a8c272e37f15d502b9db9e36821ee AS builder

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

FROM gcr.io/distroless/nodejs22-debian12@sha256:fd90468f47e91d0d3c9bc055c8c09edbf0c225c3c795d0c266e2ca94b3ba17e3 AS runtime

WORKDIR /app

COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
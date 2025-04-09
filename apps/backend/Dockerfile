FROM node:lts-alpine

ENV PORT=3000

WORKDIR /app

RUN addgroup --system backend && \
    adduser --system -G backend backend

COPY package.json package-lock.json ./
COPY apps/backend/ apps/backend/

RUN npm ci --omit=dev --legacy-peer-deps

RUN chown -R backend:backend .

CMD [ "node", "apps/backend/dist/main.js" ]
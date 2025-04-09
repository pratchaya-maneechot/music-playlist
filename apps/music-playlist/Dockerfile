FROM node:lts-alpine

ENV PORT=4200

WORKDIR /app

COPY apps/music-playlist/.next/standalone .
COPY apps/music-playlist/public apps/music-playlist/public
COPY apps/music-playlist/.next/static apps/music-playlist/.next/static

EXPOSE 4200
CMD ["node", "apps/music-playlist/server.js"]
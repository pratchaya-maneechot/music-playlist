FROM node:lts-alpine
WORKDIR /app
ENV PORT 8080

COPY apps/music-playlist/.next/standalone .
COPY apps/music-playlist/public apps/music-playlist/public
COPY apps/music-playlist/.next/static apps/music-playlist/.next/static

EXPOSE 8080
ENTRYPOINT ["node", "apps/music-playlist/server.js"]
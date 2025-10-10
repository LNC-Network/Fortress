FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

ENV NODE_ENV=production
ENV PORT=3000


EXPOSE 3000

CMD ["node", "dist/main.js"]

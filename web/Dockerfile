# Use official Node.js 24 LTS (Alpine for smaller image)
FROM node:24-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]

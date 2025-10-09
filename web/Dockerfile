# Use official Node.js 24 LTS (Alpine for smaller image)
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the Next.js app
RUN pnpm run build

# Set environment variables
ENV NODE_ENV=production

# Expose the Next.js port
EXPOSE 3000

# Start the Next.js server (this runs when container starts)
CMD ["pnpm", "start"]

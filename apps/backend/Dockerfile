FROM node:24-alpine3.21 AS builder

# Install build tools for native Node.js addons (like sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

# Build proyect
COPY tsconfig.json eslint.config.js nodemon.json ./
COPY src/ ./src/
RUN npm run build

# Copy dist
FROM node:24-alpine3.21

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --prod

EXPOSE 3000

CMD ["node", "dist/index.js"]
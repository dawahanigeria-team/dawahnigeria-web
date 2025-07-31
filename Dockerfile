# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the React application
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Start the server
CMD ["yarn", "start"]
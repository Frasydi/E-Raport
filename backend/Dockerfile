# Use Node.js LTS version
FROM node:18-alpine

# Install additional packages needed for Prisma
RUN apk add --no-cache openssl libc6-compat

# Set working directory
WORKDIR /app

# Create a non-root user and set ownership
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Copy package files with correct ownership
COPY --chown=nodejs:nodejs package*.json ./

# Switch to nodejs user for installation
USER nodejs

# Install dependencies (use --omit=dev instead of --only=production)
RUN npm ci --omit=dev && npm cache clean --force

# Copy Prisma schema first
COPY --chown=nodejs:nodejs prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY --chown=nodejs:nodejs . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start the application
CMD ["npm", "start"]

# Use Node.js LTS version
FROM node:18-alpine

# Install additional packages needed for Prisma
RUN apk add --no-cache openssl libc6-compat curl

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

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy the rest of the application
COPY --chown=nodejs:nodejs . .

# Make startup script executable
USER root
RUN chmod +x /app/start.sh
USER nodejs

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Use startup script
CMD ["/app/start.sh"]

# Use official Node image  
FROM node:20-alpine  

# Set working directory  
WORKDIR /app  

# Copy dependency files first (caching hack!)  
COPY package*.json ./  

# Install deps (omit dev deps for production)  
RUN npm ci --only=production  

# Copy app source  
COPY . .  

# Expose port (e.g., Express on 5000)  
EXPOSE 5000  

# Start the app  
CMD ["node", "server.js"]  
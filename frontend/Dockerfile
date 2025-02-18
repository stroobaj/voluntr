# Use Node.js official image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Next.js port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev"]

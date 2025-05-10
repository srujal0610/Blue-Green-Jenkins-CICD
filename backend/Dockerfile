# FROM node:18-alpine
# RUN apk add --no
# # Set working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . .

# # Expose port 8000
# EXPOSE 8000

# # Start the backend server
# CMD ["npm", "start"]






FROM node:18-alpine

RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN chmod -R 777 /app
RUN npm install --force
COPY . .
RUN npm rebuild bcrypt --build-from-source
EXPOSE 8000
CMD ["npm", "start"]



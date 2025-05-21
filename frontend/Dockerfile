FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install -g vite
RUN npm install
COPY . .
RUN chmod +x node_modules/.bin/vite
RUN npm run build
FROM node:18-alpine AS serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]

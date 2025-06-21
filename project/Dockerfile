FROM node:20-alpine as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
FROM node:14
WORKDIR /src/index
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev:start"]
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --include=optional
RUN npm install --os=linux --cpu=x64 sharp

COPY . .

EXPOSE 5000 

CMD ["npm", "run", "start"]
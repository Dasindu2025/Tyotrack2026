FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Next.js development mode for real-time updates and motion orchestration debugging
CMD ["npm", "run", "dev"]

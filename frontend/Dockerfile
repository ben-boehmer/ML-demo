FROM node:18
WORKDIR /app
COPY .env.production .env.production

COPY . .
RUN npm install
#RUN npm run build -- --mode production
RUN npm run build
CMD ["npm", "run", "dev"]

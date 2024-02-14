FROM node:20
COPY ./ /app
WORKDIR /app
RUN npm ci
CMD ["node", "/app/app.js"]

FROM node:16

WORKDIR /app
COPY package*.json /
ENV NODE_ENV=development
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon", "bin/www"]
EXPOSE 8080

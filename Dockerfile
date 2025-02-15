# get version 20 of the alpine node image from docker-hub
FROM node:20-alpine

# set the working directory within the image
WORKDIR /app

# copyy the lock file
COPY package.json .

# run yarn to install dependencies
RUN yarn

# copy all files to the working dir, excluding the ones in the dockerignore
COPY . .

# expose port 5137
EXPOSE 5137

# run the application
CMD ["node", "index"]

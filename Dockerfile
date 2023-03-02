# the file we use to build our docker image

# version 14
FROM node:14 

# like cd
WORKDIR /projma

# copy package.json and package-lock.json to /projma
COPY package*.josn ./

# like open a terminal and run command (shell form)
RUN npm install

COPY . .

# environment variable
ENV PORT=8080

# expose port
EXPOSE 8080

# tells container how to run application (exec form) # can only be one per dockerfile
CMD [ "npm", "start" ]
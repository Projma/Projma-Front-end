# the file we use to build our docker image

# pull official base image
FROM node:16-alpine AS builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

# port was exported in ngingx.conf (docker run -d -p 3000:81 image_id)

# build app
RUN npm run build --max-old-space-size=2048 # increase memory to 2GB

FROM nginx:1.23-alpine AS server
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

# --------------------------------------------

# # version 14
# FROM node:14 

# # like cd
# WORKDIR /first_react_app

# # copy package.json and package-lock.json to /first_react_app
# COPY package*.josn ./

# # like open a terminal and run command (shell form)
# RUN npm install

# COPY . .

# # environment variable
# ENV PORT=8080

# # expose port
# EXPOSE 8080

# # tells container how to run application (exec form) # can only be one per dockerfile
# CMD [ "npm", "start" ]

# -*--------------------------------------

# FROM node:alpine
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./
# RUN npm i
# CMD ["npm", "run", "start"]

# -----------------------------------------

# FROM node:14 as build
#WORKDIR /app/
# WORKDIR /app/build

#ENV PATH /app/node_modules/.bin:$PATH
#COPY package.json ./
#RUN rm package-lock.json
#RUN npm clean
#RUN npm install -g esbuild@0.14.38
#RUN npm i
#RUN npm install react-scripts@3.4.1 -g --silent
# COPY . ./
#xRUN npm run build

# production environment
# FROM nginx:latest
# COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/build/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
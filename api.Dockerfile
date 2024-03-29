FROM node:alpine

# create destination directory
RUN mkdir -p /usr/src/ugamers-api
WORKDIR /usr/src/ugamers-api

# update and install dependency
RUN apk update && apk upgrade
RUN apk add python3 g++ make

# copy the app, note .dockerignore
COPY . /usr/src/ugamers-api/
RUN npm install -g yarn
RUN yarn install

# email configuration
RUN apk add msmtp
RUN ln -sf /usr/bin/msmtp /usr/sbin/sendmail

# expose 3000 on container
EXPOSE 3000

# start the app
CMD [ "npm","run", "start:dev" ]
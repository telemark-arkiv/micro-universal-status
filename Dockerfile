# Setting the base to nodejs 7.10.0
FROM node:7.10.1-alpine@sha256:4954ce53247180e207772f936223b11d52a7e4ee712dfe73fe2a75e39f785067

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

ENV NODE_ENV production

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm start
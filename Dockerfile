# Setting the base to nodejs 7.10.0
FROM node:7.10.0-alpine@sha256:ec27361dcb1a1467f182c98e3e973123fda92580ef7b60b17166f550124a98a3

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
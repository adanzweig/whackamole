FROM node:14.10.1
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

ENV PORT=4000

RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE $PORT
CMD [ "npm", "start" ]

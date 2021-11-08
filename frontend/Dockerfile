FROM node:11.10-alpine

WORKDIR /home/findcafe/cms

COPY package*.json ./

RUN npm cache clean --force \
  && npm install

#ENV NODE_ENV production
ENV PORT 4466
EXPOSE 4466

CMD [ "npm", "start"]

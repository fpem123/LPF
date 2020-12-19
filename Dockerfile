FROM node
MAINTAINER  Lee Hoseop <ghtjq3909@naver.com>

RUN mkdir -p /LPF
WORKDIR /LPF
COPY . .
RUN npm install
RUN npm install pm2 -g

EXPOSE 3000

CMD [ "npm", "start" ]

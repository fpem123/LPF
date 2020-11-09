FROM node
MAINTAINER  Lee Hoseop <ghtjq3909@naver.com>

RUN mkdir -p /LPF
WORKDIR /LPF
COPY . .
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

FROM node
MAINTAINER  Lee Hoseop <ghtjq3909@naver.com>

RUN git clone https://github.com/fpem123/LPF.git
WORKDIR /LPF
RUN npm install
RUN npm install pm2 -g

EXPOSE 3000

CMD [ "npm", "start" ]

FROM node
MAINTAINER  Lee, Hoseop <ghtjq3909@naver.com>

WORKDIR /LPF
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

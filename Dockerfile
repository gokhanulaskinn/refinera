FROM node:18 as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY conf/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

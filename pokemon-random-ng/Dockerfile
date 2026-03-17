
#ETAPA 1: Construccion de la app
FROM node:24-alpine AS build-step
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build -- --configuration production


#ETAPA 2: Servidor web nginx
FROM nginx:stable-alpine
COPY --from=build-step /app/dist/pokemon-random-ng /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
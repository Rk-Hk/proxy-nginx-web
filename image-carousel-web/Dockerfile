# Etapa 1: Build
FROM node:24-alpine AS build-step
WORKDIR /app

# Instalamos pnpm globalmente dentro del contenedor
RUN npm install -g pnpm


COPY package.json pnpm-lock.yaml ./
# Instalamos dependencias usando pnpm
RUN pnpm install --frozen-lockfile

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build


# Etapa 2: Producción con Nginx (Esta parte no cambia)
FROM  nginx:stable-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


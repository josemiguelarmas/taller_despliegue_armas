# Usamos una versión ligera de Node.js
FROM node:18-alpine

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias y las instalamos
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Comando para iniciar la aplicación
CMD ["npm", "start"]
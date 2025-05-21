FROM node:18-alpine

WORKDIR /app

# Installation de PNPM
RUN npm install -g pnpm

# Copie des fichiers de configuration
COPY package.json pnpm-lock.yaml ./

# Installation des dépendances
RUN pnpm install

# Copie du code source
COPY . .

# Build de l'application
RUN pnpm build

# Exposition du port
EXPOSE 3000

# Démarrage de l'application
CMD ["pnpm", "start"]

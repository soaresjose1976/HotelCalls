#!/bin/bash

# Arrêt de l'application
echo "Arrêt de l'application..."
pnpm pm2:stop

# Installation des dépendances
echo "Installation des dépendances..."
pnpm install

# Build de l'application
echo "Build de l'application..."
pnpm build

# Démarrage de l'application avec PM2
echo "Démarrage de l'application..."
pnpm pm2:start

# Sauvegarde de la configuration PM2
echo "Sauvegarde de la configuration PM2..."
pm2 save

echo "Déploiement terminé !"

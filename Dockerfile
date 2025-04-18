# Étape 1 : build (conserve les outils nécessaires pour npm install)
FROM node:20-alpine AS build

# Met à jour les paquets système pour corriger les vulnérabilités connues
RUN apk update && apk upgrade

# Dossier de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances (production uniquement)
RUN npm install --production

# Copie du reste des fichiers sources
COPY . .

# Étape 2 : image finale d'exécution
FROM node:20-alpine

# Crée un dossier d'exécution
WORKDIR /app

# Copie le build depuis l'étape précédente
COPY --from=build /app .

# Exposition du port de l'application
EXPOSE 5000

# Commande de lancement
CMD ["npm", "start"]


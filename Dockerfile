# Définit l'image de base pour le serveur Node.js
FROM node:14-alpine AS back 

# Création d'un répertoire de travail pour le serveur
WORKDIR /app/back

# Copie le fichier package.json pour le serveur dans le conteneur
COPY back/package*.json ./

# Installe les dépendances pour le serveur
RUN npm install

# Copie tous les fichiers pour le serveur dans le conteneur
COPY back/ .

# Définit la variable d'environnement pour le serveur
ENV NODE_ENV production

# Démarre le serveur Node.js
CMD ["npm", "run", "server"]

# Définit l'image de base pour l'application React.js
FROM node:14-alpine AS front

# Crée un répertoire de travail pour l'application React.js
WORKDIR /app/front

# Copie le fichier package.json pour l'application React.js dans le conteneur
COPY front/package*.json ./

# Installe les dépendances pour l'application React.js
RUN npm install
RUN npm install expo-font


# Copie tous les fichiers pour l'application React.js dans le conteneur
COPY front/ .

# Build l'application React.js
RUN npm run build

# Définit l'image de base pour l'application finale
FROM node:14-alpine

# Crée un répertoire de travail pour l'application finale
WORKDIR /app

# Copie les fichiers pour le serveur depuis l'image du serveur
COPY --from=back /app/back /app/back

# Copie les fichiers pour l'application React.js depuis l'image de l'application React.js
COPY --from=front /app/client/front /app/client/front

# Expose le port 3000 pour le serveur
EXPOSE 3000

# Démarre le serveur Node.js
CMD ["npm", "run", "server"]



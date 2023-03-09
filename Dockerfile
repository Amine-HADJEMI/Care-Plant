# Définit l'image de base
FROM node:14-alpine

# Crée un répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers du dossier front dans le conteneur
COPY front/ .

# Installe les dépendances du front
RUN npm install

# Copie les fichiers du dossier back dans le conteneur
COPY ./back ./back

# Installe les dépendances du back
RUN cd /app/back && npm install

# Expose les ports utilisés par l'application
EXPOSE 3000 19000 19001

# Démarre l'application
CMD ["npm", "start"]

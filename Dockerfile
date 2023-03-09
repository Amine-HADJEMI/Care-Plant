# Définir l'image de base
FROM node:14

# Créer un répertoire pour l'application
WORKDIR /app

# Copier les fichiers du dossier back dans le répertoire de travail
COPY back /app/back

# Installer les dépendances pour le backend
RUN cd /app/back && npm install

# Copier les fichiers du dossier front dans le répertoire de travail
COPY front /app/front

# Installer les dépendances pour le frontend
RUN cd /app/front && npm install
RUN cd /app/front && npm install expo-font


# Exposer le port du serveur backend
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "server"]

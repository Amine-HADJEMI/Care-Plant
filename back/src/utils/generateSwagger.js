const app = require('./swagger');

// Lancez votre application Express pour générer le fichier Swagger
app.listen(3000, () => {
  console.log('Génération du fichier Swagger terminée !');
});
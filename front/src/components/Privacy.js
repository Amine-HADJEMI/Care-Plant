import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Privacy = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Politique de confidentialité</Text>

        <Text style={styles.text}>
          La politique de confidentialité de notre application web et mobile est
          essentielle pour garantir la sécurité des données de nos utilisateurs.
          Lorsque vous vous connectez à notre application, nous collectons
          certaines informations, telles que votre nom et votre adresse e-mail.
          Nous utilisons ces informations pour améliorer l&apos;expérience utilisateur
          et personnaliser notre service en fonction de vos préférences. Nous ne
          partageons pas ces données avec des tiers sans votre consentement
          explicite. De plus, nous prenons des mesures de sécurité appropriées
          pour protéger vos données, en utilisant des technologies de cryptage et
          en stockant vos informations dans des serveurs sécurisés. Nous
          respectons également le RGPD et nous vous offrons un moyen facile de
          contrôler vos données, y compris la suppression de votre compte et de
          toutes les informations associées. Nous sommes attachés à la protection
          de votre vie privée et nous nous engageons à maintenir une politique de
          confidentialité stricte pour notre application web.
        </Text>

        <Text style={styles.subtitle}>1. Quelles données nous collectons</Text>

        <Text style={styles.subtext}>
          <Text style={styles.bold}>Données de compte :</Text> Pour utiliser
          certaines fonctionnalités (comme l&apos;accès au contenu), vous devez créer
          un compte utilisateur, ce qui nous oblige à collecter et à stocker
          votre adresse électronique, votre User Name choisi, votre nom, votre
          prénom et votre mot de passe. Pour créer un compte d’utilisateur de
          l’application, nous recueillons et stockons votre adresse électronique,
          votre User Name choisi, votre nom, votre prénom et votre mot de passe.
        </Text>

        <Text style={styles.subtext}>
          <Text style={styles.bold}>Données de profil :</Text> Lors de votre
          session dans l’application, vous allez avoir la possibilité de
          communiquer avec d’autres utilisateurs de l’application, et pour avoir
          un bon contact entre utilisateurs, en stock vos discussions dans la
          base de données de l’application pour les mémoriser, de plus lorsque
          vous ajouterai une photo de plante, la photo sera enregistrée dans la
          base de données de l’application, c’est la moyenne pour qu’on puisse la
          communiquer avec les autres utilisateurs.
        </Text>

        <Text style={styles.subtext}>
          <Text style={styles.bold}>Contenu partagé :</Text> Puisque
          l&apos;objective est de partager des photos de plantes, les photos exportés
          par l’utilisateur sont stockées dans la base de données de
          l’application, est affichés aux autres utilisateurs, ainsi que les
          messages de Chat sont partagés entre utilisateurs pour qu’ils peuvent
          communiquer, et donc ils sont stockés dans la base de données de
          l’application
        </Text>

        <Text style={styles.subtitle}>2 – Avec qui nous partageons vos données </Text>
        <Text style={styles.subtext}>
          Vos données qui s’illustrent sur des messages de discussion pour le Chat et des
          photos des plantes sont partagées avec les autres utilisateurs qui peuvent se connecter sur l’application. 
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  }
});

export default Privacy;

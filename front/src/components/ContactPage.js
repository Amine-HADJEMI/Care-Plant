import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ContactPage = () => {
  const handleSubmit = () => {
    // Logique de soumission du formulaire de contact
    // À compléter selon vos besoins
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactez-nous</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactPage;

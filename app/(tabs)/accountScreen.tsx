// src/screens/AccountScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

const AccountScreen = () => {
  // Informations statiques pour l'utilisateur
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [score, setScore] = useState(120); // Score du jeu

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mon Compte</Text>
      <Text style={styles.label}>Nom : {name}</Text>
      <Text style={styles.label}>Email : {email}</Text>
      <Text style={styles.label}>Score : {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AccountScreen;

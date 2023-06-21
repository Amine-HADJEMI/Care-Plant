import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewPrivacy = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Copyright © 2023</Text>

      <Text
        style={styles.footerText}
        onPress={() => navigation.navigate('Privacy')}>
        Politique de confidentialité
      </Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignSelf: 'flex-end',
    backgroundColor: 'lightgray',
  },
  footerText: {
    color: '#999',
    fontSize: 20, 
    marginHorizontal: 10,
  },
  privacyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});


export default ViewPrivacy;

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    resizeMode: 'contain',
  },

    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      marginHorizontal: 20,
    },
    description: {
      fontSize: 16,
      marginHorizontal: 20,
      marginBottom: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 10,
    },
    timestamp: {
      fontSize: 12,
      color: '#A9A9A9',
    },
    divider: {
      height: 1,
      backgroundColor: '#DCDCDC',
      marginHorizontal: 20,
      marginVertical: 10,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconText: {
      fontSize: 16,
      marginLeft: 5,
      color: '#A9A9A9',
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleUser: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
})
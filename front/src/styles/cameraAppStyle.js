import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    borderRadius:'24px',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
})
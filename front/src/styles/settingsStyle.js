import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  TextInput: {
    borderRadius: 30,
    height: 50,
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    position: 'relative'
  },
  containerSignUP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  privacyContainer: {
    position: 'absolute',
    bottom: 0,  
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '5%',
    backgroundColor: 'lightgray',
  },
  
  signUpBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#66D163",
    maxWidth: 500,
  },
  deleteBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF3A00",
    maxWidth: 500,
  },
  loginText: {
    fontSize: "larger",
    fontWeight: "bold",
  },
  inputView: {
    backgroundColor: "#A1E79F",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    maxWidth: 400,
  },
  errorStyle: {
    color: 'red',
    paddingTop: '2%'
  }
})
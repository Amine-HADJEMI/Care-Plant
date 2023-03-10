import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 260,
    height: 130,
    marginBottom: 70,
  },
  image: {
    marginBottom: 40,
    maxWidth: "50%",
  },
  inputView: {
    backgroundColor: "#A1E79F",
    borderRadius: 30,
    border : 'solid #8FCD8D',
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    maxWidth: 400,
  },
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
  mdpBtn: {
    height: 20,
    marginBottom: 10,
    color: "#000",
    backgroundColor: "#fff",
    fontSize: "small",
  },
  signUpBtn: {
    height: 30,
    marginBottom: 40,
    marginTop: 10,
    color: "#000",
    backgroundColor: "#fff",
    fontSize: "small",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#66D163",
    maxWidth: 500,
  },
  loginText: {
    fontSize: "larger",
    fontWeight: "bold",
  },
  errorStyle: {
    color: "red",
  }
})
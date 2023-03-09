import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Login from "../src/components/Login";

describe("Login component", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<Login />);
    const loginScreen = getByTestId("login-screen");
    expect(loginScreen).toBeDefined();
  });

  test("email input changes value correctly", () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText("Adresse email");
    fireEvent.changeText(emailInput, "test@example.com");
    expect(emailInput.props.value).toBe("test@example.com");
  });

  test("password input changes value correctly", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText("Mot de passe top secret");
    fireEvent.changeText(passwordInput, "password123");
    expect(passwordInput.props.value).toBe("password123");
  });

  test("forgot password button navigates to correct screen", () => {
    const navigate = jest.fn();
    const { getByTestId } = render(
      <Login navigation={{ navigate }} />
    );
    const forgotPasswordButton = getByTestId("forgot-password-button");
    fireEvent.press(forgotPasswordButton);
    expect(navigate).toHaveBeenCalledWith("ForgetPassword");
  });

  test("signup button navigates to correct screen", () => {
    const navigate = jest.fn();
    const { getByTestId } = render(
      <Login navigation={{ navigate }} />
    );
    const signupButton = getByTestId("signup-button");
    fireEvent.press(signupButton);
    expect(navigate).toHaveBeenCalledWith("Signup");
  });
});

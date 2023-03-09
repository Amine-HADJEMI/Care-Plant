import React from 'react';
import { mount } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Login />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the login form', () => {
    expect(wrapper.find('TextInput')).toHaveLength(2);
    expect(wrapper.find('TouchableOpacity')).toHaveLength(3);
  });

  it('should update the email state on input change', () => {
    const emailInput = wrapper.find('TextInput').at(0);
    emailInput.simulate('changeText', 'test@test.com');
    expect(wrapper.find('TextInput').at(0).prop('value')).toEqual('test@test.com');
  });

  it('should update the password state on input change', () => {
    const passwordInput = wrapper.find('TextInput').at(1);
    passwordInput.simulate('changeText', 'password123');
    expect(wrapper.find('TextInput').at(1).prop('value')).toEqual('password123');
  });

  it('should call loginSuccess function on login button click', () => {
    const loginButton = wrapper.find('TouchableOpacity').at(1);
    const loginSuccess = jest.fn();
    wrapper.instance().loginSuccess = loginSuccess;
    loginButton.simulate('press');
    expect(loginSuccess).toHaveBeenCalledTimes(1);
  });

  it('should navigate to ForgetPassword screen on forgot password button click', () => {
    const forgetPasswordButton = wrapper.find('TouchableOpacity').at(0);
    const navigate = jest.fn();
    wrapper.setProps({ navigation: { navigate } });
    forgetPasswordButton.simulate('press');
    expect(navigate).toHaveBeenCalledWith('ForgetPassword');
  });

  it('should navigate to Signup screen on sign up button click', () => {
    const signUpButton = wrapper.find('TouchableOpacity').at(2);
    const navigate = jest.fn();
    wrapper.setProps({ navigation: { navigate } });
    signUpButton.simulate('press');
    expect(navigate).toHaveBeenCalledWith('Signup');
  });
});


import {View} from 'react-native';
import React from 'react';
import componentStyle from '../css/GlobalCss';
import Onboarding from '../components/Slider/Onboarding';

const Login = () => {
  return (
    <View style={componentStyle.container}>
      <Onboarding />
    </View>
  );
};

export default Login;

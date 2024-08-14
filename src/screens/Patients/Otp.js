import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Otp = () => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(15);
  const [otpInput, setOtpInput] = useState(['', '', '', '']);
  const [toggle, setToggle] = useState(true);
  const inputRefs = [];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setToggle(false);
    }
  }, [timeLeft]);

  const handleOtpChange = (value, index) => {
    const newOtpInput = [...otpInput];
    newOtpInput[index] = value;
    setOtpInput(newOtpInput);

    if (value && index < 3) {
      inputRefs[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1]?.focus();
    }

    if (newOtpInput.join('')?.length === 4) {
      navigation.navigate('Tabs');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Enter OTP</Text>
        <Text style={styles.subHeading}>
          Please enter the OTP to access all of MedAyu Services!
        </Text>
      </View>

      <View>
        <Text style={styles.otpText}>OTP sent on SMS</Text>
        <View style={styles.inputOuterContainer}>
          {[0, 1, 2, 3].map(index => (
            <TextInput
              key={index}
              ref={ref => (inputRefs[index] = ref)}
              style={styles.textInput}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={value => handleOtpChange(value, index)}
              value={otpInput[index]}
            />
          ))}
        </View>
        <View
          style={[
            styles.innerContainer,
            toggle ? styles.invalid : styles.valid,
          ]}>
          <Text style={{ color: '#054185', fontWeight: 'bold' }}>
            Resend the OTP in
          </Text>
          <Text style={{ color: '#054185', fontWeight: 'bold' }}>{`00:${timeLeft
            .toString()
            .padStart(2, '0')} secs`}</Text>
        </View>
        <View style={[toggle ? styles.valid : styles.invalid]}>
          <Text
            style={{
              marginHorizontal: 20,
              color: '#4992c9',
              fontWeight: 'bold',
            }}>
            Didn't get OTP?
          </Text>
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.resend}>
              <Text style={styles.resendText}>Resend on Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resend}>
              <Text style={styles.resendText}>Resend on SMS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#054185',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4992c9',
    textAlign: 'center',
  },
  otpText: {
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 20,
    marginVertical: 30,
    color: '#054185',
    fontWeight: 'bold',
  },
  inputOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
  },
  textInput: {
    borderRadius: 15,
    borderWidth: 1,
    width: '20%',
    height: 50,
    borderColor: '#33b88c',
    textAlign: 'center',
  },
  innerContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'space-between',
  },
  innerHeading: {
    color: '#33b88c',
  },
  resend: {
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F28500',
  },
  resendText: {
    color: '#F28500',
    fontSize: 14,
  },
  valid: {
    display: 'none',
  },
  invalid: {},
});

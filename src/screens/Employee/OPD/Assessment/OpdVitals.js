import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, TextInput, Dialog, Portal, Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import {Image} from 'react-native';

// Images...
import temperature from '../../../../images/temperature.png';
import spo2 from '../../../../images/spo2.png';
import rr from '../../../../images/rr.png';
import pulse from '../../../../images/pulse.png';
import sysbp from '../../../../images/sysbp.png';
import diabp from '../../../../images/diabp.png';
import DropDown from 'react-native-paper-dropdown';
import {BackHandler} from 'react-native';

const OpdVitals = () => {
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MenstrualHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const navigation = useNavigation();
  const [p_temp, setP_Temp] = useState('');
  const [p_pulse, setP_Pulse] = useState('');
  const [p_spo2, setP_SPO2] = useState('');
  const [p_systolicbp, setP_SystolicBP] = useState('');
  const [p_diastolicbp, setP_DiastolicBP] = useState('');
  const [p_rsprate, setP_Rsprate] = useState('');
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const {scannedPatientsData, userData} = useContext(UserContext);
  const {_id, hospital_id} = userData?.data[0];
  const {patient_id} = scannedPatientsData;
  const [validationErrors, setValidationErrors] = React.useState({
    p_temp: '',
    p_pulse: '',
    p_spo2: '',
    p_systolicbp: '',
    p_diastolicbp: '',
    p_rsprate: '',
    motorResponse: '',
    verbalResponse: '',
    eyeopening: '',
  });
  const [showEyeopening, setshowEyeopening] = useState(false);
  const [showverbalReaponse, setshowverbalReaponse] = useState(false);
  const [showMotorResponse, setshowMotorResponse] = useState(false);
  // Input handler
  const addVitalsData = async () => {
    const errors = {};
    let isValidInput = true;

    if (!validateInputRange(p_temp, 90, 110)) {
      errors.p_temp = 'Temperature Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_pulse, 20, 300)) {
      errors.p_pulse = 'Pulse Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_spo2, 30, 100)) {
      errors.p_spo2 = 'SPO2 Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_systolicbp, 30, 240)) {
      errors.p_systolicbp = 'Systolic BP Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_diastolicbp, 10, 200)) {
      errors.p_diastolicbp = 'Diastolic BP Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_rsprate, 5, 50)) {
      errors.p_rsprate = 'Respiratory Rate Not in Range';
      isValidInput = false;
    }
    if (!validateInputRange(eyeopening, 1, 4)) {
      errors.eyeopening = 'EyeOpening Range 1-4';
      isValidInput = false;
    } else {
      errors.eyeopening = ''; // Clear error if input is in range
    }
    if (!validateInputRange(verbalResponse, 1, 5)) {
      errors.verbalResponse = 'Verbal Range 1-5';
      isValidInput = false;
    } else {
      errors.verbalResponse = ''; // Clear error if input is in range
    }
    if (!validateInputRange(motorResponse, 1, 6)) {
      errors.motorResponse = 'Motor Range 1-6';
      isValidInput = false;
    } else {
      errors.motorResponse = ''; // Clear error if input is in range
    }

    if (isValidInput) {
      try {
        await axios
          .post(`${api.baseurl}/AddMobileVitals`, {
            reception_id: _id,
            hospital_id: hospital_id,
            patient_id: patient_id,
            p_rsprate: p_rsprate,
            p_diastolicbp: p_diastolicbp,
            p_systolicbp: p_systolicbp,
            p_spo2: p_spo2,
            p_pulse: p_pulse,
            p_temp: p_temp,
            eyeopening: eyeopening,
            motorResponse: motorResponse,
            verbalResponse: verbalResponse,
          })
          .then(res => {
            if (res.data.status === false) {
              ToastAndroid.show(
                `${res.data.message}`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            } else {
              setValidationErrors({
                p_temp: '',
                p_pulse: '',
                p_spo2: '',
                p_systolicbp: '',
                p_diastolicbp: '',
                p_rsprate: '',
              });
              setVisible(true);
            }
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      // Handle validation error, show a message, or perform other actions
      setValidationErrors(errors);
      ToastAndroid.show(
        `Validation failed. Please check input values.`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const validateInputRange = (value, min, max) => {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= min && numericValue <= max;
  };

  let relation = [
    {
      label: 'Spontaneous',
      value: '4',
    },
    {
      label: 'To sound',
      value: '3',
    },
    {
      label: 'To pressure',
      value: '2',
    },
    {
      label: 'None',
      value: '1',
    },
  ];
  let relationV = [
    {
      label: 'Orientated',
      value: '5',
    },
    {
      label: 'Confused',
      value: '4',
    },
    {
      label: 'Words',
      value: '3',
    },
    {
      label: 'Sounds',
      value: '2',
    },
    {
      label: 'None',
      value: '1',
    },
  ];
  let relationM = [
    {
      label: 'Obey commands',
      value: '6',
    },
    {
      label: 'Localising',
      value: '5',
    },
    {
      label: 'Normal flexion',
      value: '4',
    },
    {
      label: 'Abnormal flexion',
      value: '3',
    },
    {
      label: 'Extension',
      value: '2',
    },
    {
      label: 'None',
      value: '1',
    },
  ];
  const [eyeopening, seteyeopening] = useState('');
  const [verbalResponse, setverbalResponse] = useState('');
  const [motorResponse, setmotorResponse] = useState('');
  const [mildColor, setmildColor] = useState('');
  const [moderateColor, setmoderateColor] = useState('');
  const [severeColor, setsevereColor] = useState('');

  useEffect(() => {
    const scalecount =
      parseInt(eyeopening) + parseInt(verbalResponse) + parseInt(motorResponse);

    if (scalecount >= 13) {
      setmildColor('green');
      setmoderateColor('white');
      setsevereColor('white');
    } else if (scalecount >= 9 && scalecount <= 12) {
      setmoderateColor('yellow');
      setmildColor('white');
      setsevereColor('white');
    } else if (scalecount >= 3 && scalecount <= 8) {
      setsevereColor('red');
      setmoderateColor('white');
      setmildColor('white');
    } else {
      null;
    }
  }, [eyeopening, verbalResponse, motorResponse]);
  return (
    <>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Icon icon="check-all" style={{color: 'green'}} />
          <Dialog.Title style={styles.title}>Success!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{textAlign: 'center'}}>
              Vital Data Add Successfully!
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Cancel</Button>
            <Button
              onPress={() => {
                navigation.navigate('Epatientvitalhistory'), hideDialog();
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('MenstrualHistory');
          }}
        />
        <Appbar.Content title="Menstrual History" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <ScrollView vertical>
          <View style={styles.tableWrapper}>
            <View style={styles.grpInput}>
              <View style={styles.grpImgTxt}>
                <Image source={temperature} alt="Temp" style={styles.img} />
                <Text style={styles.label}>TEMP</Text>
              </View>
              <TextInput
                value={p_temp}
                style={[
                  styles.input,
                  validationErrors.p_temp && styles.errorInput,
                ]}
                onChangeText={text => setP_Temp(text)}
                keyboardType="numeric"
                error={!!validationErrors.p_temp}
                right={
                  <TextInput.Affix textStyle={{fontSize: 13}} text=" °F" />
                }
                backgroundColor={'white'}
              />
            </View>
            {validationErrors.p_temp && (
              <Text style={styles.errorText}>{validationErrors.p_temp}</Text>
            )}
            <View style={styles.grpInput}>
              <View style={styles.grpImgTxt}>
                <Image source={pulse} alt="Temp" style={styles.img} />
                <Text style={styles.label}>PULSE</Text>
              </View>
              <TextInput
                value={p_pulse}
                style={[
                  styles.input,
                  validationErrors.p_pulse && styles.errorInput,
                ]}
                keyboardType="numeric"
                onChangeText={text => setP_Pulse(text)}
                error={!!validationErrors.p_pulse}
                right={
                  <TextInput.Affix textStyle={{fontSize: 13}} text=" /min" />
                }
                backgroundColor={'white'}
              />
            </View>
            {validationErrors.p_pulse && (
              <Text style={styles.errorText}>{validationErrors.p_pulse}</Text>
            )}
            <View style={styles.grpInput}>
              <View style={styles.grpImgTxt}>
                <Image source={spo2} alt="SPO2" style={styles.img} />
                <Text style={styles.label}>SPO2</Text>
              </View>
              <TextInput
                value={p_spo2}
                style={[
                  styles.input,
                  validationErrors.p_spo2 && styles.errorInput,
                ]}
                keyboardType="numeric"
                error={!!validationErrors.p_spo2}
                onChangeText={text => setP_SPO2(text)}
                right={
                  <TextInput.Affix textStyle={{fontSize: 13}} text="  %" />
                }
                backgroundColor={'white'}
              />
            </View>
            {validationErrors.p_spo2 && (
              <Text style={styles.errorText}>{validationErrors.p_spo2}</Text>
            )}
            <View style={styles.grpInput}>
              <View style={styles.grpImgTxt}>
                <Image source={sysbp} alt="SYS_BP" style={styles.img} />
                <Text style={styles.label}>SYSTOLIC BP</Text>
              </View>
              <TextInput
                value={p_systolicbp}
                style={[
                  styles.input,
                  validationErrors.p_systolicbp && styles.errorInput,
                ]}
                keyboardType="numeric"
                error={!!validationErrors.p_systolicbp}
                onChangeText={text => setP_SystolicBP(text)}
                right={
                  <TextInput.Affix textStyle={{fontSize: 13}} text="  mmHg" />
                }
                backgroundColor={'white'}
              />
            </View>
            {validationErrors.p_systolicbp && (
              <Text style={styles.errorText}>
                {validationErrors.p_systolicbp}
              </Text>
            )}
            <View style={styles.grpInput}>
              <View style={styles.grpImgTxt}>
                <Image source={diabp} alt="DIA_BP" style={styles.img} />
                <Text style={styles.label}>DIASTOLIC BP</Text>
              </View>
              <TextInput
                value={p_diastolicbp}
                style={[
                  styles.input,
                  validationErrors.p_diastolicbp && styles.errorInput,
                ]}
                keyboardType="numeric"
                error={!!validationErrors.p_diastolicbp}
                onChangeText={text => setP_DiastolicBP(text)}
                right={
                  <TextInput.Affix textStyle={{fontSize: 13}} text="  mmHg" />
                }
                backgroundColor={'white'}
              />
            </View>
            {validationErrors.p_diastolicbp && (
              <Text style={styles.errorText}>
                {validationErrors.p_diastolicbp}
              </Text>
            )}
            <View style={styles.grpInput}>
              <View style={styles.grpImgTxt}>
                <Image source={rr} alt="RR" style={styles.img} />
                <Text style={styles.label}>RESP. Rate</Text>
              </View>
              <TextInput
                value={p_rsprate}
                style={[
                  styles.input,
                  validationErrors.p_rsprate && styles.errorInput,
                ]}
                keyboardType="numeric"
                error={!!validationErrors.p_rsprate}
                onChangeText={text => setP_Rsprate(text)}
                right={
                  <TextInput.Affix textStyle={{fontSize: 13}} text="  /min" />
                }
                backgroundColor={'white'}
              />
            </View>
            {validationErrors.p_rsprate && (
              <Text style={styles.errorText}>{validationErrors.p_rsprate}</Text>
            )}
          </View>
          <Text style={styles.tableWrapper2TXT}>Glasgow Coma Scale</Text>
          <View style={styles.tableWrapper2}>
            <View style={styles.txtInput}>
              <Text style={styles.tableWrapperTXT}>Eye Opening</Text>
              <TextInput
                style={styles.textinput}
                value={eyeopening}
                keyboardType="numeric"
                onChangeText={text => {
                  seteyeopening(text);
                  setValidationErrors(prevState => ({
                    ...prevState,
                    eyeopening: validateInputRange(text, 1, 4)
                      ? ''
                      : 'Eye Opening range 1-4',
                  }));
                }}
                error={!!validationErrors.eyeopening}
              />
              {validationErrors.eyeopening && (
                <Text style={styles.errorText}>
                  {validationErrors.eyeopening}
                </Text>
              )}
            </View>
            <View style={styles.txtInput}>
              <Text style={styles.tableWrapperTXT}>Verbal Resp.</Text>
              <TextInput
                style={styles.textinput}
                value={verbalResponse}
                keyboardType="numeric"
                onChangeText={text => {
                  setverbalResponse(text);
                  setValidationErrors(prevState => ({
                    ...prevState,
                    verbalResponse: validateInputRange(text, 1, 5)
                      ? ''
                      : 'Verbal range 1-5',
                  }));
                }}
                error={!!validationErrors.verbalResponse}
              />
              {validationErrors.verbalResponse && (
                <Text style={styles.errorText}>
                  {validationErrors.verbalResponse}
                </Text>
              )}
            </View>
            <View style={styles.txtInput}>
              <Text style={styles.tableWrapperTXT}>Motor Resp.</Text>
              <TextInput
                style={styles.textinput}
                value={motorResponse}
                keyboardType="numeric"
                onChangeText={text => {
                  setmotorResponse(text);
                  setValidationErrors(prevState => ({
                    ...prevState,
                    motorResponse: validateInputRange(text, 1, 6)
                      ? ''
                      : 'Motor range 1-6',
                  }));
                }}
                error={!!validationErrors.motorResponse}
              />
              {validationErrors.motorResponse && (
                <Text style={styles.errorText}>
                  {validationErrors.motorResponse}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.tableWrapper3}>
            <View style={styles.formGroup}>
              <Text style={styles.tableWrapper3TXT}>Eye Opening</Text>
              <View style={{width: '60%'}}>
                <DropDown
                  mode={'outlined'}
                  dropDownStyle={{backgroundColor: 'white'}}
                  visible={showEyeopening}
                  showDropDown={() => setshowEyeopening(true)}
                  onDismiss={() => setshowEyeopening(false)}
                  value={eyeopening}
                  setValue={seteyeopening}
                  list={relation?.map(res => ({
                    label: res.label,
                    value: res.value,
                  }))}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.tableWrapper3TXT}>Verbal Response</Text>
              <View style={{width: '60%'}}>
                <DropDown
                  mode={'outlined'}
                  visible={showverbalReaponse}
                  style={styles.dropdown}
                  showDropDown={() => setshowverbalReaponse(true)}
                  onDismiss={() => setshowverbalReaponse(false)}
                  value={verbalResponse}
                  setValue={setverbalResponse}
                  list={relationV?.map(res => ({
                    label: res.label,
                    value: res.value,
                  }))}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.tableWrapper3TXT}>Motor Response</Text>
              <View style={{width: '60%'}}>
                <DropDown
                  mode={'outlined'}
                  visible={showMotorResponse}
                  style={styles.dropdown}
                  showDropDown={() => setshowMotorResponse(true)}
                  onDismiss={() => setshowMotorResponse(false)}
                  value={motorResponse}
                  setValue={setmotorResponse}
                  list={relationM?.map(res => ({
                    label: res.label,
                    value: res.value,
                  }))}
                />
                <View style={styles.spacerStyle} />
              </View>
            </View>
          </View>
          <Text style={styles.tableWrapper2TXT}>Glasgow Coma Scale Score</Text>
          <View style={styles.tableWrapper4}>
            <View
              key="Mild"
              style={[
                styles.gcsStatus,
                {
                  backgroundColor: mildColor,
                },
              ]}>
              <Text style={styles.gcsStatusTxt}>Mild</Text>
              <Text style={styles.gcsStatusTxt}>13-15</Text>
            </View>
            <View
              key="Moderate"
              style={[
                styles.gcsStatus,
                {
                  backgroundColor: moderateColor,
                },
              ]}>
              <Text style={styles.gcsStatusTxt}>Moderate</Text>
              <Text style={styles.gcsStatusTxt}>9-12</Text>
            </View>
            <View
              key="Severe"
              style={[
                styles.gcsStatus,
                {
                  backgroundColor: severeColor,
                },
              ]}>
              <Text style={styles.gcsStatusTxt}>Severe</Text>
              <Text style={styles.gcsStatusTxt}>3-8</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.grpBtn}>
          {/* Group Buttons .....  */}
          <View style={styles.submitbutton}>
            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => navigation.navigate('MenstrualHistory')}>
              Previous
            </Button>

            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => navigation.navigate('OpdVitals')}>
              Save & Next
            </Button>

            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => navigation.navigate('GeneralExamination')}>
              Skip
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OpdVitals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableWrapper: {
    marginHorizontal: 16,
  },
  grpInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '600',
    marginHorizontal: 10,
  },
  input: {
    width: 150,
  },
  btn: {
    width: 'auto',
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
  },
  grpBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  img: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  grpImgTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
  },
  tableWrapper2: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  txtInput: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  tableWrapperTXT: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  tableWrapper2TXT: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3888ff',
    marginVertical: 10,
    textAlign: 'center',
  },
  tableWrapper3: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
  tableWrapper3TXT: {
    fontWeight: '600',
    color: 'black',
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  textinput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  tableWrapper4: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  gcsStatus: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0.9,
    padding: 4,
    borderColor: '#f0f2f0',
    borderRadius: 16,
    width: '30%',
  },
  gcsStatusTxt: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});

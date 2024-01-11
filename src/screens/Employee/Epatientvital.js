import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Button, TextInput, Dialog, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';
import {Image} from 'react-native';

// Images...
import temperature from '../../images/temperature.png';
import spo2 from '../../images/spo2.png';
import rr from '../../images/rr.png';
import pulse from '../../images/pulse.png';
import sysbp from '../../images/sysbp.png';
import diabp from '../../images/diabp.png';

const Epatientvital = () => {
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
  });

  // Input handler
  const addVitalsData = async () => {
    const errors = {};
    let isValidInput = true;

    if (!validateInputRange(p_temp, 95, 105)) {
      errors.p_temp = 'Temperature Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_pulse, 60, 100)) {
      errors.p_pulse = 'Pulse Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_spo2, 92, 94)) {
      errors.p_spo2 = 'SPO2 Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_systolicbp, 0, 120)) {
      errors.p_systolicbp = 'Systolic BP Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_diastolicbp, 70, 100)) {
      errors.p_diastolicbp = 'Diastolic BP Not in Range';
      isValidInput = false;
    }

    if (!validateInputRange(p_rsprate, 24, 30)) {
      errors.p_rsprate = 'Respiratory Rate Not in Range';
      isValidInput = false;
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
          })
          .then(res => {
            console.log(res.data);
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
            <Button onPress={() => navigation.navigate('Eipdoptions')}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
                  <TextInput.Affix
                    textStyle={{fontSize: 13}}
                    text=" 95 to 105  °F"
                  />
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
                  <TextInput.Affix
                    textStyle={{fontSize: 13}}
                    text=" 60-100 /min"
                  />
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
                  <TextInput.Affix textStyle={{fontSize: 13}} text=" 92-94 %" />
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
                  <TextInput.Affix
                    textStyle={{fontSize: 13}}
                    text=" < 120 mmHg"
                  />
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
                  <TextInput.Affix
                    textStyle={{fontSize: 13}}
                    text=" 70-100 mmHg"
                  />
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
                  <TextInput.Affix
                    textStyle={{fontSize: 13}}
                    text=" 24-30 /min"
                  />
                }
                backgroundColor={'white'}
              />
            </View>
            {validationErrors.p_rsprate && (
              <Text style={styles.errorText}>{validationErrors.p_rsprate}</Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.grpBtn}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => {
              addVitalsData();
            }}>
            Update Vitals
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Epatientvitalhistory');
            }}>
            Vitals History
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Epatientvital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    width: 140,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
  },
  grpBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
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
  // errorInput: {
  //   borderColor: 'red',
  //   borderWidth: 1,
  // },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
  },
});

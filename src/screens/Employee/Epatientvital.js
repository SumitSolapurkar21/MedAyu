import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Button, TextInput, Dialog, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';

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

  //input handler ....
  const addVitalsData = async () => {
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
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="check-all" />
          <Dialog.Title style={styles.title}>Success !</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Vital Data Add Successfully!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => console.log('Cancel')}>Cancel</Button>
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
              <Text style={styles.label}>TEMP</Text>
              <TextInput
                value={p_temp}
                style={styles.input}
                onChangeText={text => setP_Temp(text)}
                right={<TextInput.Affix text="°F" />}
              />
            </View>
            <View style={styles.grpInput}>
              <Text style={styles.label}>PULSE</Text>
              <TextInput
                value={p_pulse}
                style={styles.input}
                onChangeText={text => setP_Pulse(text)}
                right={<TextInput.Affix text="  /min" />}
              />
            </View>
            <View style={styles.grpInput}>
              <Text style={styles.label}>SPO2</Text>
              <TextInput
                value={p_spo2}
                style={styles.input}
                onChangeText={text => setP_SPO2(text)}
                right={<TextInput.Affix text="  %" />}
              />
            </View>
            <View style={styles.grpInput}>
              <Text style={styles.label}>SYSTOLIC BP</Text>
              <TextInput
                value={p_systolicbp}
                style={styles.input}
                onChangeText={text => setP_SystolicBP(text)}
                right={<TextInput.Affix text="  mmHg" />}
              />
            </View>
            <View style={styles.grpInput}>
              <Text style={styles.label}>DIASTOLIC BP</Text>
              <TextInput
                value={p_diastolicbp}
                style={styles.input}
                onChangeText={text => setP_DiastolicBP(text)}
                right={<TextInput.Affix text="  mmHg" />}
              />
            </View>
            <View style={styles.grpInput}>
              <Text style={styles.label}>RESP. Rate</Text>
              <TextInput
                value={p_rsprate}
                style={styles.input}
                onChangeText={text => setP_Rsprate(text)}
                right={<TextInput.Affix text="  /min" />}
              />
            </View>
          </View>
        </ScrollView>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => {
            addVitalsData();
            setVisible(true);
          }}>
          Update Vitals
        </Button>
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
    //     backgroundColor: 'transpareSafeAreaView
    width: 200,
  },
  btn: {
    width: 180,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
  },
});

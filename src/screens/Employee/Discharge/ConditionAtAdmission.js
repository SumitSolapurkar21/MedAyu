import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Appbar, TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';

const ConditionAtAdmission = ({route}) => {
  const [text, setText] = React.useState('');
  const navigation = useNavigation();
  const {userData} = useContext(UserContext);
  const {_id, hospital_id} = userData.data[0];
  const patient_id = route?.params?.patient_id;
  const ip_no = route?.params?.ip_no;

  const _FetchPatientSummary = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchPatientSummary`, {
          hospital_id: hospital_id,
          reception_id: _id,
          patient_id: patient_id,
          ip_no: ip_no,
          condition_status: 'Admitted',
        })
        .then(res => {
          const {status, message, admission_summary} = res?.data;
          if (status === true) setText(admission_summary);
          else console.error(message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _FetchPatientSummary();
  }, [patient_id, ip_no]);
  //UpdatePatientSummaryCondition ....

  const _updatepatientsummarycondition = async () => {
    if (text === '') {
      console.warn('Condition should Not Empty');
    } else {
      try {
        await axios
          .post(`${api.baseurl}/UpdatePatientSummaryCondition`, {
            hospital_id: hospital_id,
            reception_id: _id,
            patient_id: patient_id,
            ip_no: ip_no,
            condition_status: 'Admitted',
            admission_summary: text,
          })
          .then(res => {
            const {status, message} = res?.data;
            if (status === true) navigation.navigate('PatientDischargeHistory');
            else console.error(message);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('PatientDischargeHistory');
          }}
        />
        <Appbar.Content
          title="Condition at Admission "
          style={styles.appbar_title}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            mode="flat"
            label="Enter The Text"
            value={text}
            multiline
            style={styles.inputText}
            onChangeText={text => setText(text)}
          />
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => _updatepatientsummarycondition()}>
            Update
          </Button>
        </View>
      </View>
    </>
  );
};

export default ConditionAtAdmission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 10,
  },
  inputText: {
    minHeight: 550,
    marginBottom: 20,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 2,
  },
  btn: {
    alignSelf: 'center',
  },
});

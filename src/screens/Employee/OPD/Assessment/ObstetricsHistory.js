import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {
  Appbar,
  Button,
  RadioButton,
  TextInput,
  Divider,
  Checkbox,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import axios from 'axios';

const ObstetricsHistory = () => {
  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id, mobilenumber} = scannedPatientsData;

  const navigation = useNavigation();
  const [temp, setTemp] = useState([]);

  // radio states ...
  const [pregnant, setPregnant] = useState('');
  const [breastFeeding, setBreastFeeding] = useState('');
  const [conception, setConception] = useState('');
  const [contraception, setContraception] = useState('');

  // checkbox states ...
  const [pillsChecked, setpillsChecked] = useState(false);
  const [injuctionChecked, setInjuctionChecked] = useState(false);
  const [otherChecked, setOtherChecked] = useState(false);

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('PersonalHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const _formObject = [
    {
      g: temp?.G ?? '',
      p: temp?.P ?? '',
      l: temp?.L ?? '',
      a: temp?.A ?? '',
      d: temp?.D ?? '',
      pregnant: pregnant,
      breastFeeding: breastFeeding,
      conception: conception,
      contraception: contraception,
      pillsChecked: pillsChecked,
      injuctionChecked: injuctionChecked,
      otherChecked: otherChecked,
    },
  ];
  //  submit handler ....
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: hospital_id,
      patient_id: patient_id,
      reception_id: reception_id,
      appoint_id: appoint_id,
      uhid: uhid,
      api_type: 'OPD-OBSTETRICS-HISTORY',
      opdobstetricshistoryarray: _formObject,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            navigation.navigate('MenstrualHistory');
            _resetHandler();
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const _resetHandler = () => {
    setTemp([]);
    setPregnant('');
    setBreastFeeding('');
    setConception('');
    setContraception('');
    setpillsChecked(false);
    setInjuctionChecked(false);
    setOtherChecked(false);
  };

  const [opdAssessment, setOpdAssessment] = useState([]);
  const keys3 = [
    'G',
    'P',
    'L',
    'A',
    'D',
    'Pregnant',
    'Breast Feeding',
    'Planing to Conceive',
    'Contraception',
    'Pill',
    'Injuction',
    'Other',
    'Date / Time',
  ];
  const [widthArr2, setWidthArr2] = useState([]);
  useEffect(() => {
    setWidthArr2([
      50,
      50,
      50,
      50,
      50,
      100,
      100,
      100,
      100,
      100,
      150,
      120,
      120,
      ...Array(keys3.length).fill(1),
    ]);
  }, []);
  useEffect(() => {
    FetchMobileOpdAssessment();
    return () => {};
  }, [hospital_id, patient_id, reception_id]);
  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: hospital_id,
          reception_id: reception_id,
          patient_id: patient_id,
          appoint_id: appoint_id,
          api_type: 'OPD-OBSTETRICS-HISTORY',
          uhid: uhid,
          mobilenumber: mobilenumber,
        })
        .then(res => {
          setOpdAssessment(res.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('PersonalHistory');
          }}
        />
        <Appbar.Content title="Obstetrics History" />
      </Appbar.Header>
      <ScrollView vertical style={styles.container}>
        <View style={styles.card}>
          <View style={styles.card2}>
            <View style={styles.cardContent}>
              <Text style={styles.label}>G : </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp.G}
                onChangeText={text => {
                  setTemp(prevState => ({
                    ...prevState,
                    G: text,
                  }));
                }}
                editable={true}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>P : </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp.P}
                onChangeText={text => {
                  setTemp(prevState => ({
                    ...prevState,
                    P: text,
                  }));
                }}
                editable={true}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>L : </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp.L}
                onChangeText={text => {
                  setTemp(prevState => ({
                    ...prevState,
                    L: text,
                  }));
                }}
                editable={true}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>A : </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp.A}
                onChangeText={text => {
                  setTemp(prevState => ({
                    ...prevState,
                    A: text,
                  }));
                }}
                editable={true}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>D : </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp.D}
                onChangeText={text => {
                  setTemp(prevState => ({
                    ...prevState,
                    D: text,
                  }));
                }}
                editable={true}
                keyboardType="numeric"
              />
            </View>
          </View>
          <Divider />
          <RadioButton.Group
            onValueChange={newValue => setPregnant(newValue)}
            value={pregnant}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {width: 200}]}>Pregnant : </Text>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                  <Text>Yes</Text>
                  <RadioButton value="yes" />
                </View>
                <View style={styles.radioBtn}>
                  <Text>No</Text>
                  <RadioButton value="no" />
                </View>
              </View>
            </View>
          </RadioButton.Group>
          <RadioButton.Group
            onValueChange={newValue => setBreastFeeding(newValue)}
            value={breastFeeding}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {width: 200}]}>Breast Feeding :</Text>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                  <Text>Yes</Text>
                  <RadioButton value="yes" />
                </View>
                <View style={styles.radioBtn}>
                  <Text>No</Text>
                  <RadioButton value="no" />
                </View>
              </View>
            </View>
          </RadioButton.Group>
          <RadioButton.Group
            onValueChange={newValue => setConception(newValue)}
            value={conception}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {width: 200}]}>
                Planing to Conceive :
              </Text>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                  <Text>Yes</Text>
                  <RadioButton value="yes" />
                </View>
                <View style={styles.radioBtn}>
                  <Text>No</Text>
                  <RadioButton value="no" />
                </View>
              </View>
            </View>
          </RadioButton.Group>
          <Divider />
          <RadioButton.Group
            onValueChange={newValue => setContraception(newValue)}
            value={contraception}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {width: 200}]}>Contraception :</Text>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                  <Text>Yes</Text>
                  <RadioButton value="yes" />
                </View>
                <View style={styles.radioBtn}>
                  <Text>No</Text>
                  <RadioButton value="no" />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 60,
                }}>
                <Checkbox
                  status={pillsChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setpillsChecked(!pillsChecked);
                  }}
                />
                <Text style={styles.label}>Pill</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 90,
                }}>
                <Checkbox
                  status={injuctionChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setInjuctionChecked(!injuctionChecked);
                  }}
                />
                <Text style={styles.label}>Injuction</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 90,
                }}>
                <Checkbox
                  status={otherChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setOtherChecked(!otherChecked);
                  }}
                />
                <Text style={styles.label}>Other</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('PersonalHistory')}>
            Previous
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={submitTreatmenthandler}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('MenstrualHistory')}>
            Skip
          </Button>
        </View>
        {opdAssessment?.length > 0 && (
          <View style={[styles.categorySelection]}>
            <ScrollView horizontal={true} style={{padding: 10}}>
              <View style={{height: 'auto', maxHeight: 400}}>
                <Table
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                  <Row
                    data={keys3}
                    widthArr={widthArr2}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                </Table>
                <ScrollView vertical={true} style={styles.dataWrapper}>
                  <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                    <Rows
                      // data={tableData}
                      data={opdAssessment.map(row => [
                        row.g,
                        row.p,
                        row.l,
                        row.a,
                        row.d,
                        row.pregnant,
                        row.breastFeeding,
                        row.conception,
                        row.contraception,
                        row.pillsChecked,
                        row.injuctionChecked,
                        row.otherChecked,
                        `${row.opd_date} / ${row.opd_time}`,
                      ])}
                      widthArr={widthArr2}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ObstetricsHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  card: {
    borderWidth: 0.7,
    borderRadius: 6,
    marginBottom: 10,
    padding: 6,
    backgroundColor: '#ffffff',
  },
  cardContent: {
    flexDirection: 'column',
    padding: 5,
    width: '33%',
  },
  label: {
    fontWeight: '600',
    color: 'black',
    width: 100,
  },
  card2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'center', color: 'black', padding: 2},
  row: {height: 'auto'},
});

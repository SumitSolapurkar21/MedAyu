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

const MenstrualHistory = () => {
  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id, mobilenumber} = scannedPatientsData;

  const [temp, setTemp] = useState([]);
  const navigation = useNavigation();
  const [widthArr, setWidthArr] = useState([]);

  // radio states ...
  const [radioValues, setRadioValues] = useState({
    periods: '',
    qualityofbloodflow: '',
    painduringcycle: '',
  });

  const handleRadioChange = (name, value) => {
    setRadioValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const tableHead1 = [
    {
      key: 1,
      label: 'Menarche',
      content: (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 6,
              alignItems: 'center',
            }}>
            <Text style={[styles.label, {width: 'auto'}]}>Age : </Text>
            <TextInput
              mode="flat"
              style={[styles.input2]}
              value={temp['menarche_age'] ?? ''}
              onChangeText={text => {
                setTemp(prevState => ({
                  ...prevState,
                  menarche_age: text,
                }));
              }}
              editable={true}
              keyboardType="numeric"
            />
          </View>
        </>
      ),
    },
  ];
  const tableHead2 = [
    {
      key: 2,
      label: 'LMP',
      content: (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 6,
            }}>
            <TextInput
              mode="flat"
              style={[styles.input2, {width: '100%'}]}
              value={temp['lmp'] ?? ''}
              onChangeText={text => {
                setTemp(prevState => ({
                  ...prevState,
                  lmp: text,
                }));
              }}
              editable={true}
            />
          </View>
        </>
      ),
    },
  ];
  const tableHead3 = [
    {
      key: 3,
      label: 'Periods',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleRadioChange('periods', newValue)}
            value={radioValues.periods}>
            <View
              style={[
                styles.radioBtn,
                {marginHorizontal: 6, flexWrap: 'wrap'},
              ]}>
              <View style={styles.radioBtn}>
                <RadioButton value="regular" />
                <Text>Regular</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="irregular" />
                <Text>Irregular</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
  ];
  const tableHead4 = [
    {
      key: 4,
      label: 'Duration in days',
      content: (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 6,
            }}>
            <TextInput
              mode="flat"
              style={[styles.input2, {width: '100%'}]}
              value={temp['durations'] ?? ''}
              onChangeText={text => {
                setTemp(prevState => ({
                  ...prevState,
                  durations: text,
                }));
              }}
              editable={true}
              keyboardType="numeric"
            />
          </View>
        </>
      ),
    },
  ];
  const tableHead5 = [
    {
      key: 5,
      label: 'Quality of Blood Flow',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleRadioChange('qualityofbloodflow', newValue)
            }
            value={radioValues.qualityofbloodflow}>
            <View
              style={[
                styles.radioBtn,
                {flexWrap: 'wrap', marginHorizontal: 6},
              ]}>
              <View style={styles.radioBtn}>
                <RadioButton value="Scanty" />
                <Text>Scanty</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="Mod" />
                <Text>Mod</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="Heavy" />
                <Text>Heavy</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
  ];
  const tableHead6 = [
    {
      key: 6,
      label: 'Pain during cycle',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleRadioChange('painduringcycle', newValue)
            }
            value={radioValues.painduringcycle}>
            <View style={[styles.radioBtn, {marginHorizontal: 6}]}>
              <View style={styles.radioBtn}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="no" />
                <Text>No</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
  ];
  const tableHead7 = [
    {
      key: 7,
      label: 'Menopause',
      content: (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 6,
              alignItems: 'center',
            }}>
            <Text style={[styles.label, {width: 'auto'}]}>Age : </Text>
            <TextInput
              mode="flat"
              style={[styles.input2]}
              value={temp['menopause'] ?? ''}
              onChangeText={text => {
                setTemp(prevState => ({
                  ...prevState,
                  menopause: text,
                }));
              }}
              editable={true}
              keyboardType="numeric"
            />
          </View>
        </>
      ),
    },
  ];

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('ObstetricsHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setWidthArr([166, 166, ...Array(tableHead1.length - 1).fill(0)]);
  }, []);

  useEffect(() => {
    // Push radio button values to temp state array
    setTemp(prev => ({
      ...prev,
      ...radioValues,
    }));
  }, [radioValues]);

  //  submit handler ....
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: hospital_id,
      patient_id: patient_id,
      reception_id: reception_id,
      appoint_id: appoint_id,
      uhid: uhid,
      api_type: 'OPD-MENSTRUAL-HISTORY',
      opdmenstrualhistoryarray: [temp],
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            navigation.navigate('OpdVitals');
            setTemp([]);
            setRadioValues({});
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const [opdAssessment, setOpdAssessment] = useState([]);
  const keys3 = [
    'Menarche Age',
    'LMP',
    'Periods',
    'Durations',
    'Quality of Blood Flow',
    'Pain During Cycle',
    'Menopause Age',
    'Date / Time',
  ];
  const [widthArr2, setWidthArr2] = useState([]);
  useEffect(() => {
    setWidthArr2([
      120,
      120,
      150,
      120,
      120,
      120,
      120,
      120,
      ...Array(keys3.length).fill(2),
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
          api_type: 'OPD-MENSTRUAL-HISTORY',
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
            navigation.replace('ObstetricsHistory');
          }}
        />
        <Appbar.Content title="Menstrual History" />
      </Appbar.Header>

      {/*  */}
      <ScrollView vertical style={styles.container}>
        <ScrollView vertical={true}>
          <View>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: 'gray',
              }}>
              <Rows
                data={tableHead1?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead2?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead3?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead4?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead5?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead6?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead7?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
            </Table>
          </View>
        </ScrollView>
        {/* Group Buttons .....  */}
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('ObstetricsHistory')}>
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
            onPress={() => navigation.navigate('OpdVitals')}>
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
                        row.menarche_age,
                        row.lmp,
                        row.periods,
                        row.durations,
                        row.qualityofbloodflow,
                        row.painduringcycle,
                        row.menopause,
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

export default MenstrualHistory;

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
    flexDirection: 'row',
    padding: 5,
    //     width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    //     marginHorizontal: 6,
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
    marginTop: 10,
  },
  input2: {
    height: 40,
    width: '60%',
    backgroundColor: 'white',
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {
    textAlign: 'left',
    color: 'black',
    fontSize: 14,
    marginLeft: 6,
    backgroundColor: '#ffffff',
  },
  dataWrapper: {marginTop: -1},
  row: {
    height: 'auto',
    backgroundColor: '#ffffff',
    minHeight: 55,
  },
  cellText: {
    fontSize: 11,
    color: '#071bf5',
    marginLeft: 6,
  },
});

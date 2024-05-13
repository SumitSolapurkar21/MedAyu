import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import {Table, Row, Rows} from 'react-native-table-component';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const Listofpatients = () => {
  const navigation = useNavigation();
  const {
    setWaitingListData,
    dashboardpatientListData,
    userData,
    patientList,
    setPatientList,
  } = useContext(UserContext);

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('DashboardHomePage');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // fetch See_Mobile_Appointment_List ......
  useEffect(() => {
    See_Mobile_Appointment_List();
  }, [dashboardpatientListData]);

  const See_Mobile_Appointment_List = async () => {
    try {
      await axios
        .post(
          `${api.baseurl}/See_Mobile_Appointment_List`,
          dashboardpatientListData,
        )
        .then(response => {
          const {status, message} = response?.data;
          if (status === true) {
            const data = response.data.data;
            setPatientList(data);
          } else {
            Alert.alert('Response Error !', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };

  const wstatus = patientList[0]?.appoint_status;
  let tableHead;
  if (
    userData?.role === 'Receptionist' &&
    (wstatus === 'Waiting' || wstatus === 'Called' || wstatus === 'Consulted')
  ) {
    tableHead = [
      'SR.NO',
      'UHID',
      'NAME',
      'MOBILE',
      'GENDER',
      'DEPARTMENT',
      'DOCTOR',
      'ROOM',
      'DATE / TIME',
      'STATUS',
    ];
  } else if (
    (userData?.role === 'Doctor' && wstatus === 'Waiting') ||
    wstatus === 'Consulted'
  ) {
    tableHead = [
      'SR.NO',
      'UHID',
      'TOKEN',
      'NAME',
      'MOBILE',
      'GENDER',
      'DEPARTMENT',
      'DOCTOR',
      'ROOM',
      'DATE / TIME',
      'STATUS',
      'ACTION',
    ];
  } else if (wstatus === 'Confirmed') {
    tableHead = [
      'SR.NO',
      'UHID',
      'NAME',
      'MOBILE',
      'GENDER',
      'DEPARTMENT',
      'DOCTOR',
      'ROOM',
      'DATE / TIME',
      'STATUS',
      'CANCEL',
    ];
  } else if (wstatus === 'Cancelled') {
    tableHead = [
      'SR.NO',
      'UHID',
      'NAME',
      'MOBILE',
      'GENDER',
      'DEPARTMENT',
      'DOCTOR',
      'ROOM',
      'DATE / TIME',
      'STATUS',
    ];
  } else {
    tableHead = [
      'SR.NO',
      'UHID',
      'TOKEN',
      'NAME',
      'MOBILE',
      'GENDER',
      'DEPARTMENT',
      'DOCTOR',
      'ROOM',
      'DATE / TIME',
      'STATUS',
    ];
  }

  const [widthArr2, setWidthArr2] = useState([]);
  const [widthArr3, setWidthArr3] = useState([]);

  useEffect(() => {
    if (wstatus != undefined) {
      if (
        userData?.role === 'Receptionist' &&
        (wstatus === 'Waiting' ||
          wstatus === 'Called' ||
          wstatus === 'Consulted')
      ) {
        setWidthArr2([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          ...Array(tableHead.length).fill(0),
        ]);
        setWidthArr3([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          ...Array(patientList.length).fill(0),
        ]);
      } else if (
        userData?.role === 'Doctor' &&
        (wstatus === 'Waiting' ||
          wstatus === 'Called' ||
          wstatus === 'Consulted')
      ) {
        setWidthArr2([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          76,
          150,
          ...Array(tableHead.length).fill(0),
        ]);
        setWidthArr3([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          76,
          150,
          ...Array(patientList.length).fill(0),
        ]);
      } else if (wstatus === 'Confirmed') {
        setWidthArr2([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          76,
          ...Array(tableHead.length).fill(0),
        ]);
        setWidthArr3([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          76,
          ...Array(patientList.length).fill(0),
        ]);
      } else if (wstatus === 'Cancelled') {
        setWidthArr2([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          ...Array(tableHead.length).fill(0),
        ]);
        setWidthArr3([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          ...Array(patientList.length).fill(0),
        ]);
      } else {
        setWidthArr2([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          // 76,
          ...Array(tableHead.length).fill(0),
        ]);
        setWidthArr3([
          30,
          60,
          60,
          60,
          76,
          60,
          90,
          60,
          50,
          76,
          // 76,
          ...Array(patientList.length).fill(0),
        ]);
      }
    }
  }, [wstatus]);

  // cancel handler ......

  const cancelHandler = async (appointment_id, patient_id, uhid) => {
    try {
      await axios
        .post(`${api.baseurl}/CancelMobileAppointment`, {
          appointment_id: appointment_id,
          patient_id: patient_id,
          hospital_id: userData.hospital_id,
          reception_id: userData._id,
          role: userData.role,
          uhid: uhid,
        })
        .then(response => {
          const data = response?.data;
          const {status, message} = data;
          if (status === true) {
            Alert.alert('Success !!', `${message}`);
            See_Mobile_Appointment_List();
          } else {
            Alert.alert('Error !!', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };

  // ChangeMobileConfirmToWaiting ......
  const ChangeMobileConfirmToWaiting = async (
    appointment_id,
    _id,
    depart_id,
    doctor_id,
    uhid,
  ) => {
    const body = {
      appointment_id: appointment_id,
      patient_id: _id,
      depart_id: depart_id,
      doctor_id: doctor_id,
      uhid: uhid,
      hospital_id: userData.hospital_id,
      reception_id: userData._id,
      role: userData.role,
    };
    try {
      await axios
        .post(`${api.baseurl}/ChangeMobileConfirmToWaiting`, body)
        .then(response => {
          const data = response?.data;
          const {status, message} = data;
          if (status === true) {
            Alert.alert('Success !!', `${message}`);
            See_Mobile_Appointment_List();
          } else {
            Alert.alert('Error !!', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };

  // MobileCallToPatients api ....
  const MobileCallToPatients = async (appointment_id, patient_id, uhid) => {
    try {
      await axios
        .post(`${api.baseurl}/MobileCallToPatients`, {
          appointment_id: appointment_id,
          patient_id: patient_id,
          uhid: uhid,
          hospital_id: userData.hospital_id,
          reception_id: userData._id,
          role: userData.role,
        })
        .then(response => {
          const data = response?.data;
          const {status, message} = data;
          if (status === true) {
            Alert.alert('Success !!', `${message}`);
            See_Mobile_Appointment_List();
          } else {
            Alert.alert('Error !!', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };

  // MobileChangeWaitingToConsult api ....
  const MobileChangeWaitingToConsult = async data => {
    try {
      await axios
        .post(`${api.baseurl}/MobileChangeWaitingToConsult`, data)
        .then(response => {
          const data = response?.data;
          const {status, message} = data;
          if (status === true) {
            Alert.alert('Success !!', `${message}`);
          } else {
            Alert.alert('Error !!', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };
  // navigation page ....
  const navigationPage = (
    appointment_id,
    appoint_id,
    patient_id,
    depart_id,
    doctor_id,
    mobilenumber,
    assessment,
    uhid,
  ) => {
    const data = {
      appointment_id: appointment_id,
      appoint_id: appoint_id,
      newpatient_id: patient_id,
      depart_id: depart_id,
      doctor_id: doctor_id,
      mobilenumber: mobilenumber,
      assessmenttype: assessment,
      uhid: uhid,
      hospital_id: userData.hospital_id,
      reception_id: userData._id,
      role: userData.role,
    };
    MobileChangeWaitingToConsult(data);

    setWaitingListData(data);
    navigation.navigate('OpdComplaints');
  };

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: '#ebebeb',
        }}>
        <Appbar.BackAction
          onPress={() => navigation.replace('DashboardHomePage')}
        />
        <Appbar.Content title={'Patient List'} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.tableDiv}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.headtext2}>
              {dashboardpatientListData?.status === 'Confirmed'
                ? 'Appointment'
                : dashboardpatientListData?.status}
              &nbsp; List
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{height: 'auto', maxHeight: 400}}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Row
                  data={tableHead}
                  widthArr={widthArr2}
                  style={styles.head}
                  textStyle={styles.headtext}
                />
              </Table>
              <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                  <Rows
                    data={patientList?.map((item, index) => {
                      if (
                        (item.appoint_status === 'Waiting' ||
                          item.appoint_status === 'Called' ||
                          item.appoint_status === 'Consulted') &&
                        userData?.role === 'Receptionist'
                      ) {
                        return [
                          `${index + 1}`,
                          item.patientuniqueno,
                          // item.token,
                          item.appoint_status === 'Waiting' ||
                          item.appoint_status === 'Called' ||
                          item.appoint_status === 'Consulted' ? (
                            item.fullname || ''
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                ChangeMobileConfirmToWaiting(
                                  item.appointment_id,
                                  item._id,
                                  item.depart_id,
                                  item.doctor_id,
                                  item.patientuniqueno,
                                );
                              }}>
                              <Text style={[styles.text, {color: 'blue'}]}>
                                {item.fullname}
                              </Text>
                            </TouchableOpacity>
                          ),
                          item.mobilenumber,
                          item.patientgender,
                          item.deptname,
                          item.name,
                          item.roomno,
                          `${item.app_date} / ${item.slot_id}`,
                          item.appoint_status,
                        ];
                      } else if (
                        (item.appoint_status === 'Waiting' ||
                          item.appoint_status === 'Called' ||
                          item.appoint_status === 'Consulted') &&
                        userData?.role === 'Doctor'
                      ) {
                        return [
                          `${index + 1}`,
                          item.patientuniqueno,
                          item.token,
                          item.appoint_status === 'Waiting' ||
                          item.appoint_status === 'Called' ||
                          item.appoint_status === 'Consulted' ? (
                            item.fullname || ''
                          ) : (
                            <TouchableOpacity
                              onPress={() =>
                                ChangeMobileConfirmToWaiting(
                                  item.appointment_id,
                                  item._id,
                                  item.depart_id,
                                  item.doctor_id,
                                  item.patientuniqueno,
                                )
                              }>
                              <Text style={[styles.text, {color: 'blue'}]}>
                                {item.fullname}
                              </Text>
                            </TouchableOpacity>
                          ),
                          item.mobilenumber,
                          item.patientgender,
                          item.deptname,
                          item.name,
                          item.roomno,
                          `${item.app_date} / ${item.slot_id}`,
                          item.appoint_status,
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 10,
                              marginLeft: 10,
                            }}>
                            {(item.appoint_status === 'Waiting' ||
                              item.appoint_status === 'Called') &&
                            userData?.role === 'Doctor' ? (
                              <TouchableOpacity
                                onPress={() =>
                                  MobileCallToPatients(
                                    item.appointment_id,
                                    item._id,
                                    item.patientuniqueno,
                                  )
                                }
                                style={{
                                  alignSelf: 'center',
                                  borderColor: 'red',
                                  borderWidth: 1,
                                  borderRadius: 8,
                                  padding: 8,
                                }}>
                                <Text>Call</Text>
                              </TouchableOpacity>
                            ) : null}
                            <TouchableOpacity
                              onPress={() =>
                                navigationPage(
                                  item.appointment_id,
                                  item.appoint_id,
                                  item._id,
                                  item.depart_id,
                                  item.doctor_id,
                                  item.mobilenumber,
                                  'NewAssessment',
                                  item.patientuniqueno,
                                )
                              }
                              style={{
                                alignSelf: 'center',
                                borderColor: 'green',
                                borderWidth: 1,
                                borderRadius: 8,
                                padding: 8,
                              }}>
                              <Text>Consult</Text>
                            </TouchableOpacity>
                          </View>,
                        ];
                      } else {
                        return [
                          `${index + 1}`,
                          item.patientuniqueno,
                          item.appoint_status === 'Waiting' ? (
                            item.fullname || ''
                          ) : (
                            <TouchableOpacity
                              onPress={() =>
                                ChangeMobileConfirmToWaiting(
                                  item.appointment_id,
                                  item._id,
                                  item.depart_id,
                                  item.doctor_id,
                                  item.patientuniqueno,
                                )
                              }>
                              <Text style={[styles.text, {color: 'blue'}]}>
                                {item.fullname}
                              </Text>
                            </TouchableOpacity>
                          ),
                          item.mobilenumber,
                          item.patientgender,
                          item.deptname,
                          item.name,
                          item.roomno,
                          `${item.app_date} / ${item.slot_id}`,
                          item.appoint_status,
                          <TouchableOpacity
                            onPress={() =>
                              cancelHandler(
                                item.appointment_id,
                                item._id,
                                item.patientuniqueno,
                              )
                            }
                            style={{
                              alignSelf: 'center',
                              borderColor: 'red',
                              borderWidth: 1,
                              borderRadius: 20,
                              backgroundColor: 'red',
                            }}>
                            <FontAwesome6
                              name="circle-xmark"
                              color="white"
                              size={22}
                            />
                          </TouchableOpacity>,
                        ];
                      }
                    })}
                    widthArr={widthArr3}
                    style={[styles.row]}
                    textStyle={styles.text}
                  />
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  head: {height: 40, backgroundColor: '#80aaff'},
  headtext: {
    textAlign: 'left',
    color: 'white',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '600',
  },
  tableDiv: {
    padding: 10,
  },
  text: {textAlign: 'center', color: 'black', fontSize: 13},
  row: {
    height: 50,
  },
  headtext2: {
    fontSize: 16,
    color: '#127359',
    fontWeight: '600',
  },
});

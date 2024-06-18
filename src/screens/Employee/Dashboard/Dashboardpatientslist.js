import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import {Table, Row, Rows} from 'react-native-table-component';

const Dashboardpatientslist = ({route}) => {
  const {userData} = useContext(UserContext);
  const navigation = useNavigation();
  const {label, fromdate, todate} = route.params;
  const [patientsList, setPatientsList] = useState([]);
  const {width: screenWidth} = Dimensions.get('window');

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

  //table ...
  const [widthArr, setWidthArr] = useState([]);

  useEffect(() => {
    if (label === 'OPD') {
      setWidthArr([
        screenWidth * 0.08,
        screenWidth * 0.18,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.25,
        screenWidth * 0.21,
      ]);
    } else if (label === 'IPD') {
      setWidthArr([
        screenWidth * 0.08,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
      ]);
    } else if (label === 'ENQUIRY') {
      setWidthArr([
        screenWidth * 0.08,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.21,
        screenWidth * 0.26,
      ]);
    }
  }, []);

  let tableHead;
  {
    label === 'OPD'
      ? (tableHead = [
          'SR.NO',
          'UHID',
          'NAME',
          'MOBILE',
          'GENDER',
          'ROOM',
          'DATE / TIME',
          'STATUS',
        ])
      : label === 'IPD'
      ? (tableHead = [
          'SR.NO',
          'UHID',
          'NAME',
          'MOBILE',
          'GENDER',
          'CITY',
          'DATE / TIME',
        ])
      : label === 'ENQUIRY'
      ? (tableHead = [
          'SR.NO',
          'NAME',
          'MOBILE',
          'GENDER',
          'CITY',
          'MESSAGE',
          'DATE / TIME',
        ])
      : NULL;
  }

  useEffect(() => {
    See_Mobile_Appointment_count_List();
  }, []);

  const See_Mobile_Appointment_count_List = async () => {
    const body = {
      hospital_id: userData?.hospital_id,
      reception_id: userData?._id,
      fromdate: fromdate,
      todate: todate,
      status: label,
      role: userData?.role,
    };
    try {
      await axios
        .post(`${api.baseurl}/See_Mobile_Appointment_count_List`, body)
        .then(response => {
          const {data, status, message} = response.data;
          if (status === true) {
            setPatientsList(data);
          } else {
            Alert.alert('Info !!', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };
  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.BackAction
          onPress={() => navigation.navigate('DashboardHomePage')}
        />
        <Appbar.Content title={`${label} List`} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.tableDiv}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.headtext2}>Patients List</Text>
          </View>
          {label === 'OPD' ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flex: 1}}>
                <ScrollView horizontal>
                  <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                    <Row
                      data={tableHead}
                      widthArr={widthArr}
                      style={styles.head}
                      textStyle={styles.headtext}
                    />
                    <Rows
                      data={patientsList?.map((item, index) => {
                        return [
                          index + 1,
                          item.patientuniqueno,
                          item.firstname,
                          item.mobilenumber,
                          item.patientgender,
                          item.roomno,
                          `${item.app_date} / ${item.slot_id}`,
                          item.appoint_status,
                        ];
                      })}
                      widthArr={widthArr}
                      style={[styles.row]}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          ) : label === 'IPD' ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flex: 1}}>
                <ScrollView horizontal>
                  <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                    <Row
                      data={tableHead}
                      widthArr={widthArr}
                      style={styles.head}
                      textStyle={styles.headtext}
                    />
                    <Rows
                      data={patientsList?.map((item, index) => {
                        return [
                          index + 1,
                          item.patientuniqueno,
                          item.firstname,
                          item.mobilenumber,
                          item.patientgender,
                          item.cityname,
                          item.registerdate,
                        ];
                      })}
                      widthArr={widthArr}
                      style={[styles.row]}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          ) : label === 'ENQUIRY' ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flex: 1}}>
                <ScrollView horizontal>
                  <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                    <Row
                      data={tableHead}
                      widthArr={widthArr}
                      style={styles.head}
                      textStyle={styles.headtext}
                    />
                    <Rows
                      data={patientsList?.map((item, index) => {
                        return [
                          index + 1,
                          item.firstname,
                          item.mobilenumber,
                          item.patientgender,
                          item.cityname,
                          item.message,
                          `${item.enquiry_date} / ${item.enquiry_time}`,
                        ];
                      })}
                      widthArr={widthArr}
                      style={[styles.row]}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Dashboardpatientslist;

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
  text: {textAlign: 'left', color: 'black', fontSize: 13, marginLeft: 6},
  row: {
    height: 50,
  },
  headtext2: {
    fontSize: 16,
    color: '#127359',
    fontWeight: '600',
  },
});

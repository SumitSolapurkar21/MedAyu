import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import { Table, Row, Rows } from 'react-native-table-component';

const PatientDischargeSummary = () => {
  const navigation = useNavigation();
  const { userData, setSelectedPatientMobileNumber } = useContext(UserContext);
  const { _id, hospital_id } = userData;
  //

  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [_tableHead, _setTableHead] = useState([]);
  const [widthArr, setWidthArr] = useState([]);
  const [_widthArr, _setWidthArr] = useState([]);

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('Eipdoptions');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const _patientNameSelectionHandler = e => {
    setSelectedPatientMobileNumber(e);
    navigation.navigate('PatientDischargeHistory');
  };
  useEffect(() => {
    const _SeeDischargeSummaryList = async () => {
      try {
        await axios
          .post(`${api.baseurl}/SeeDischargeSummaryList`, {
            hospital_id: hospital_id,
            reception_id: _id,
          })
          .then(res => {
            const _data = res.data.data;
            if (_data?.length > 0) {
              const keys = [
                'SR.NO',
                'PATIENT NAME',
                'UHID',
                'IPD ID',
                'AGE',
                'SEX',
                'DEPARTMENT',
                'DOCTOR',
                'DISCHARGE TYPE',
                'INITIATION DATE TIME',
              ];
              setTableHead(keys);

              // DATA
              const values = _data.map((item, index) => {
                return [
                  `${index + 1}`,
                  <TouchableOpacity
                    onPress={() =>
                      _patientNameSelectionHandler(item.mobilenumber)
                    }>
                    <Text style={styles.cellText}>{item.firstname}</Text>
                  </TouchableOpacity>,
                  item.patientuniqueno,
                  item.ipno,
                  item.patientage,
                  item.patientgender,
                  item.deptname,
                  item.doctname,
                  item.patient_status,
                  `${item.initiated_date} / ${item.initiated_time}`,
                ];
              });
              setTableData(values);
              setWidthArr([
                30,
                100,
                100,
                100,
                40,
                60,
                100,
                100,
                100,
                100,
                ...Array(keys?.length - 1).fill(0),
              ]);
            }
          });
      } catch (error) {
        console.error(error);
      }
    };
    _SeeDischargeSummaryList();
  }, [_id, hospital_id]);

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('Eipdoptions');
          }}
        />
        <Appbar.Content
          title="Discharge Summary "
          style={styles.appbar_title}
        />
      </Appbar.Header>
      {/* section 1 */}
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
                <Rows
                  data={tableData}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    {
                      backgroundColor:
                        tableData?.length > 0 && tableData?.length - 1
                          ? 'white'
                          : 'red',
                    },
                  ]}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PatientDischargeSummary;

const styles = StyleSheet.create({
  appbar_title: {
    fontSize: 10,
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 10,
  },
  head: { height: 40, backgroundColor: '#80aaff' },
  text: { textAlign: 'left', color: 'black', fontSize: 11, marginLeft: 6 },
  dataWrapper: { marginTop: -1 },
  row: {
    height: 50,
  },
  cellText: {
    fontSize: 11,
    color: '#071bf5',
    marginLeft: 6,
  },
});

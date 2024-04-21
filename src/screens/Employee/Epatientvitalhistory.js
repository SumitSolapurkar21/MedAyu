import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, BackHandler} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';

const Epatientvitalhistory = () => {
  const navigation = useNavigation();
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Eipdoptions');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const {scannedPatientsData, userData} = useContext(UserContext);
  const {_id, hospital_id} = userData;
  const {patient_id} = scannedPatientsData;
  //   const [vitalHistoryData, setVitalHistoryData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [_tableHead, _setTableHead] = useState([]);
  const [widthArr, setWidthArr] = useState([]);
  const [_widthArr, _setWidthArr] = useState([]);

  useEffect(() => {
    vitalHistory();
  }, []);

  const vitalHistory = async () => {
    try {
      const res = await axios.post(`${api.baseurl}/FetchMobileVitalsHistory`, {
        reception_id: _id,
        hospital_id: hospital_id,
        patient_id: patient_id,
      });

      if (res.data.data.length > 0) {
        const _keys = ['Vitals', 'GCS'];
        const keys = [
          'DATE-TIME',
          'TEMP',
          'PULSE',
          'SPO2',
          'SYSTOLIC BP',
          'DIASTOLIC BP',
          'RESP. RATE',
          'E',
          'V',
          'M',
        ];

        setTableHead(keys);
        _setTableHead(_keys);

        const values = res.data.data.map((item, index) => {
          return [
            `${item.vital_date} / ${item.vital_time}`,
            item.p_temp,
            item.p_pulse,
            item.p_spo2,
            item.p_systolicbp,
            item.p_diastolicbp,
            item.p_rsprate,
            item.eyeopening,
            item.verbalResponse,
            item.motorResponse,
            ...Object.values(item).filter(
              (_, index) =>
                index !== keys.indexOf('vital_date') &&
                index !== keys.indexOf('vital_time') &&
                index !== keys.indexOf('p_temp') &&
                index !== keys.indexOf('p_pulse') &&
                index !== keys.indexOf('p_spo2') &&
                index !== keys.indexOf('p_systolicbp') &&
                index !== keys.indexOf('p_diastolicbp') &&
                index !== keys.indexOf('p_rsprate'),
            ),
          ];
        });

        setTableData(values);

        setWidthArr(Array(keys.length).fill(100));
        _setWidthArr([700, 300, ...Array(keys.length - 1).fill(0)]);
        setTableData(values);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
            <Row
              data={_tableHead}
              widthArr={_widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Rows
                data={tableData}
                widthArr={widthArr}
                style={[
                  styles.row,
                  {
                    backgroundColor:
                      tableData.length > 0 && tableData.length - 1
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'center', color: 'black'},
  dataWrapper: {marginTop: -1},
  row: {
    height: 50,
  },
});

export default Epatientvitalhistory;

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';
import {useNavigation} from '@react-navigation/native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Appbar} from 'react-native-paper';

const PatientDischargeInvestigation = ({route}) => {
  const navigation = useNavigation();
  const {userData} = useContext(UserContext);
  const patient_id = route?.params?.patient_id;
  const {_id, hospital_id} = userData.data[0];
  //table content ....
  const [tableData, setTableData] = useState([]);
  const [widthArr, setWidthArr] = useState([]);

  //table header .....
  const keys = ['Sr.No', 'Procedure Name', 'No. Of Procedure', 'Date / Time'];

  // to set width of table ......
  useEffect(() => {
    // Set a specific width for the 'Sr.No' column, and the same width for the rest
    setWidthArr([32, 120, 70, 120, ...Array(keys.length - 1).fill(0)]);
  }, []);

  //get patient treatment history ......
  useEffect(() => {
    _fetchprocedurehistory();
  }, [hospital_id, patient_id, _id]);

  const _fetchprocedurehistory = async () => {
    try {
      const res = await axios.post(`${api.baseurl}/GetPreprocedureHistory`, {
        hospital_id: hospital_id,
        patient_id: patient_id,
        reception_id: _id,
        procedurestatus: false,
        api_type: 'PRESCRIPTIONDONE',
      });

      const {status, message, data} = res.data;
      console.log('data : ', data);
      if (status === true) {
        const dataArray = data.map((res, index) => [
          index + 1,
          res.procedurename,
          res.noofprocedure,
          `${res.dateadd} / ${res.timeadd}`,
        ]);
        setTableData(dataArray);
      } else {
        console.error(`${message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // table ....
  const _procedureTable = () => {
    return (
      <>
        <ScrollView horizontal={false} style={{padding: 10}}>
          <View style={{height: 'auto'}}>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: 'gray',
              }}>
              <Row
                data={keys}
                widthArr={widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView
              vertical
              style={styles.dataWrapper}
              nestedScrollEnabled={true}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={tableData}
                  widthArr={widthArr}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </>
    );
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
        <Appbar.Content title="Investigation History " />
      </Appbar.Header>
      <View style={styles.container}>{_procedureTable()}</View>
    </>
  );
};

export default PatientDischargeInvestigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    marginHorizontal: 14,
    borderWidth: 0.8,
    borderColor: '#000',
    borderRadius: 6,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'left', color: 'black', marginLeft: 10, fontSize: 12},
  dataWrapper: {marginTop: -1},
  row: {height: 45},
});

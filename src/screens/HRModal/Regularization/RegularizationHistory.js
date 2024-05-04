import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import api from '../../../../api.json';

//image ...
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import {Table, Row, Rows} from 'react-native-table-component';

const RegularizationHistory = () => {
  const {userData} = useContext(UserContext);
  const [regPendingData, setRegPendingData] = useState([]);
  const [widthArr, setWidthArr] = useState([]);

  const keys = [
    'SR.NO',
    'REGULARIZED DATE',
    'FROM',
    'TO',
    'REASON',
    'REMARK',
    'APPLIED DATE',
    'STATUS',
    'APPROVED BY',
  ];

  useEffect(() => {
    setWidthArr([
      40,
      100,
      80,
      60,
      100,
      80,
      80,
      100,
      100,
      ...Array(keys.length).fill(0),
    ]);
  }, []);

  useEffect(() => {
    if (userData) {
      Get_mobile_regularizes_pending_details();
    }
  }, [userData]);

  // pending api ...
  const Get_mobile_regularizes_pending_details = async () => {
    const body = {
      hospital_id: userData?.hospital_id,
      reception_id: userData?._id,
      status: 'Approved',
    };
    try {
      await axios
        .post(`${api.baseurl}/get_mobile_regularizes_pending_details`, body)
        .then(response => {
          const {message, status} = response.data;
          if (status === true) {
            setRegPendingData(response.data.data);
            console.log(response.data.data);
          } else {
            Alert.alert('Error !!', message);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', error);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>History Regularization</Text>
        </View>

        <View>
          <ScrollView horizontal={true}>
            <View style={{height: 'auto', maxHeight: 400}}>
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
              <ScrollView vertical={true} style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                  <Rows
                    // data={tableData}
                    data={regPendingData.map((row, index) => [
                      index + 1,
                      row.regularized_date,
                      row.regularized_fromtime,
                      row.regularized_totime,
                      row.regularized_reason,
                      row.regularized_remarks,
                      row.regularized_apply_date,
                      row.status,
                      row.approvalname,
                    ])}
                    widthArr={widthArr}
                    style={styles.row}
                    textStyle={styles.text2}
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

export default RegularizationHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    marginVertical: 10,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },

  head: {height: 40, backgroundColor: '#80aaff'},
  text: {
    textAlign: 'left',
    color: '#ffffff',
    padding: 2,
    marginLeft: 10,
    fontSize: 12,
  },
  text2: {
    textAlign: 'left',
    color: 'black',
    padding: 8,
    fontSize: 12,
  },
  row: {height: 'auto'},
});

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';

const PendingLeaves = () => {
  const {userData} = useContext(UserContext);
  const [pendingData, setPendingData] = useState([]);
  const tableHead = [
    'Sr.No',
    'Category',
    'Leave Type',
    'From Date',
    'To Date',
    'Applying For',
    'Reason',
    'Applied Date',
    'Status',
  ];
  useEffect(() => {
    const _fetchPendingLeaves = async () => {
      try {
        await axios
          .post(`${api.baseurl}/FetchMobilePendingApprovedLeaves`, {
            user_id: userData?._id,
            leave_status: 'Pending',
          })
          .then(res => {
            setPendingData(res.data.data);
          });
      } catch (error) {
        console.error('error : ', error);
      }
    };

    _fetchPendingLeaves();
  }, [userData]);
  const [widthArr, setWidthArr] = useState([]);
  useEffect(() => {
    setWidthArr([
      50,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      ...Array(tableHead.length - 1).fill(1),
    ]);
  }, []);
  return (
    <View>
      <Text style={styles.heading}>Pending Leaves</Text>
      <View style={[styles.categorySelection]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{padding: 10}}>
          <View style={{height: 'auto', maxHeight: 400}}>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: 'gray',
              }}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView vertical={true} style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={pendingData.map((row, index) => [
                    index + 1,
                    'Leave',
                    row.leavetype,
                    row.leavefrom_date,
                    row.leaveto_date,
                    row.leave_from,
                    row.leavereason,
                    row.applydate,
                    row.leave_status,
                  ])}
                  widthArr={widthArr}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PendingLeaves;

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#80aaff'},
  headtext: {
    textAlign: 'left',
    color: 'white',
    fontSize: 18,
    marginLeft: 6,
    fontWeight: '600',
  },
  text: {
    textAlign: 'left',
    color: 'black',
    fontSize: 14,
    marginLeft: 6,
  },
  dataWrapper: {marginTop: -1},
  row: {
    height: 'auto',
  },
  cellText: {
    fontSize: 11,
    color: '#071bf5',
    marginLeft: 6,
  },
  tableDiv: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    padding: 8,
  },
  message: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';

const HistoryLeaves = () => {
  const {userData} = useContext(UserContext);
  const [historyData, setHistoryData] = useState([]);
  const tableHead = [
    'Sr.No',
    'Category',
    'Leave Type',
    'From Date',
    'To Date',
    'Applying For',
    'Reason',
    'Applied Date',
    'Approved , Rejected By',
    'Status',
  ];
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
      100,
      ...Array(tableHead.length - 1).fill(1),
    ]);
  }, []);
  useEffect(() => {
    const _fetchHistoryLeaves = async () => {
      await axios
        .post(`${api.baseurl}/FetchMobilePendingApprovedLeaves`, {
          user_id: userData?._id,
          leave_status: 'Approved',
        })
        .then(res => {
          setHistoryData(res.data.data);
        });
    };

    _fetchHistoryLeaves();
  }, [userData]);
  return (
    <View>
      <Text style={styles.heading}>History Leaves</Text>
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
                  data={historyData.map((row, index) => [
                    index + 1,
                    'Leave',
                    row.leavetype,
                    row.leavefrom_date,
                    row.leaveto_date,
                    row.leave_from,
                    row.leavereason,
                    row.applydate,
                    row.approvalname,
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

export default HistoryLeaves;

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#80aaff'},
  headtext: {
    textAlign: 'left',
    color: 'white',
    fontSize: 18,
    marginLeft: 6,
    fontWeight: '600',
  },
  text: {textAlign: 'left', color: 'black', fontSize: 14, marginLeft: 6},
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
});

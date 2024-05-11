import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import api from '../../../api.json';
import axios from 'axios';
import UserContext from '../Context/Context';
import {Table, Row, Rows} from 'react-native-table-component';

const ExpensesStatuswiseList = value => {
  const {userData} = useContext(UserContext);
  const [expensesDataPending, setExpensesDataPending] = useState([]);
  const [expensesDataApproved, setExpensesDataApproved] = useState([]);
  //table ...
  const {width: screenWidth} = Dimensions.get('window');
  const [widthArr, setWidthArr] = useState([]);
  useEffect(() => {
    fetchPending_Mobile_Expenses_Form();
  }, [value.value]);

  useEffect(() => {
    if (value?.value === 'Pending') {
      setWidthArr([
        screenWidth * 0.08,
        screenWidth * 0.25,
        screenWidth * 0.18,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
      ]);
    } else if (value?.value === 'Approved') {
      setWidthArr([
        screenWidth * 0.08,
        screenWidth * 0.25,
        screenWidth * 0.18,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
        screenWidth * 0.25,
      ]);
    }
  }, [value.value]);

  let tableHead;
  {
    value?.value === 'Pending'
      ? (tableHead = [
          'SR.NO',
          'CATEGORY',
          'REQUEST AMOUNT',
          'MONTHLY AMOUNT',
          'DUE DATE',
          'PAYEE',
          'PAYMENT MODE',
          'TRANSACTION DETAIL',
          'APPLIED DATE / TIME',
          'STATUS',
        ])
      : value?.value === 'Approved'
      ? (tableHead = [
          'SR.NO',
          'CATEGORY',
          'REQUEST AMOUNT',
          'MONTHLY AMOUNT',
          'DUE DATE',
          'PAYEE',
          'PAYMENT MODE',
          'TRANSACTION DETAIL',
          'APPLIED DATE / TIME',
          'APPROVED BY',
          'STATUS',
          'APPROVED DATE / TIME',
        ])
      : null;
  }

  const fetchPending_Mobile_Expenses_Form = async () => {
    const body = {
      hospital_id: userData?.hospital_id,
      reception_id: userData?._id,
      status: value?.value,
    };
    try {
      await axios
        .post(`${api.baseurl}/Pending_Mobile_Expenses_Form`, body)
        .then(response => {
          const {data, status, message} = response.data;
          if (status === true) {
            if (value?.value === 'Pending') setExpensesDataPending(data);
            else if (value?.value === 'Approved') setExpensesDataApproved(data);
          } else {
            setExpensesDataPending([]);
            setExpensesDataApproved([]);
            Alert.alert('Info !!', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };
  return (
    <View style={styles.tableDiv}>
      <View style={{marginBottom: 10}}>
        <Text style={styles.headtext2}>{value?.value} Expenses</Text>
      </View>
      {value?.value === 'Pending' ? (
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
                  data={
                    expensesDataPending.length > 0 &&
                    value?.value === 'Pending' &&
                    expensesDataPending?.map((item, index) => {
                      return [
                        index + 1,
                        item.category,
                        item.amount,
                        item.fixedmonthamount,
                        item.duedate,
                        item.payee,
                        item.modeofpayment,
                        item.transactiondetails,
                        `${item.adddate} / ${item.addtime}`,
                        item.status,
                      ];
                    })
                  }
                  widthArr={widthArr}
                  style={[styles.row]}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      ) : value?.value === 'Approved' ? (
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
                  data={
                    value?.value === 'Approved' &&
                    expensesDataApproved?.map((item, index) => {
                      return [
                        index + 1,
                        item.category,
                        item.amount,
                        item.fixedmonthamount,
                        item.duedate,
                        item.payee,
                        item.modeofpayment,
                        item.transactiondetails,
                        `${item.adddate} / ${item.addtime}`,
                        item.approved_by,
                        item.status,

                        `${item.approved_date} / ${item.approved_time}`,
                      ];
                    })
                  }
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
  );
};

export default ExpensesStatuswiseList;

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#80aaff'},
  headtext: {
    textAlign: 'left',
    color: 'white',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '600',
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

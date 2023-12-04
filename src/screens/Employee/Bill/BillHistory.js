import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import api from '../../../../api.json';
import Pdf from '../../../components/Pdf/Pdf';

const BillHistory = ({route}) => {
  const {uhid, patient_id, reception_id, hospital_id} = route.params;
  //   console.log(uhid, patient_id, reception_id, hospital_id);
  const [billPatientHistory, setBillPatientHistory] = useState([]);

  useEffect(() => {
    try {
      const patientBillHistory = async () => {
        await axios
          .post(`${api.baseurl}/GetMobileBillHistory`, {
            uhid: uhid,
            patient_id: patient_id,
            reception_id: reception_id,
            hospital_id: hospital_id,
            historytype: 'Personal',
          })
          .then(res => {
            setBillPatientHistory(res.data);
            return res.data;
          });
      };
      patientBillHistory();
    } catch (error) {
      console.log('Error :', error);
    }
  }, []);

  let historyArray = billPatientHistory?.HistoryArray;
  console.log(historyArray);
  return (
    <SafeAreaView style={styles.container}>
      {/* Patient Detail... */}
      <View style={styles.card}>
        <View style={styles.main}>
          <View style={styles.pDetail}>
            <Text style={styles.pData}>{billPatientHistory?.fullname} </Text>
            <Text style={[styles.pData, {fontWeight: 'normal'}]}>
              <FontAwesome6 name="phone" color="#1669f0" size={11} />
              &nbsp;
              {billPatientHistory?.mobilenumber}{' '}
            </Text>
          </View>
          <View style={styles.pDetail}>
            <Text style={[styles.pLabel, {color: '#04c227'}]}>
              <FontAwesome6 name="arrow-trend-down" color="#04c227" size={14} />
              &nbsp;Receivable &nbsp;&nbsp;
              <FontAwesome6
                name="indian-rupee-sign"
                color="#04c227"
                size={12}
              />
              &nbsp;{billPatientHistory?.totalreceived} &nbsp;&nbsp;
            </Text>
            <Text style={[styles.pLabel, {color: 'red'}]}>
              <FontAwesome6 name="arrow-trend-down" color="red" size={14} />
              &nbsp;Balance &nbsp;&nbsp;
              <FontAwesome6 name="indian-rupee-sign" color="red" size={12} />
              &nbsp;{billPatientHistory?.totalbalance} &nbsp;&nbsp;
            </Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={styles.cardGrpBtn}
            onPress={() =>
              ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
            }>
            <FontAwesome6 name="bell" color="#1669f0" size={16} />
            <Text style={styles.cardGrpTxt}>Send Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardGrpBtn}
            onPress={() =>
              ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
            }>
            <FontAwesome6 name="list-alt" color="#1669f0" size={16} />
            <Text style={styles.cardGrpTxt}>Send Statement</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Search Patient Data.... */}
      <View style={styles.card}>
        <View
          style={[
            styles.ttAmtTxt,
            {
              borderColor: 'orange',
              borderWidth: 2,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
              //     width: 70,
            },
          ]}>
          <TextInput
            style={{padding: 6}}
            placeholder="Search"
            autoComplete="off"
          />
        </View>
      </View>
      {/* Patient Bills... */}
      {historyArray?.length > 0 &&
        historyArray?.map((res, i) => {
          return (
            <View style={[styles.card, {marginVertical: 6}]} key={i}>
              <View style={styles.cardBody}>
                <View>
                  <Text style={[styles.pData, {fontSize: 16}]}>Sale</Text>
                </View>
                <View>
                  <Text style={styles.pData}>
                    Invoice No : &nbsp; <Text>{res.invoiceno}</Text>
                  </Text>
                  <Text style={styles.pData}>
                    Date : &nbsp; <Text>{res.mobilepaymentdate}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.cardFooter2}>
                <View>
                  <Text style={[styles.pData1, {color: '#04c227'}]}>Total</Text>
                  <Text style={styles.pData}>
                    <FontAwesome6 name="indian-rupee-sign" size={12} />
                    &nbsp;{res.totalamount}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.pData1, {color: 'red'}]}>Balance</Text>
                  <Text style={styles.pData}>
                    <FontAwesome6 name="indian-rupee-sign" size={12} />
                    &nbsp;{res.totalbalance}
                  </Text>
                </View>
                <View style={styles.grpShare}>
                  <Pdf
                    patient_id={patient_id}
                    hospital_id={hospital_id}
                    bill_id={res.bill_id}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
                    }>
                    <FontAwesome6 name="share" color="#1669f0" size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
                    }>
                    <FontAwesome6
                      name="ellipsis-vertical"
                      color="#1669f0"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
    </SafeAreaView>
  );
};

export default BillHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3eeff',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  main: {
    borderBottomWidth: 1,
    borderBottomColor: '#edeef0',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pDetail: {
    padding: 8,
    //     flexDirection: 'row',
  },
  pLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#02fa23',
  },
  pData: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 12,
  },
  cardGrpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardGrpTxt: {
    color: '#1669f0',
  },
  grpShare: {
    flexDirection: 'row',
    gap: 14,
  },
  cardFooter2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  pData1: {
    fontWeight: '600',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
});

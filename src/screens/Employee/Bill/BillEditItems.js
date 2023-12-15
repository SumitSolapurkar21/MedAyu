import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';

const BillEditItems = ({route}) => {
  const navigation = useNavigation();
  const [billEditPatientData, setBillEditPatientData] = useState(null);
  const [receivedAmt, setReceivedAmt] = useState('');
  const [discountAmt, setDiscountAmt] = useState('');
  const [discountAmtRs, setDiscountAmtRs] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const {patientsData} = useContext(UserContext);
  const {uhid, patient_id, reception_id, hospital_id} = patientsData;
  const {bill_id} = route.params;

  useEffect(() => {
    try {
      const patientEditBillData = async () => {
        const response = await axios.post(`${api.baseurl}/GenerateBillPdf`, {
          patient_id: patient_id,
          hospital_id: hospital_id,
          bill_id: bill_id,
        });
        if (response.data) {
          setBillEditPatientData(response.data);
          console.log('res.data', response.data);
        } else {
          console.log('Error: Response data is undefined');
        }
      };
      patientEditBillData();
    } catch (error) {
      console.log('Error:', error);
    }
  }, [bill_id]);

  console.log('billEditPatientData : ', billEditPatientData);
  //   const {amount, outbillingtype} = billEditPatientData?.OutBillArrayss[0];
  //   console.log('first : ', amount, outbillingtype);

  let today = new Date();
  let currentDate =
    today.getDate().toString().padStart(2, '0') +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getFullYear();

  let date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getDate().toString().padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical showsVerticalScrollIndicator={true}>
        <View style={styles.mainHead}>
          <View style={styles.main}>
            <View>
              <Text style={{color: 'black'}}>Invoice No.</Text>
              <Text>{billEditPatientData?.invoiceno}</Text>
            </View>
            <View>
              <Text style={{color: 'black', textAlign: 'left'}}>Date</Text>
              <Text>{currentDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.text}>
            <Text>{billEditPatientData?.patientname}</Text>
          </View>
          <View style={styles.title}>
            <FontAwesome6 name="angle-down" color="#ffffff" size={16} />
            <Text style={{color: 'white'}}>Bill Items</Text>
          </View>
          {/* Bill card */}
          <ScrollView vertical>
            {billEditPatientData && (
              <View style={styles.billDiv}>
                <View style={styles.billContent}>
                  <Text
                    style={[
                      styles.billTxt,
                      {fontWeight: 'bold', fontSize: 14},
                    ]}>
                    #1. {billEditPatientData?.OutBillArrayss[0]?.outbillingtype}
                  </Text>
                  <Text
                    style={[
                      styles.billTxt,
                      {fontWeight: 'bold', fontSize: 14},
                    ]}>
                    <FontAwesome6
                      name="indian-rupee-sign"
                      color="black"
                      size={12}
                    />
                    &nbsp;
                    {billEditPatientData?.OutBillArrayss[0]?.amount}
                  </Text>
                </View>
                <View style={styles.billContent}>
                  <Text style={styles.billTxt}>Item Subtotal</Text>
                  <Text style={styles.billTxt}>
                    1 x {billEditPatientData?.OutBillArrayss[0]?.amount} =
                    &nbsp;
                    <FontAwesome6
                      name="indian-rupee-sign"
                      color="black"
                      size={10}
                    />
                    &nbsp;
                    {billEditPatientData?.OutBillArrayss[0]?.amount}
                  </Text>
                </View>
                <View style={styles.billContent}>
                  <Text style={[styles.billTxt, {color: 'orange'}]}>
                    Discount(%) : 0
                  </Text>
                  <Text style={[styles.billTxt, {color: 'orange'}]}>
                    <FontAwesome6
                      name="indian-rupee-sign"
                      color="orange"
                      size={10}
                    />
                    &nbsp;0
                  </Text>
                </View>
                <View style={styles.billContent}>
                  <Text style={styles.billTxt}>Tax : 0 %</Text>
                  <Text style={styles.billTxt}>
                    <FontAwesome6
                      name="indian-rupee-sign"
                      color="black"
                      size={10}
                    />
                    &nbsp;0
                  </Text>
                </View>
                <View style={styles.billContent}>
                  <Text
                    style={[
                      styles.billTxt,
                      {fontSize: 14, fontWeight: 'bold'},
                    ]}>
                    {billEditPatientData?.OutBillArrayss[0]?.billname}
                  </Text>
                </View>
                <View style={styles.billContent}>
                  <Text style={styles.billTxt}>Date</Text>
                  <Text style={styles.billTxt}>
                    {billEditPatientData?.invoicedate}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Bill Amount Card */}
          <View style={styles.ttAmtDiv}>
            <View style={styles.ttAmt}>
              <Text style={styles.ttAmtlabel}>Total Amount</Text>
              <View style={styles.amt}>
                <FontAwesome6
                  name="indian-rupee-sign"
                  color="black"
                  size={12}
                />
                <Text style={styles.ttAmtTxt}>
                  {billEditPatientData?.totalamount}
                </Text>
              </View>
            </View>
            <View style={styles.ttAmt}>
              <Text style={styles.ttAmtlabel}>Received</Text>
              <View style={styles.amt}>
                <FontAwesome6
                  name="indian-rupee-sign"
                  color="black"
                  size={12}
                />
                <TextInput
                  style={[styles.ttAmtTxt, {paddingBottom: 0}]}
                  placeholder="0.0"
                  autoComplete="off"
                  keyboardType="numeric"
                  textAlign="right"
                  value={billEditPatientData?.receiveamount || receivedAmt}
                  onChangeText={e => setReceivedAmt(e)}
                />
              </View>
            </View>
            <View style={styles.ttAmt}>
              <Text style={[styles.ttAmtlabel, {color: '#15cf84'}]}>
                Balance Due
              </Text>
              <View style={[styles.amt, {borderBottomWidth: 0}]}>
                <FontAwesome6
                  name="indian-rupee-sign"
                  color="black"
                  size={12}
                />
                <Text style={[styles.ttAmtTxt, {color: '#15cf84'}]}>
                  {billEditPatientData?.previous_balance}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillEditItems;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    paddingBottom: 12,
  },
  mainHead: {borderBottomWidth: 0.2, paddingBottom: 8},
  main: {
    flexDirection: 'row',
    marginHorizontal: 50,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  body: {
    marginVertical: 14,
  },
  text: {
    borderWidth: 0.5,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 4,
    marginBottom: 16,
  },
  title: {
    padding: 6,
    marginHorizontal: 20,
    borderRadius: 6,
    paddingBottom: 8,
    backgroundColor: '#42c4fc',
    flexDirection: 'row',
    gap: 10,
  },
  billDiv: {
    backgroundColor: '#e6e7e8',
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 6,
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
  },
  billContent: {
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  billTxt: {
    fontSize: 12,
    color: 'black',
  },
  billGrpBtn: {
    marginHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billAdd: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderColor: '#e6e7e8',
    borderWidth: 2,
    padding: 6,
    borderRadius: 6,
    flex: 0.99,
  },
  billScan: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderColor: '#e6e7e8',
    borderWidth: 2,
    padding: 4,
    borderRadius: 6,
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 38,
    height: 40,
  },
  billSum: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 6,
    // padding: 12,
  },
  billTxt2: {
    borderWidth: 2,
    borderColor: 'orange',
    padding: 6,
  },
  ttAmtDiv: {
    backgroundColor: '#e6e7e8',
    padding: 10,
  },
  ttAmt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignItems: 'center',
  },
  ttAmtlabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  ttAmtTxt: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  amt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: 'black',
    borderStyle: 'dotted',
    borderBottomWidth: 2,
    width: 100,
    paddingBottom: 0,
  },
  submitBtn: {
    alignSelf: 'center',
    backgroundColor: '#4ea5fc',
    padding: 10,
    width: '100%',
  },
  submitBtnTxt: {
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  billScroll: {
    height: 220,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Light black background
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

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
import React, {useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {Switch} from 'react-native-switch';
import barcode from '../../../images/barcode.png';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import api from '../../../../api.json';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BillLayout = ({route}) => {
  const navigation = useNavigation();
  const [toggleValue, setToggleValue] = useState(true);
  const {uhid, patient_id, reception_id, hospital_id} = route.params;
  const [billPatientData, setBillPatientData] = useState(null);
  const [receivedAmt, setReceivedAmt] = useState('');
  const [discountAmt, setDiscountAmt] = useState('');
  const [discountAmtRs, setDiscountAmtRs] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const storeData = async () => {
    await AsyncStorage?.setItem(
      'userToken',
      JSON.stringify({res: route.params}),
    );
  };
  // console.log('storeData : ', storeData);
  useEffect(() => {
    storeData();
    try {
      const patientBillData = async () => {
        setLoading(true);
        await axios
          .post(`${api.baseurl}/GetAllBillsForMobile`, {
            uhid: uhid,
            patient_id: patient_id,
            reception_id: reception_id,
            hospital_id: hospital_id,
          })
          .then(res => {
            setBillPatientData(res.data);
            // console.log('res.data', res);
            return res.data;
          })
          .finally(() =>
            setTimeout(() => {
              setLoading(false);
            }, 3000),
          );
      };
      patientBillData();
    } catch (error) {
      console.log('Error :', error);
      setLoading(false);
    }
  }, []);

  let totalAmtAfterDiscountPercent =
    billPatientData?.totalamount -
    (billPatientData?.totalamount * discountAmt ?? 0) / 100;

  let totalAmtAfterDiscountRupees =
    billPatientData?.totalamount - discountAmtRs ?? 0;

  let TOTAL_AMOUNT =
    discountAmtRs == ''
      ? totalAmtAfterDiscountPercent
      : totalAmtAfterDiscountRupees;

  let totalbalanceTemp = TOTAL_AMOUNT - receivedAmt;

  let totalbalance = parseInt(billPatientData?.totalbalance + totalbalanceTemp);
  let previousbalance = parseInt(billPatientData?.totalbalance);

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

  const addMobileBillHandler = async () => {
    try {
      const billDataRes = await axios.post(`${api.baseurl}/AddMobileBills`, {
        uhid: uhid,
        patient_id: patient_id,
        reception_id: reception_id,
        hospital_id: hospital_id,
        invoiceno: billPatientData?.invoiceno,
        totalamount: billPatientData?.totalamount,
        totalbalance: totalbalance,
        OutBillArrayss: billPatientData?.data,
        mobilepaymentdate: date,
        mobilediscountpercentage: discountAmt,
        mobilediscountrupees: discountAmtRs,
        mobilereceiveamount: receivedAmt,
      });
      return billDataRes;
    } catch (error) {
      console.error(error);
    }
  };

  // console.log('res.data : ', billPatientData.data[0].bill_id);

  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={70}
            style={styles.activityIndicator}
          />
        </View>
      )}
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              gap: 14,
              alignItems: 'center',
              padding: 10,
            }}>
            {/* <FontAwesome6
              name="arrow-left-long"
              color="#127359"
              size={28}
              onPress={() => navigation.navigate('EpatientDetails')}
            /> */}
            <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
              Patient Bill
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <Switch
              value={toggleValue}
              onValueChange={() => setToggleValue(!toggleValue)}
              activeText={'Cash'}
              inActiveText={'Credit'}
              switchWidthMultiplier={3.5}
              circleSize={20}
            />
          </View>
        </View>
        <ScrollView vertical showsVerticalScrollIndicator={true}>
          <View style={styles.mainHead}>
            <View style={styles.main}>
              <View>
                <Text style={{color: 'black'}}>Invoice No.</Text>
                <Text>{billPatientData?.invoiceno}</Text>
              </View>
              <View>
                <Text style={{color: 'black', textAlign: 'left'}}>Date</Text>
                <Text>{currentDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.text}>
              <Text>{billPatientData?.fullname}</Text>
            </View>
            <View style={styles.title}>
              <FontAwesome6 name="angle-down" color="#ffffff" size={16} />
              <Text style={{color: 'white'}}>Bill Items</Text>
            </View>
            <ScrollView vertical>
              {billPatientData?.status === false
                ? ToastAndroid.show(
                    `${billPatientData?.message}`,
                    ToastAndroid.SHORT,
                  )
                : billPatientData?.data.map((res, i) => {
                    return (
                      <View style={styles.billDiv} key={i}>
                        <View style={styles.billContent}>
                          <Text
                            style={[
                              styles.billTxt,
                              {fontWeight: 'bold', fontSize: 14},
                            ]}>
                            #{res.srno}. {res.outbillingtype}
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
                            &nbsp;{res.amount}
                          </Text>
                        </View>
                        <View style={styles.billContent}>
                          <Text style={styles.billTxt}>Item Subtotal</Text>
                          <Text style={styles.billTxt}>
                            1 x {res.amount} = &nbsp;
                            <FontAwesome6
                              name="indian-rupee-sign"
                              color="black"
                              size={10}
                            />
                            &nbsp;{res.amount}
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
                            {res.billname}
                          </Text>
                        </View>
                        <View style={styles.billContent}>
                          <Text style={styles.billTxt}>Date</Text>
                          <Text style={styles.billTxt}>{res.bill_date}</Text>
                        </View>
                      </View>
                    );
                  })}
            </ScrollView>

            <View style={styles.billGrpBtn}>
              <TouchableOpacity
                style={styles.billAdd}
                onPress={() =>
                  navigation.navigate('BillAddItems', {
                    bill_id: billPatientData.data[0].bill_id,
                  })
                }>
                <FontAwesome6 name="circle-plus" color="#3763ae" size={16} />
                <Text
                  style={{color: '#3763ae', fontWeight: 'bold', fontSize: 14}}>
                  Add Items
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.billScan}
                onPress={() =>
                  ToastAndroid.show(
                    'Comming Soon',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                  )
                }>
                <Image source={barcode} alt="barcode" style={styles.img} />
              </TouchableOpacity>
            </View>
            <View style={styles.billSum}>
              <View
                style={[
                  styles.billContent,
                  {
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    padding: 10,
                  },
                ]}>
                <Text style={[styles.billTxt, {fontWeight: 'bold'}]}>
                  Discount
                </Text>
              </View>
              <View style={[styles.billContent, {marginTop: 6, padding: 10}]}>
                <Text style={[styles.billTxt, {fontSize: 16, marginBottom: 8}]}>
                  Discount
                </Text>
                <View style={{flexDirection: 'row', gap: 6}}>
                  <View style={[styles.billContent, {gap: 0}]}>
                    <View
                      style={[
                        styles.ttAmtTxt,
                        {
                          borderColor: 'orange',
                          borderWidth: 2,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                          width: 70,
                        },
                      ]}>
                      <TextInput
                        style={{padding: 1.5}}
                        placeholder="0"
                        autoComplete="off"
                        keyboardType="numeric"
                        textAlign="center"
                        value={discountAmt}
                        onChangeText={e => {
                          setDiscountAmt(e);
                          const rupees =
                            (billPatientData?.totalamount * e) / 100;
                          setDiscountAmtRs(rupees.toFixed(2));
                        }}
                      />
                    </View>
                    <Text
                      style={[
                        styles.billTxt2,
                        {
                          backgroundColor: 'orange',
                          borderTopRightRadius: 6,
                          borderBottomRightRadius: 6,
                        },
                      ]}>
                      %
                    </Text>
                  </View>
                  <View style={[styles.billContent, {gap: 0}]}>
                    <View
                      style={[
                        styles.billTxt2,
                        {
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                          backgroundColor: '#b9cceb',
                          borderColor: '#b9cceb',
                          height: 35,
                        },
                      ]}>
                      <FontAwesome6
                        name="indian-rupee-sign"
                        color="black"
                        size={12}
                      />
                    </View>
                    <View
                      style={[
                        styles.ttAmtTxt,
                        {
                          borderTopRightRadius: 6,
                          borderBottomRightRadius: 6,
                          width: 70,
                          borderColor: '#b9cceb',
                          borderWidth: 2,
                        },
                      ]}>
                      <TextInput
                        style={{padding: 1.5}}
                        placeholder="0"
                        autoComplete="off"
                        keyboardType="numeric"
                        textAlign="center"
                        value={discountAmtRs}
                        onChangeText={e => {
                          setDiscountAmtRs(e);
                          const percentage =
                            (e * 100) / billPatientData?.totalamount;
                          setDiscountAmt(percentage.toFixed(2));
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.ttAmtDiv}>
                <View style={styles.ttAmt}>
                  <Text style={styles.ttAmtlabel}>Total Amount</Text>
                  <View style={styles.amt}>
                    <FontAwesome6
                      name="indian-rupee-sign"
                      color="black"
                      size={12}
                    />
                    <Text style={styles.ttAmtTxt}>{TOTAL_AMOUNT}</Text>
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
                      value={receivedAmt}
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
                      {receivedAmt == '' ? previousbalance : totalbalance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            addMobileBillHandler(), setModalVisible(true);
          }}>
          <Text style={styles.submitBtnTxt}>Save</Text>
        </TouchableOpacity>
        {/* Modal Popup */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Bill Added Successfully</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      navigation.navigate('Ehome');
                  }}>
                  <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </>
  );
};

export default BillLayout;

const styles = StyleSheet.create({
  container: {flex: 1},
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

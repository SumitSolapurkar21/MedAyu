import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
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

const BillLayout = ({route}) => {
  const navigation = useNavigation();
  const [toggleValue, setToggleValue] = useState(true);
  const {uhid, patient_id, reception_id, hospital_id} = route.params;
  const [billPatientData, setBillPatientData] = useState(null);
  const [receivedAmt, setReceivedAmt] = useState('');
  const [discountAmt, setDiscountAmt] = useState('');
  const [discountAmtRs, setDiscountAmtRs] = useState('');

  useEffect(() => {
    try {
      const patientBillData = async () => {
        await axios
          .post(`${api.baseurl}/GetAllBillsForMobile`, {
            uhid: uhid,
            patient_id: patient_id,
            reception_id: reception_id,
            hospital_id: hospital_id,
          })
          .then(res => {
            setBillPatientData(res.data);
            return res.data;
          });
      };
      patientBillData();
    } catch (error) {
      console.log('Error :', error);
    }
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
            <FontAwesome6
              name="arrow-left-long"
              color="#127359"
              size={28}
              onPress={() => navigation.navigate('EpatientDetails')}
            />
            <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
              Bill
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <Switch
              value={toggleValue}
              onValueChange={() => setToggleValue(!toggleValue)}
              activeText={'Cash'}
              inActiveText={'Credit'}
              switchWidthMultiplier={3}
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
                <Text>10-10-2024</Text>
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
              {billPatientData?.data.map((res, i) => {
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
              <TouchableOpacity style={styles.billAdd}>
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
                        placeholder="0.0"
                        autoComplete="off"
                        keyboardType="numeric"
                        textAlign="left"
                        value={discountAmt}
                        onChangeText={e => setDiscountAmt(e)}
                        editable={discountAmtRs != '' ? false : true}
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
                        placeholder="0.0"
                        autoComplete="off"
                        keyboardType="numeric"
                        textAlign="left"
                        value={discountAmtRs}
                        onChangeText={e => setDiscountAmtRs(e)}
                        editable={discountAmt != '' ? false : true}
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
                    <Text style={styles.ttAmtTxt}>
                      {billPatientData?.totalamount}
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
                      {billPatientData?.totalamount - receivedAmt}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnTxt}>Save</Text>
        </TouchableOpacity>
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
});

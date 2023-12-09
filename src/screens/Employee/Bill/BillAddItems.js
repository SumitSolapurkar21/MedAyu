import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Button} from 'react-native-paper';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';
import {Dialog, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const BillAddItems = ({route}) => {
  const navigation = useNavigation();
  const {bill_id} = route.params;
  const [itemName, setItemName] = useState('');
  const [outbillingtype, setOutbillingtype] = useState('');
  const [itemQuantity, setItemQuantity] = useState('1');
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [tax, setTax] = useState('');
  const {userData} = useContext(UserContext);
  const [opdServices, setOpdServices] = useState([]);
  const [selectedItemCharge, setSelectedItemCharge] = useState('');

  //diaglog...
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const hospital_id = userData?.data[0].hospital_id;

  const taxList = [
    {
      label: 'With Tax',
      value: '1',
    },
    {
      label: 'Without Tax',
      value: '2',
    },
  ];

  // api ....
  useEffect(() => {
    const GetOPDServices = async () => {
      try {
        const GetOPDServicesRes = await axios.post(
          `${api.baseurl}/GetOPDServices`,
          {hospital_id: hospital_id},
        );

        const data = GetOPDServicesRes.data.servicesArray || [];
        setOpdServices(data);
      } catch (error) {
        console.error('Error : ', error);
      }
    };
    if (hospital_id !== '') GetOPDServices();
  }, [hospital_id]);

  let service_id = itemName;

  useEffect(() => {
    const serviceAmountRes = async () => {
      try {
        await axios
          .post(`${api.baseurl}/GetServiceAmount`, {
            service_id: service_id,
          })
          .then(res => {
            //   console.log(res.data);
            setSelectedItemCharge(res.data);
            const matchingService = opdServices.find(
              service => service.service_id === service_id,
            );
            setOutbillingtype(matchingService.outbillingtype);
            //   console.log('matching : ', matchingService);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (service_id != '' || undefined) serviceAmountRes();
  }, [service_id]);

  // submit bill item handler .......
  const servicesArray = [
    {
      amount: selectedItemCharge.amount,
      outbillingname: selectedItemCharge.outbillingname,
      outbillingtype: outbillingtype,
    },
  ];
  const submitBillItemHandler = async () => {
    await axios
      .post(`${api.baseurl}/UpdateMobileOPDServices`, {
        hospital_id: hospital_id,
        bill_id,
        nettotal: itemQuantity * selectedItemCharge.amount,
        servicesArray,
      })
      .then(res => {
        console.log(res.data);
      });
  };
  return (
    <View style={styles.container}>
      {/* card 1 */}
      <View style={styles.card}>
        <View style={styles.header}>
          <DropDown
            label={'Item Name'}
            mode={'outlined'}
            visible={showDropDown3}
            showDropDown={() => setShowDropDown3(true)}
            onDismiss={() => setShowDropDown3(false)}
            value={itemName}
            setValue={setItemName}
            list={opdServices?.map((res, i) => ({
              label: res.outbillingtype,
              key: [res.amount, res.outbillingtype],
              value: res.service_id,
            }))}
          />
        </View>
        <View style={styles.grpMain}>
          <TextInput
            mode="outlined"
            label="Quantity"
            placeholder="Quantity"
            style={{width: '49%'}}
            value={itemQuantity}
            onChangeText={e => setItemQuantity(e)}
            keyboardType="numeric"
          />
          {/* <View style={{width: '49%'}}>
            <DropDown
              label={'Unit'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender || ''}
              setValue={setGender}
              list={opdServices?.map((res, i) => ({
                label: res.outbillingtype,
                key: i,
                value: res.outbillingtype,
              }))}
            />
          </View> */}
          <TextInput
            mode="outlined"
            label="Doctor Name"
            placeholder="Quantity"
            style={{width: '49%'}}
            value={selectedItemCharge.outbillingname}
            editable={false}
            multiline={true}
          />
        </View>
        <View style={styles.grpMain}>
          <TextInput
            mode="outlined"
            label="Rate(Price/Unit)"
            placeholder="Rate(Price/Unit)"
            style={{width: '49%'}}
            value={selectedItemCharge.amount}
            editable={false}
          />
          <View style={{width: '49%'}}>
            <DropDown
              label={'Tax'}
              mode={'outlined'}
              visible={showDropDown2}
              showDropDown={() => setShowDropDown2(true)}
              onDismiss={() => setShowDropDown2(false)}
              value={tax}
              setValue={setTax}
              list={taxList}
            />
          </View>
        </View>
        <Text style={{fontWeight: '600', marginTop: 20, color: 'black'}}>
          Total Amount : &nbsp; &nbsp;
          <FontAwesome6 name="indian-rupee-sign" color="black" size={12} />
          &nbsp; &nbsp;
          {itemQuantity * selectedItemCharge.amount || '0.00'}
        </Text>
      </View>

      {/* card 2 */}
      {/* <View style={styles.card}>
        <View style={styles.header2}>
          <Text style={styles.headerTxt}>Totals & Taxes</Text>
        </View>

        <View style={styles.billContent}>
          <Text style={styles.billTxt}>Subtotal (Rate x Qty)</Text>
          <Text style={styles.billTxt}>
            <FontAwesome6 name="indian-rupee-sign" color="black" size={10} />
            &nbsp;&nbsp; 99999
          </Text>
        </View>

        <View style={styles.billSum}>
          <View style={[styles.billContent]}>
            <Text style={[styles.billTxt, {marginBottom: 8}]}>Discount</Text>
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
                      height: 35,
                    },
                  ]}>
                  <TextInput
                    placeholder="0"
                    autoComplete="off"
                    keyboardType="numeric"
                    value={'8'}
                    style={{height: 30, backgroundColor: '#ffffff'}}
                    mode="flat"
                  />
                </View>
                <Text
                  style={[
                    styles.billTxt2,
                    {
                      backgroundColor: 'orange',
                      borderTopRightRadius: 6,
                      borderBottomRightRadius: 6,
                      height: 35,
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
                      borderColor: '#b9cceb',
                      borderWidth: 2,
                      height: 35,
                    },
                  ]}>
                  <TextInput
                    placeholder="0"
                    autoComplete="off"
                    keyboardType="numeric"
                    value={'9'}
                    style={{height: 30, backgroundColor: '#ffffff'}}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.billSum}>
          <View style={[styles.billContent]}>
            <Text style={[styles.billTxt]}>Tax %</Text>
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
                      height: 35,
                    },
                  ]}>
                  <TextInput
                    placeholder="0"
                    autoComplete="off"
                    keyboardType="numeric"
                    value={'8'}
                    style={{height: 30, backgroundColor: '#ffffff'}}
                    mode="flat"
                  />
                </View>
                <Text
                  style={[
                    styles.billTxt2,
                    {
                      backgroundColor: 'orange',
                      borderTopRightRadius: 6,
                      borderBottomRightRadius: 6,
                      height: 35,
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
                      borderColor: '#b9cceb',
                      borderWidth: 2,
                      height: 35,
                    },
                  ]}>
                  <TextInput
                    placeholder="0"
                    autoComplete="off"
                    keyboardType="numeric"
                    value={'9'}
                    style={{height: 30, backgroundColor: '#ffffff'}}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.billContent}>
          <Text style={styles.billTxt}>Total Amount</Text>
          <Text style={styles.billTxt}>
            <FontAwesome6 name="indian-rupee-sign" color="black" size={10} />
            &nbsp;0
          </Text>
        </View>
      </View> */}
      {/* dialog box */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Data Updated !</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                hideDialog(),
                  navigation.goBack(),
                  navigation.replace('BillLayout');
              }}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        //    icon="camera"
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          marginVertical: 10,
        }}
        mode="contained"
        onPress={() => {
          submitBillItemHandler(), showDialog();
        }}>
        Save
      </Button>
    </View>
  );
};

export default BillAddItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 12,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 8,
    padding: 6,
    paddingBottom: 10,
  },

  grpMain: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
  },
  //   header2: {
  //     padding: 6,
  //     borderBottomWidth: 1,
  //     borderBottomColor: 'lightgrey',
  //     marginBottom: 10,
  //   },
  //   headerTxt: {
  //     fontWeight: '600',
  //     color: 'black',
  //   },
  //   billContent: {
  //     paddingBottom: 6,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     gap: 6,
  //   },
  //   billTxt: {
  //     fontSize: 12,
  //     color: 'black',
  //     fontWeight: '600',
  //   },

  //   billTxt2: {
  //     borderWidth: 2,
  //     borderColor: 'orange',
  //     padding: 6,
  //   },
});
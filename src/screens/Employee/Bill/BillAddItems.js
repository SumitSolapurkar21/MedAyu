import {BackHandler, StyleSheet, Text, View} from 'react-native';
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
  const {bill_type} = route.params;
  const [itemName, setItemName] = useState('');
  const [outbillingtype, setOutbillingtype] = useState('');
  const [itemQuantity, setItemQuantity] = useState('1');
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [tax, setTax] = useState('');
  const {userData, scannedPatientsData, setPatientEditArray, billHistoryArray} =
    useContext(UserContext);
  const [opdServices, setOpdServices] = useState([]);
  const [selectedItemCharge, setSelectedItemCharge] = useState('');

  const {_id, hospital_id, name} = userData.data[0];
  const {firstname, mobilenumber, patient_id, patientgender, uhid} =
    scannedPatientsData;

  //diaglog...
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
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
            setSelectedItemCharge(res.data);
            const matchingService = opdServices.find(
              service => service.service_id === service_id,
            );
            setOutbillingtype(matchingService.outbillingtype);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (service_id != '' || undefined) serviceAmountRes();
  }, [service_id]);

  // submit bill item handler .......
  function generateRandom16DigitNumber() {
    let randomNumber = '';
    for (let i = 0; i < 16; i++) {
      const digit = Math.floor(Math.random() * 10);
      randomNumber += digit;
    }
    return randomNumber;
  }

  // Example: Generate a random 16-digit number
  const random16DigitNumber = generateRandom16DigitNumber();

  const servicesArray = [
    {
      amount: selectedItemCharge.amount,
      billname: selectedItemCharge.outbillingname,
      outbillingtype: outbillingtype,
    },
  ];
  const servicesArray2 = [
    {
      amount: selectedItemCharge.amount,
      billname: selectedItemCharge.outbillingname,
      outbillingtype: outbillingtype,
      bill_id: billHistoryArray,
    },
  ];

  const submitBillItemHandler = async () => {
    bill_type === 'ADD'
      ? await axios
          .post(`${api.baseurl}/UpdateMobileOPDServices`, {
            reception_id: _id,
            hospital_id: hospital_id,
            fullname: name,
            firstname: firstname,
            mobilenumber: mobilenumber,
            patient_id: patient_id,
            patientgender: patientgender,
            uhid: uhid,
            nettotal: itemQuantity * selectedItemCharge.amount,
            servicesArray,
          })
          .then(res => {
            res.data.status === true
              ? showDialog()
              : console.warn(`${res.data.message}`);
            return res.data;
          })
      : setPatientEditArray(prevArray => [...prevArray, ...servicesArray2]),
      showDialog(true);

    // : await axios
    //     .post(`${api.baseurl}/UpdateMobileOPDServices`, {
    //       reception_id: _id,
    //       hospital_id: hospital_id,
    //       fullname: name,
    //       firstname: firstname,
    //       mobilenumber: mobilenumber,
    //       patient_id: patient_id,
    //       patientgender: patientgender,
    //       uhid: uhid,
    //       nettotal: itemQuantity * selectedItemCharge.amount,
    //       servicesArray,
    //       bill_id: billHistoryArray,
    //     })
    //     .then(res => {
    //       res.data.status === true
    //         ? showDialog()
    //         : console.warn(`${res.data.message}`);
    //       return res.data;
    //     });
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
                  bill_type === 'ADD'
                    ? navigation.replace('BillLayout')
                    : navigation.replace('BillEditItems');
              }}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          marginVertical: 10,
        }}
        mode="contained"
        onPress={() => {
          submitBillItemHandler();
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
});

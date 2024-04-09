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
  const [itemQuantity, setItemQuantity] = useState('1');
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [tax, setTax] = useState('');
  const {userData, scannedPatientsData, setPatientEditArray, billHistoryArray} =
    useContext(UserContext);
  const [opdServices, setOpdServices] = useState([]);
  const [selectedItemCharge, setSelectedItemCharge] = useState('');

  const {_id, hospital_id, name} = userData;
  const {firstname, mobilenumber, patient_id, patientgender, uhid} =
    scannedPatientsData;

  //diaglog...
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.goBack('EpatientDetails');
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
  //service type ....
  const [_serviceTypeDropdown, _setServiceTypeDropdown] = useState(false);
  const [_serviceTypeSelected, _setServiceTypeSelected] = useState('');
  const [_serviceTypeArray, _setServiceTypeArray] = useState([]);

  useEffect(() => {
    const _fetchservicetype = async () => {
      try {
        await axios
          .post(`${api.baseurl}/FetchServiceType`, {
            hospital_id: hospital_id,
          })
          .then(res => {
            _setServiceTypeArray(res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (hospital_id !== '' || undefined || null) _fetchservicetype();
  }, []);

  //service category ......
  const [_serviceCategoryDropdown, _setServiceCategoryDropdown] =
    useState(false);
  const [_serviceCategorySelected, _setServiceCategorySelected] = useState('');
  const [_serviceCategoryArray, _setServiceCategoryArray] = useState([]);

  useEffect(() => {
    const _fetchservicecategory = async () => {
      try {
        await axios
          .post(`${api.baseurl}/getservicecategoryacctype`, {
            hospital_id: hospital_id,
            servicetype_id: _serviceTypeSelected._id,
          })
          .then(res => {
            _setServiceCategoryArray(res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (_serviceTypeSelected !== '' || undefined || null)
      _fetchservicecategory();
  }, [_serviceTypeSelected]);

  //service item ......
  const [_serviceItemDropdown, _setServiceItemDropdown] = useState(false);
  const [_serviceItemSelected, _setServiceItemSelected] = useState('');
  const [_serviceItemSelected2, _setServiceItemSelected2] = useState('');
  const [_serviceItemArray, _setServiceItemArray] = useState([]);

  useEffect(() => {
    const _fetchserviceitem = async () => {
      try {
        await axios
          .post(`${api.baseurl}/getserviceitemaccboth`, {
            hospital_id: hospital_id,
            servicetype_id: _serviceTypeSelected._id,
            servicecategory_id: _serviceCategorySelected,
          })
          .then(res => {
            _setServiceItemArray(res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (
      _serviceCategorySelected !== '' ||
      undefined ||
      (null && _serviceCategorySelected !== '') ||
      undefined ||
      null
    )
      _fetchserviceitem();
  }, [_serviceTypeSelected, _serviceCategorySelected]);

  useEffect(() => {
    const serviceAmountRes = async () => {
      try {
        await axios
          .post(`${api.baseurl}/GetServiceAmount`, {
            service_id: _serviceItemSelected,
          })
          .then(res => {
            setSelectedItemCharge(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (_serviceItemSelected != '' || undefined) serviceAmountRes();
  }, [_serviceItemSelected]);

  // while add data ....
  const servicesArray = [
    {
      amount: selectedItemCharge.amount,
      billname: selectedItemCharge.outbillingname,
      billname_id: _serviceItemSelected,
      outbillingtype: selectedItemCharge.outbillingtype,
      outbillingtype_id: _serviceCategorySelected,
      quantity: itemQuantity,
      servicetype: _serviceTypeSelected?.servicetype,
      servicetype_id: _serviceTypeSelected?._id,
    },
  ];
  // while edit data .......
  const servicesArray2 = [
    {
      amount: selectedItemCharge.amount,
      billname: selectedItemCharge.outbillingname,
      outbillingtype: selectedItemCharge.outbillingtype,
      bill_id: billHistoryArray,
    },
  ];

  // submit Bill Item Handler .......

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
              ? // showDialog()
                navigation.replace('BillLayout')
              : console.warn(`${res.data.message}`);
            return res.data;
          })
      : setPatientEditArray(prevArray => [...prevArray, ...servicesArray2]),
      showDialog(true);
  };

  return (
    <View style={styles.container}>
      {/* card 1 */}
      <View style={styles.card}>
        {/* service type .... */}
        <DropDown
          label={'Service Type'}
          mode={'outlined'}
          visible={_serviceTypeDropdown}
          showDropDown={() => _setServiceTypeDropdown(true)}
          onDismiss={() => _setServiceTypeDropdown(false)}
          value={_serviceTypeSelected}
          setValue={_setServiceTypeSelected}
          list={_serviceTypeArray?.map((res, i) => ({
            label: res.servicetype,
            key: [res._id, res.servicetype],
            value: res,
          }))}
        />

        {/* service category .... */}
        <DropDown
          label={'Service Category'}
          mode={'outlined'}
          visible={_serviceCategoryDropdown}
          showDropDown={() => _setServiceCategoryDropdown(true)}
          onDismiss={() => _setServiceCategoryDropdown(false)}
          value={_serviceCategorySelected}
          setValue={_setServiceCategorySelected}
          list={_serviceCategoryArray?.map(res => ({
            label: res.servicecategory,
            key: [res._id, res.servicecategory],
            value: res._id,
          }))}
        />

        {/* service item .... */}
        <DropDown
          label={'Service Item'}
          mode={'outlined'}
          visible={_serviceItemDropdown}
          showDropDown={() => _setServiceItemDropdown(true)}
          onDismiss={() => _setServiceItemDropdown(false)}
          value={_serviceItemSelected}
          setValue={_setServiceItemSelected}
          list={_serviceItemArray?.map(res => ({
            label: res.outbillingname,
            key: [res._id, res.outbillingname],
            value: res._id,
          }))}
        />

        {/* </View> */}
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
            label="Rate(Price/Unit)"
            placeholder="Rate(Price/Unit)"
            style={{width: '49%'}}
            value={selectedItemCharge.amount}
            editable={false}
          />
        </View>
        <View style={styles.grpMain}>
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
  dropdown: {
    marginBottom: 8,
  },
});

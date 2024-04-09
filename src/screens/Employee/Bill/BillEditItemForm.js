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

const BillEditItemForm = ({route}) => {
  const {bill_id} = route.params;
  const navigation = useNavigation();

  const [editArray, setEditArray] = useState([]);
  const {userData, scannedPatientsData} = useContext(UserContext);
  const [selectedItemCharge, setSelectedItemCharge] = useState('');

  const {_id, hospital_id} = userData;
  const {patient_id} = scannedPatientsData;

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
  // get data for edit ......

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${api.baseurl}/EditMobileBills`, {
          reception_id: _id,
          hospital_id: hospital_id,
          patient_id: patient_id,
          bill_id: bill_id,
        });

        setEditArray(res.data.data);
        const {billname_id, outbillingtype_id, servicetype_id} =
          res.data.data[0];

        // Set initial values for dropdowns based on the data
        _setServiceTypeSelected(servicetype_id || '');
        _setServiceCategorySelected(outbillingtype_id || '');
        _setServiceItemSelected(billname_id || '');

        // Extract quantity and set it in formData
        const quantityFromEditArray = res.data.data[0]?.quantity || '';
        setFormData(prevData => ({
          ...prevData,
          quantity: quantityFromEditArray,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    // Include necessary dependencies in the dependency array
    fetchData();
  }, [hospital_id, _id, patient_id, bill_id]);

  // Include _serviceCategoryArray in the dependency array

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
    if (hospital_id !== '') _fetchservicetype();
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
            servicetype_id: _serviceTypeSelected,
          })
          .then(res => {
            _setServiceCategoryArray(res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (_serviceTypeSelected !== '') _fetchservicecategory();
  }, [_serviceTypeSelected]);

  //service item ......
  const [_serviceItemDropdown, _setServiceItemDropdown] = useState(false);
  const [_serviceItemSelected, _setServiceItemSelected] = useState('');
  const [_serviceItemArray, _setServiceItemArray] = useState([]);

  useEffect(() => {
    const _fetchserviceitem = async () => {
      try {
        await axios
          .post(`${api.baseurl}/getserviceitemaccboth`, {
            hospital_id: hospital_id,
            servicetype_id: _serviceTypeSelected,
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
  }, [_serviceCategorySelected, _serviceCategorySelected]);

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
    if (_serviceItemSelected !== '' || undefined || null) serviceAmountRes();
  }, [_serviceItemSelected]);

  // delete Handler :
  const deleteHandler = async () => {
    try {
      await axios
        .post(`${api.baseurl}/DeleteOpdItem`, {
          bill_id: bill_id,
          servicesArray: [servicesArray],
        })
        .then(res => {
          res.data.status === true
            ? navigation.replace('BillLayout')
            : console.error(`${res.data.message}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //   const _quantity = itemQuantity !== '' ? itemQuantity : editArray[0]?.quantity;

  const [formData, setFormData] = useState({
    totalamount: selectedItemCharge?.amount,
  });

  //
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // total amount for edit item....
  const _totalamount =
    parseInt(formData.quantity) * parseInt(selectedItemCharge?.amount);
  // bill service array ......
  const servicesArray = [
    {
      amount: selectedItemCharge.amount,
      servicetype: editArray[0]?.servicetype,
      billname: selectedItemCharge.outbillingname,
      outbillingtype: selectedItemCharge.outbillingtype,
      quantity: formData.quantity,
      servicetype_id: _serviceTypeSelected,
      outbillingtype_id: _serviceCategorySelected,
      billname_id: _serviceItemSelected,
    },
  ];

  //edit bill items .....
  const submitBillItemHandler = async () => {
    try {
      await axios
        .post(`${api.baseurl}/UpdateMobileBills`, {
          bill_id: bill_id,
          reception_id: _id,
          hospital_id: hospital_id,
          nettotal: formData.quantity * selectedItemCharge.amount,
          servicesArray,
        })
        .then(res => {
          res.data.status === true
            ? showDialog()
            : console.warn(`${res.data.message}`);
          return res.data;
        });
      showDialog(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* card 1 */}
      <View style={styles.card}>
        {/* service type .... */}
        <DropDown
          key={`ServiceTypeDropDown_${_serviceTypeSelected}`}
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
            value: res._id,
          }))}
        />

        <DropDown
          key={`ServiceCategoryDropDown_${_serviceCategorySelected}`}
          label={'Service Category'}
          mode={'outlined'}
          visible={_serviceCategoryDropdown}
          showDropDown={() => _setServiceCategoryDropdown(true)}
          onDismiss={() => _setServiceCategoryDropdown(false)}
          value={_serviceCategorySelected}
          setValue={_setServiceCategorySelected}
          list={_serviceCategoryArray?.map((res, i) => ({
            label: res.servicecategory,
            key: [res._id, res.servicecategory],
            value: res._id,
          }))}
        />

        <DropDown
          key={`ServiceItemDropDown_${_serviceItemSelected}`}
          label={'Service Item'}
          mode={'outlined'}
          visible={_serviceItemDropdown}
          showDropDown={() => _setServiceItemDropdown(true)}
          onDismiss={() => _setServiceItemDropdown(false)}
          value={_serviceItemSelected}
          setValue={_setServiceItemSelected}
          list={_serviceItemArray?.map((res, i) => ({
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
            value={formData.quantity}
            onChangeText={text => handleInputChange('quantity', text)}
            keyboardType="numeric"
            editable={true}
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

        <Text style={{fontWeight: '600', marginTop: 20, color: 'black'}}>
          Total Amount : &nbsp; &nbsp;
          <FontAwesome6 name="indian-rupee-sign" color="black" size={12} />
          &nbsp; &nbsp;
          {_totalamount || selectedItemCharge.amount}
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
                  navigation.replace('BillLayout');
              }}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.btngrp}>
        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => {
            submitBillItemHandler();
          }}>
          Update
        </Button>
        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => {
            deleteHandler();
          }}>
          Delete
        </Button>
      </View>
    </View>
  );
};

export default BillEditItemForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 12,
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
  btngrp: {
    position: 'absolute',
    flexDirection: 'row',
    marginHorizontal: 14,
    bottom: 0,
    gap: 10,
    marginVertical: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

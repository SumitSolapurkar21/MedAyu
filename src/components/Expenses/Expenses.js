import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import UserContext from '../Context/Context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DocumentPicker from 'react-native-document-picker';
import api from '../../../api.json';
import axios from 'axios';

const Expenses = () => {
  const {userData} = useContext(UserContext);

  const {role} = userData;
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [bill_photo, setBill_photo] = useState(false);
  const [payment_proof, setPayment_proof] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);

  const _navigationTabs = tabs => {
    if (tabs === 'Doctor') {
      navigation.replace('Tabs');
    } else if (tabs === 'Receptionist') {
      navigation.replace('Home');
    } else if (tabs === 'PExecutive') {
      navigation.replace('PExecutiveHome');
    } else if (tabs === 'Nurse') {
      navigation.replace('NurseHome');
    } else if (tabs === 'Attendant') {
      navigation.replace('AttendantHome');
    } else if (tabs === 'Security') {
      navigation.replace('SecurityHome');
    } else if (tabs === 'Kitchen') {
      navigation.replace('KitchenHome');
    } else if (tabs === 'HouseKeeping') {
      navigation.replace('HouseKeepingHome');
    } else if (tabs === 'Pharmacy') {
      navigation.replace('PharmacyHome');
    } else if (tabs === 'HR') {
      navigation.replace('HRHome');
    } else {
      return;
    }
  };

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      _navigationTabs(role);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const modeofpayment = [
    {
      label: 'Cash',
      value: 'Cash',
    },
    {
      label: 'Cheque',
      value: 'Cheque',
    },
    {
      label: 'UPI',
      value: 'UPI',
    },
  ];
  //   form inputs....
  const [submittedformData, setsubmittedFormData] = useState({
    amount: '',
    category: '',
    category_id: '',
    availablebudget: '',
    duedate: '',
    payee: '',
    modeofpayment: '',
    transactiondetails: '',
    approvedby: '',
    fixedmonthamount: '',
  });

  const inputHandlers = (fieldName, value) => {
    setsubmittedFormData({
      ...submittedformData,
      [fieldName]: value,
    });
  };
  //due date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Function for handling Date
  const handleDate = date => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    const Dateformat = `${day}-${month}-${year}`;
    setsubmittedFormData({
      ...submittedformData,
      duedate: Dateformat,
    });
    hideDatePicker();
  };

  let formData = new FormData();

  const handleDocumentSelection = async filename => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Specify the types of files to pick (optional)
      });

      // Loop through each selected document
      doc.forEach((doc, index) => {
        // Append image data to FormData with unique keys
        formData.append(`${filename}${index}`, {
          uri: doc.uri,
          name: doc.name,
          type: doc.type,
        });
      });

      // Append other form data fields if needed
      formData.append('amount', submittedformData.amount);
      formData.append('category', submittedformData.category);
      formData.append('availablebudget', submittedformData.availablebudget);
      formData.append('duedate', submittedformData.duedate);
      formData.append('payee', submittedformData.payee);
      formData.append('modeofpayment', submittedformData.modeofpayment);
      formData.append(
        'transactiondetails',
        submittedformData.transactiondetails,
      );
      formData.append('approvedby', submittedformData.approvedby);
      formData.append('category_id', submittedformData.category_id);
      formData.append('fixedmonthamount', submittedformData.fixedmonthamount);
    } catch (err) {
      console.warn('Document picker error:', err);
    }
  };

  const dataSubmitHandler = async () => {
    try {
      // Make API call to upload the image and form data
      const response = await fetch(`${api.baseurl}/AddMobileExpensesForm`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: formData, // Use the FormData object
      });
      // Handle response
      const data3 = await response.json();
      if (data3.status === true) {
        Alert.alert(`Success !!`, 'Expenses form Submitted', [
          {text: 'OK', onPress: () => navigation.replace('Home')},
        ]);
      } else {
        Alert.alert('Data Not Submitted!!');
      }
    } catch (error) {
      Alert.alert(`Please fill form and Upload Files`, `${error}`);
    }
  };

  const formdetails = filename => {
    if (
      submittedformData.amount === '' ||
      submittedformData.approvedby === '' ||
      submittedformData.availablebudget === '' ||
      submittedformData.category === '' ||
      submittedformData.duedate === '' ||
      submittedformData.modeofpayment === '' ||
      submittedformData.payee === '' ||
      submittedformData.transactiondetails === ''
    ) {
      Alert.alert('Please Fill Above Details First');
    } else {
      handleDocumentSelection(filename);
    }
  };

  useEffect(() => {
    GetMobileExpensesCategory();
  }, [userData?.hospital_id]);

  // frtch GetMobileExpensesCategory ....
  const GetMobileExpensesCategory = async () => {
    const body = {
      hospital_id: userData?.hospital_id,
      reception_id: userData?._id,
    };
    try {
      await axios
        .post(`${api.baseurl}/GetMobileExpensesCategory`, body)
        .then(res => {
          const {status, message, data} = res.data;
          if (status === true) {
            setCategoryArray(data);
            // console.log(data);
          } else {
            Alert.alert('Error !!', message);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', error);
    }
  };

  // const selectedCategoryData = submittedformData?.category;
  // console.log('categoryArray : ', submittedformData);
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            _navigationTabs(role);
          }}
        />
        <Appbar.Content title="Expenses" style={styles.appbar_title} />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Expenses</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Amount : </Text>
            <TextInput
              mode="flat"
              style={styles.input}
              value={submittedformData.amount}
              onChangeText={text => inputHandlers('amount', text)}
              inputMode={'numeric'}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Category : </Text>
            <View>
              <Dropdown
                mode={'outlined'}
                style={[styles.dropdown, isFocus2 && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={categoryArray}
                search
                maxHeight={300}
                labelField="category"
                valueField="category"
                placeholder={!isFocus2 ? 'Select' : '...'}
                searchPlaceholder="Search..."
                value={submittedformData?.category}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item => {
                  setsubmittedFormData({
                    ...submittedformData,
                    availablebudget: item.monthlybudget,
                    category: item.category,
                    category_id: item.expenses_id,
                    fixedmonthamount: item.fixedmonthamount,
                  });

                  setIsFocus2(false);
                }}
              />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Available Budget/Month : </Text>
            <TextInput
              mode="flat"
              style={styles.input}
              value={submittedformData?.availablebudget}
              onChangeText={text => inputHandlers('availablebudget', text)}
              editable={false}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Due Date : </Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 2,
              }}>
              <Text style={[styles.input, {padding: 10, flex: 1}]}>
                {submittedformData.duedate || 'DD / MM / YYYY'}
              </Text>
              {/* <FontAwesome6 name="calendar-days" color="red" size={22} /> */}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDate}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Payee : </Text>
            <TextInput
              mode="flat"
              style={styles.input}
              value={submittedformData.payee}
              onChangeText={text => inputHandlers('payee', text)}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Mode of Payment : </Text>
            <View>
              <Dropdown
                mode={'outlined'}
                style={[styles.dropdown, isFocus1 && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={modeofpayment}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus1 ? 'Select' : '...'}
                searchPlaceholder="Search..."
                value={submittedformData.modeofpayment}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={item => {
                  inputHandlers('modeofpayment', item.value);
                  setIsFocus1(false);
                }}
              />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Transaction Details : </Text>
            <TextInput
              mode="flat"
              style={styles.input}
              value={submittedformData.transactiondetails}
              onChangeText={text => inputHandlers('transactiondetails', text)}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Approved By : </Text>
            <TextInput
              mode="flat"
              style={styles.input}
              value={submittedformData.approvedby}
              onChangeText={text => inputHandlers('approvedby', text)}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Bill Photo : </Text>
            <TouchableOpacity onPress={() => formdetails('bill_photo')}>
              <View style={styles.upload}>
                <FontAwesome6
                  name="cloud-arrow-up"
                  color="#127359"
                  size={18}
                  style={styles.searchIcon}
                />
                <Text>Upload</Text>
                <Text style={styles.label}>
                  &nbsp; &nbsp; &nbsp;{bill_photo}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Payment Proof : </Text>
            <TouchableOpacity onPress={() => formdetails('payment_proof')}>
              <View style={styles.upload}>
                <FontAwesome6
                  name="cloud-arrow-up"
                  color="#127359"
                  size={18}
                  style={styles.searchIcon}
                />
                <Text>Upload</Text>
                <Text style={styles.label}>
                  &nbsp; &nbsp; &nbsp; {payment_proof}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => dataSubmitHandler()}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  headerText: {
    fontWeight: '600',
    color: 'black',
    fontSize: 20,
  },
  cardContent: {
    marginVertical: 8,
    flexDirection: 'column',
    gap: 6,
    marginHorizontal: 10,
  },
  label: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
    //     marginHorizontal: 6,
    backgroundColor: 'white',
  },
  input: {
    height: 45,
    backgroundColor: 'white',
  },
  form: {
    marginBottom: 16,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  upload: {
    flexDirection: 'row',
    gap: 10,
    padding: 18,
    borderWidth: 1,
    borderRadius: 4,
  },
});

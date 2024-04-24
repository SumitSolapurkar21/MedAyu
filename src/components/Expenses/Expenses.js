import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import UserContext from '../Context/Context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DocumentPicker from 'react-native-document-picker';
import {Platform} from 'react-native';
import api from '../../../api.json';

const Expenses = () => {
  const {userData} = useContext(UserContext);
  const [fileResponse, setFileResponse] = useState([]);
  const {role} = userData;
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);

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

  //dropdown for procedure type .....
  const _dropdowndata = [
    {
      label: 'Grocery',
      value: 'Grocery',
    },
    {
      label: 'Vegetable',
      value: 'Vegetable',
    },
    {
      label: 'Milk',
      value: 'Milk',
    },
    {
      label: 'Hospital',
      value: 'Hospital',
    },
    {
      label: 'Pharmacy',
      value: 'Pharmacy',
    },
  ];
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
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    availablebudget: '',
    duedate: '',
    payee: '',
    modeofpayment: '',
    transactiondetails: '',
    approvedby: '',
  });

  const inputHandlers = (fieldName, value) => {
    setFormData({
      ...formData,
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
    //     const Dateformat = `${year}-${month}-${day}`;
    const Dateformat = `${day}-${month}-${year}`;
    setFormData({
      ...formData,
      duedate: Dateformat,
    });
    hideDatePicker();
  };

  const formSubmitHandler = () => {
    console.log(formData);
    navigation.navigate('Ehome');
  };

  const handleDocumentSelection = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Specify the types of files to pick (optional)
      });
      const formData = new FormData();
      const data = {
        uri: doc[0].uri,
        name: doc[0].name,
        type: doc[0].type,
      };
      formData.append('image', data);
      // Make API call to upload the image
      const response = await fetch(`${api.baseurl}/AddMobileExpensesForm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any additional headers if needed
        },
        body: formData,
      });
      // console.log('Upload response:', JSON.stringify(formData));
      // Handle response
      const data3 = await response.json();
      console.log('Upload response:', data3);
    } catch (err) {
      console.warn('Document picker error:', err);
    }
  };

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
            <Text style={styles.label}>Name : </Text>
            <TextInput
              mode="flat"
              style={styles.input}
              value={formData?.amount}
              onChangeText={text => inputHandlers('amount', text)}
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
                data={_dropdowndata}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus2 ? 'Select' : '...'}
                searchPlaceholder="Search..."
                value={formData.category}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item => {
                  inputHandlers('category', item);
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
              value={formData?.availablebudget}
              onChangeText={text => inputHandlers('availablebudget', text)}
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
                {formData.duedate || 'DD / MM / YYYY'}
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
              value={formData?.payee}
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
                value={formData.modeofpayment}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={item => {
                  inputHandlers('modeofpayment', item);
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
              value={formData?.transactiondetails}
              onChangeText={text => inputHandlers('transactiondetails', text)}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Bill Photo : </Text>
            <TouchableOpacity onPress={handleDocumentSelection}>
              <View style={styles.upload}>
                <FontAwesome6
                  name="cloud-arrow-up"
                  color="#127359"
                  size={18}
                  style={styles.searchIcon}
                />
                <Text>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Payment Proof : </Text>
            <TouchableOpacity>
              <View style={styles.upload}>
                <FontAwesome6
                  name="cloud-arrow-up"
                  color="#127359"
                  size={18}
                  style={styles.searchIcon}
                />
                <Text>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Approved By : </Text>
            <TextInput
              mode="flat"
              style={styles.input}
              value={formData?.approvedby}
              onChangeText={text => inputHandlers('approvedby', text)}
            />
          </View>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => formSubmitHandler()}>
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
});

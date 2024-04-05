import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ToastAndroid,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Dialog,
  Portal,
  TextInput,
  SegmentedButtons,
  DefaultTheme,
  Appbar,
} from 'react-native-paper';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import api from '../../../../../api.json';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../../../components/Context/Context';

const OpdComplaints = () => {
  const navigation = useNavigation();
  const [p_category, setP_category] = useState('');
  const [selectedCategoryData, setSelectedCategoryData] = useState('');
  const [selectedRow, setSelectedRow] = useState([]);
  //table content ....
  const [widthArr, setWidthArr] = useState([]);
  const [widthArr1, setWidthArr1] = useState([]);
  const [widthArr2, setWidthArr2] = useState([]);

  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id, mobilenumber} = scannedPatientsData;

  //popup msg....
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  const keys = ['Symptoms', 'Duration', 'Time', 'Frequency', 'Action'];
  const keys2 = ['Category', 'Symptoms', 'Duration', 'Time', 'Frequency'];
  const keys3 = [
    'Category',
    'Symptoms',
    'Duration',
    'Time',
    'Frequency',
    'Date / Time',
  ];
  let data = [
    {
      label: 'Often',
      value: 'Often',
    },
    {
      label: 'Once',
      value: 'Once',
    },
    {
      label: 'Sometime',
      value: 'Sometime',
    },
    {
      label: 'Manytime',
      value: 'Manytime',
    },
    {
      label: 'Continuous',
      value: 'Continuous',
    },
  ];
  let data2 = [
    {
      label: 'Minutes',
      value: 'Minutes',
    },
    {
      label: 'Hours',
      value: 'Hours',
    },
    {
      label: 'Days',
      value: 'Days',
    },
    {
      label: 'Months',
      value: 'Months',
    },
    {
      label: 'Year',
      value: 'Year',
    },
  ];

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('OpdHomePage');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    // Listen to keyboard events and update keyboard height
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      // Clean up listeners when the component is unmounted
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // to set width of table ......
  useEffect(() => {
    setWidthArr([120, 80, 120, 150, 150, ...Array(keys.length).fill(2)]);
    setWidthArr1([120, 120, 80, 120, 110, ...Array(keys2.length).fill(2)]);
    setWidthArr2([120, 120, 80, 120, 110, 110, ...Array(keys3.length).fill(2)]);
  }, []);

  const updateSelectedCategoryData = selectedValue => {
    setSelectedCategoryData(selectedValue);
  };
  const [dropdownValues, setDropdownValues] = useState([]);
  const [dropdownValues2, setDropdownValues2] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [selectionValue, setSelectionValue] = useState('Medical');
  const [selectionCategory, setSelectionCategory] = useState([]);

  const [rowData, setRowData] = useState([]);
  const [opdAssessment, setOpdAssessment] = useState([]);

  const inputChangeHandler = (rowIndex, field, text) => {
    const newData = [...rowData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: text,
    };
    setRowData(newData);
  };

  useEffect(() => {
    if (selectionValue) {
      FetchMobileComplaintsCategory();
      // setRowData([]);
      // setSelectedCategoryData([]);
      // setP_category('');
    }
  }, [selectionValue]);

  //FetchMobileComplaintsCategory .....
  const FetchMobileComplaintsCategory = async () => {
    await axios
      .post(`${api.baseurl}/FetchMobileComplaintsCategory`, {
        hospital_id: hospital_id,
        reception_id: reception_id,
        patient_id: patient_id,
        type: selectionValue,
      })
      .then(res => {
        const {status, message} = res.data;
        if (status === false) {
          ToastAndroid.show(
            `${message}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        } else {
          setSelectionCategory(res.data.data);
        }
      });
  };
  //list of category....
  const FetchSysmptomsAccCategory = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchSysmptomsAccCategory`, {
          category: selectedCategoryData,
          hospital_id: hospital_id,
          reception_id: reception_id,
          patient_id: patient_id,
          type: selectionValue,
        })
        .then(res => {
          const _data = res.data.data.map(res => ({
            category: res.category,
            symptoms: res.illnessname,
            duration: '',
            time: '',
            frequency: '',
            id: res._id,
          }));

          setRowData(_data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchMobileOpdAssessment();
    return () => {};
  }, [hospital_id, patient_id, reception_id]);

  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: hospital_id,
          reception_id: reception_id,
          patient_id: patient_id,
          appoint_id: appoint_id,
          api_type: 'OPD-COMPLAINTS',
          uhid: uhid,
          mobilenumber: mobilenumber,
        })
        .then(res => {
          setOpdAssessment(res.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // fetch FetchSysmptomsAccCategory .......
  useEffect(() => {
    if (selectedCategoryData !== '') {
      FetchSysmptomsAccCategory();
    }
    setDropdownValues([]);
  }, [selectedCategoryData]);

  const _buttonHandler = event => {
    if (event === 'Save') {
      submitHandler();
    } else {
      navigation.navigate('OpdPastHistory');
    }
  };

  const theme = {
    ...DefaultTheme,
    roundness: 0, // Set roundness to 0 to remove borderRadius
  };

  // Add selected data handler
  const _addSelectedDataHandler = (_selectedData, _id) => {
    // Filter out data with the specified id
    const uniqueData = _selectedData.filter(item => item.id === _id);
    setSelectedRow(prev => [...prev, ...uniqueData]);
  };

  const submitHandler = async () => {
    const _body = {
      hospital_id: hospital_id,
      reception_id: reception_id,
      patient_id: patient_id,
      appoint_id: appoint_id,
      complaintArray: selectedRow,
      api_type: 'OPD-COMPLAINTS',
      uhid: uhid,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            setRowData([]);
            setSelectedCategoryData([]);
            setDropdownValues([]);
            setDropdownValues2([]);
            setP_category('');
            setSelectedRow([]);
            // setVisible(true);
            // onToggleSnackBar();
            navigation.navigate('OpdPastHistory');
          } else {
            ToastAndroid.show(
              `${message}`,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('OpdHomePage');
          }}
        />
        <Appbar.Content title="OPD Complaints" />
      </Appbar.Header>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Icon icon="check-all" style={{color: 'green'}} />
          <Dialog.Title style={styles.title}>Success!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{textAlign: 'center'}}>
              Complaint Added Successfully!
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Cancel</Button>
            <Button onPress={() => navigation.navigate('Eipdoptions')}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* after submit Msg... */}

      <ScrollView vertical style={styles.container}>
        <SegmentedButtons
          theme={theme}
          style={styles.segmentBtn}
          value={selectionValue}
          onValueChange={setSelectionValue}
          buttons={[
            {
              value: 'Medical',
              label: 'Medical',
            },
            {
              value: 'Ayurvedic',
              label: 'Ayurvedic',
            },
          ]}
        />
        <View style={styles.formGroup}>
          <Text style={styles.tableWrapper3TXT}>Category</Text>
          <View style={{width: '70%'}}>
            <Dropdown
              mode={'outlined'}
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={selectionCategory?.map(res => ({
                label: res.categoryname,
                value: res.categoryvalue,
              }))}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus2 ? 'Select' : '...'}
              searchPlaceholder="Search..."
              value={p_category}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={item => {
                setP_category(item.value);
                updateSelectedCategoryData(item.value);

                setIsFocus2(false);
              }}
            />
          </View>
        </View>
        <View style={[styles.categorySelection]}>
          <Text style={styles.tableWrapper3TXT}>Category Details</Text>

          <ScrollView horizontal={true} style={{padding: 10}}>
            <View style={{height: 'auto', maxHeight: 400}}>
              <Table
                borderStyle={{
                  borderWidth: 1,
                  borderColor: 'gray',
                }}>
                <Row
                  data={keys}
                  widthArr={widthArr}
                  style={styles.head}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView vertical={true} style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                  <Rows
                    // data={tableData}
                    data={rowData.map((row, rowIndex) => [
                      row.symptoms,
                      <TextInput
                        key={row.id}
                        style={styles.tableInput}
                        keyboardType="numeric"
                        onChangeText={text =>
                          inputChangeHandler(rowIndex, 'duration', text)
                        }
                      />,
                      <Dropdown
                        key={row.id}
                        style={[
                          styles.dropdown,
                          isFocus && {borderColor: 'blue'},
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data2}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus2 ? 'Select' : '...'}
                        value={dropdownValues2[row.id] || ''}
                        onFocus={() => setIsFocus2(true)}
                        onBlur={() => setIsFocus2(false)}
                        onChange={item => {
                          setDropdownValues2(prevValues => ({
                            ...prevValues,
                            [row.id]: item.value,
                          }));
                          setIsFocus2(false);
                          inputChangeHandler(rowIndex, 'time', item.value);
                        }}
                      />,
                      <Dropdown
                        key={row.id}
                        style={[
                          styles.dropdown,
                          isFocus && {borderColor: 'blue'},
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select' : '...'}
                        value={dropdownValues[row.id] || ''}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setDropdownValues(prevValues => ({
                            ...prevValues,
                            [row.id]: item.value,
                          }));
                          setIsFocus(false);
                          inputChangeHandler(rowIndex, 'frequency', item.value);
                        }}
                      />,
                      <Button
                        key={row.id}
                        style={{width: 'auto', marginHorizontal: 30}}
                        mode="contained"
                        onPress={() =>
                          _addSelectedDataHandler(
                            [...rowData],
                            row.id,
                            row.category,
                          )
                        }>
                        Add
                      </Button>,
                    ])}
                    widthArr={widthArr}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        {selectedRow?.length > 0 && (
          <View style={[styles.categorySelection]}>
            <ScrollView horizontal={true} style={{padding: 10}}>
              <View style={{height: 'auto', maxHeight: 400}}>
                <Table
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                  <Row
                    data={keys2}
                    widthArr={widthArr1}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                </Table>
                <ScrollView vertical={true} style={styles.dataWrapper}>
                  <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                    <Rows
                      // data={tableData}
                      data={selectedRow.map(row => [
                        row.category,
                        row.symptoms,
                        row.duration,
                        row.time,
                        row.frequency,
                      ])}
                      widthArr={widthArr1}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        )}
        <View style={styles.btn}>
          <Button
            style={styles.submitBtn}
            mode="contained"
            onPress={() => _buttonHandler('Save')}>
            Save & Next
          </Button>
          <Button
            style={styles.submitBtn}
            mode="contained"
            onPress={() => _buttonHandler('Skip')}>
            Skip
          </Button>
        </View>
        {opdAssessment?.length > 0 && (
          <View
            style={[styles.categorySelection, {marginBottom: keyboardHeight}]}>
            <ScrollView horizontal={true} style={{padding: 10}}>
              <View style={{height: 'auto', maxHeight: 400}}>
                <Table
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                  <Row
                    data={keys3}
                    widthArr={widthArr2}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                </Table>
                <ScrollView vertical={true} style={styles.dataWrapper}>
                  <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                    <Rows
                      // data={tableData}
                      data={opdAssessment.map(row => [
                        row.category,
                        row.symptoms,
                        row.duration,
                        row.time,
                        row.frequency,
                        `${row.opd_date} / ${row.opd_time}`,
                      ])}
                      widthArr={widthArr2}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default OpdComplaints;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  formGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 6,
    padding: 12,
    gap: 10,
  },
  tableWrapper3TXT: {
    fontWeight: '600',
    color: 'black',
    fontSize: 18,
  },
  categorySelection: {
    marginHorizontal: 16,
  },
  grpData: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
    height: 420,
  },
  selectedView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  input: {
    width: 200,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitBtn: {
    //     position: 'absolute',
    //     alignSelf: 'center',
    marginVertical: 10,
    bottom: 0,
    zIndex: 0,
  },
  btn: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 18,
    flexWrap: 'wrap',
    width: 150,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'center', color: 'black', padding: 2},
  row: {height: 'auto'},
  tableInput: {
    height: 40,
    marginHorizontal: 6,
    marginVertical: 6,
  },

  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginHorizontal: 6,
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
  segmentBtn: {
    marginHorizontal: 14,
    marginTop: '5%',
  },
});

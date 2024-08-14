import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  BackHandler,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  TextInput,
  SegmentedButtons,
  DefaultTheme,
  Appbar,
  Card,
} from 'react-native-paper';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import api from '../../../../../api.json';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../../../components/Context/Context';
import { IconButton, MD3Colors } from 'react-native-paper';
import { OpdpageNavigation } from './OpdpageNavigation';

const OpdComplaints = () => {
  // comming from dashboard.....
  // const {appointment_id, newpatient_id, depart_id, doctor_id} = route.params;
  const navigation = useNavigation();
  const [p_category, setP_category] = useState('');
  const [p_category2, setP_category2] = useState('');
  const [selectedCategoryData, setSelectedCategoryData] = useState('');
  const [selectedCategoryData2, setSelectedCategoryData2] = useState('');
  const [selectedRow, setSelectedRow] = useState([]);
  //table content ....
  const [widthArr, setWidthArr] = useState([]);
  const [widthArr1, setWidthArr1] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    patientsData,
    scannedPatientsData,
    waitingListData,
    userData,
  } = useContext(UserContext);
  const { hospital_id, patient_id, reception_id, uhid } = patientsData;
  const { appoint_id, mobilenumber } = scannedPatientsData;
  //popup msg....

  const keys = ['Symptoms', 'Duration', 'Time', 'Frequency', 'Remark', 'Action'];
  const keys2 = [
    'Category',
    'Symptoms',
    'Duration',
    'Time',
    'Frequency', 'Remark',
    'Action',
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
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // to set width of table ......
  useEffect(() => {
    setWidthArr([110, 80, 120, 150, 130, 140, ...Array(keys?.length).fill(2)]);
    setWidthArr1([90, 90, 70, 80, 90, 100, 60, ...Array(keys2?.length).fill(2)]);
  }, []);

  const updateSelectedCategoryData = selectedValue => {
    setSelectedCategoryData(selectedValue);
  };

  const updateSelectedCategoryData2 = selectedValue => {
    setSelectedCategoryData2(selectedValue);
  };
  const [dropdownValues, setDropdownValues] = useState([]);
  const [dropdownValues2, setDropdownValues2] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [selectionValue, setSelectionValue] = useState('Medical');
  const [selectionCategory, setSelectionCategory] = useState([]);

  const [rowData, setRowData] = useState([]);
  const [opdAssessment, setOpdAssessment] = useState([]);

  //  search input ....

  const [searchInput, setSearchInput] = useState('')

  const inputChangeHandler = (id, field, value) => {
    // Update the corresponding row's data in rowData
    setRowData(prevData => prevData.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };
  useEffect(() => {
    if (selectionValue || userData?.hospital_id || hospital_id) {
      FetchMobileComplaintsCategory();
    }
  }, [selectionValue]);

  //FetchMobileComplaintsCategory .....
  const FetchMobileComplaintsCategory = async () => {
    await axios
      .post(`${api.baseurl}/FetchMobileComplaintsCategory`, {
        hospital_id: hospital_id || userData?.hospital_id,
        reception_id: reception_id || userData?._id,
        patient_id: patient_id,
        type: selectionValue,
      })
      .then(res => {
        const { status, message } = res.data;
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
          hospital_id: userData?.hospital_id,
          reception_id: userData?._id,
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
  }, [userData?.hospital_id, userData?.reception_id]);

  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: userData?.hospital_id || hospital_id,
          reception_id: userData?._id || reception_id,
          patient_id: patient_id,
          appoint_id: waitingListData?.appoint_id || appoint_id,
          api_type: 'OPD-COMPLAINTS',
          uhid: uhid,
          mobilenumber: waitingListData?.mobilenumber || mobilenumber,
        })
        .then(res => {
          const DATA = JSON.stringify(res.data.data);
          const parsedData = JSON.parse(DATA);
          const filteredData = parsedData.filter(item =>
            Object.values(item).some(
              value => Array.isArray(value) && value?.length > 0,
            ),
          );
          const filteredString = JSON.stringify(filteredData);
          const parsedData2 = JSON.parse(filteredString);
          setOpdAssessment(parsedData2);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const displayData = opdAssessment.map((item, index) => (
    <View key={index}>
      {Object.entries(item).map(([key, value]) => (
        <Card key={key} style={styles.card}>
          {Array.isArray(value) ? (
            <Text style={{ lineHeight: 20 }}>{value.join('\n')}</Text>
          ) : null}
        </Card>
      ))}
    </View>
  ));

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
  const _addSelectedDataHandler = (data, _id) => {
    const selectedRow = data.find(row => row.id === _id);
    setSelectedRow(prevSelectedRows => [...prevSelectedRows, selectedRow]);

  };

  // remove selected data handler ....
  const _removeSelectedDataHandler = _id => {
    // Filter out data with the specified id
    const updatedSelectedRow = selectedRow.filter(row => row.id !== _id);
    setSelectedRow(updatedSelectedRow);
  };

  const submitHandler = async () => {
    const _body = {
      hospital_id: hospital_id || userData?.hospital_id,
      reception_id: reception_id || userData?._id,
      patient_id: patient_id,
      appoint_id: waitingListData?.appoint_id || appoint_id,
      complaintArray: selectedRow,
      api_type: 'OPD-COMPLAINTS',
      uhid: uhid,
      mobilenumber: waitingListData?.mobilenumber || mobilenumber,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const { status, message } = res.data;
          if (status === true) {
            setRowData([]);
            setSelectedCategoryData([]);
            setDropdownValues([]);
            setDropdownValues2([]);
            setP_category('');
            setSelectedRow([]);
            FetchMobileOpdAssessment();
            setSearchInput('')
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

  const _handleMore = () => {
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [addSymptomName, setAddSymptomsName] = useState('');

  const addsymptomsHandler = text => {
    setAddSymptomsName(text);
  };

  const AddSymptomsHandler = async () => {
    if (selectedCategoryData2) {
      try {
        await axios
          .post(`${api.baseurl}/AddMobileSymptomsDirectly`, {
            hospital_id: hospital_id,
            maincategory: selectionValue,
            category: selectedCategoryData2,
            illnessname: addSymptomName,
          })
          .then(res => {
            const { status, message } = res.data;
            if (status === true) {
              setModalVisible(!modalVisible);
              setAddSymptomsName('');
              setP_category2('');
              Alert.alert('Success', message);
            } else {
              Alert.alert('Info', message);
            }
          });
      } catch (error) {
        Alert.alert('Error', error);
      }
    } else {
      Alert.alert('Warning', 'Select Category First');
    }
  };
  const showAlert = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ color: 'black', fontWeight: '600', marginBottom: 6 }}>
            Select Category
          </Text>
          <Dropdown
            mode={'outlined'}
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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
            value={p_category2}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={item => {
              setP_category2(item.value);
              updateSelectedCategoryData2(item.value);

              setIsFocus2(false);
            }}
          />
          <Text style={{ color: 'black', fontWeight: '600', marginVertical: 6 }}>
            Enter Symptoms Name
          </Text>
          <TextInput
            style={{ backgroundColor: '#ffffff', borderWidth: 1 }}
            value={addSymptomName}
            onChangeText={text => addsymptomsHandler(text)}
          />
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                AddSymptomsHandler();
              }}>
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  // filter data....
  const filterData = rowData?.filter(row => {
    return row.symptoms && row.symptoms.toLowerCase().includes(searchInput.toLowerCase())
  });


  return (
    <>
      {showAlert()}
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Complaints" />
        <Appbar.Action
          icon="account-details"
          size={30}
          onPress={() => openMenu()}
        />
      </Appbar.Header>

      <OpdpageNavigation
        closeMenu={closeMenu}
        openMenu={openMenu}
        _handleMore={_handleMore}
        visible={visible}
      />

      {/* after submit Msg... */}

      <View style={styles.container}>
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
          <View style={styles.grpDiv}>
            <View style={{ width: '70%' }}>
              <Dropdown
                mode={'outlined'}
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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
            <Button mode="contained" onPress={() => setModalVisible(true)}>
              Add
            </Button>
          </View>
        </View>
        <View style={[styles.categorySelection]}>

          {/* search filter input .... */}
          <TextInput value={searchInput} placeholder='Search Symptoms' onChangeText={(text) => setSearchInput(text)} style={{ marginHorizontal: 6 }} right={<TextInput.Icon icon="filter-variant" onPress={() => setSearchInput('')} />} />


          {/* category details.... */}
          <Text style={styles.tableWrapper3TXT}>Category Details</Text>
          <ScrollView horizontal>
            <View style={{ height: 'auto', maxHeight: 200 }}>
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
              <ScrollView vertical>

                {/* <ScrollView vertical={true} style={styles.dataWrapper}> */}
                <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
                  <Rows
                    // data={tableData}
                    data={filterData?.length > 0 && filterData.map((row) => [
                      row.symptoms,
                      <TextInput
                        key={row.id}
                        style={styles.tableInput}
                        keyboardType="numeric"
                        onChangeText={text =>
                          inputChangeHandler(row.id, 'duration', text)
                        }
                      />,
                      <Dropdown
                        key={row.id}
                        style={[
                          styles.dropdown,
                          isFocus && { borderColor: 'blue' },
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
                          inputChangeHandler(row.id, 'time', item.value);
                        }}
                      />,
                      <Dropdown
                        key={row.id}
                        style={[
                          styles.dropdown,
                          isFocus && { borderColor: 'blue' },
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
                          inputChangeHandler(row.id, 'frequency', item.value);
                        }}
                      />,
                      <TextInput
                        key={row.id}
                        style={styles.tableInput}
                        onChangeText={text =>
                          inputChangeHandler(row.id, 'remark', text)
                        }
                      />,
                      <Button
                        key={row.id}
                        style={{ width: 'auto', marginHorizontal: 30 }}
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
                {/* </ScrollView> */}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        {selectedRow?.length > 0 && (
          <View style={[styles.categorySelection]}>
            <ScrollView horizontal style={{ padding: 10 }}>
              <View style={{ height: 'auto', maxHeight: 150 }}>
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
                  <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
                    <Rows
                      // data={tableData}
                      data={selectedRow.map(row => [
                        row.category,
                        row.symptoms,
                        row.duration,
                        row.time,
                        row.frequency,
                        row.remark,
                        <IconButton
                          key={row.id}
                          icon="trash-can"
                          iconColor={MD3Colors.error50}
                          size={20}
                          onPress={() => _removeSelectedDataHandler(row?.id)}
                        />,
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
            Submit
          </Button>

          <Button
            style={styles.submitBtn}
            mode="contained"
            onPress={() => _buttonHandler('Skip')}>
            Next / Skip
          </Button>
        </View>
        <ScrollView vertical style={{ maxHeight: '100%' }}>{displayData}</ScrollView>
      </View>
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
    // marginBottom: 6,
    padding: 12,
    gap: 10,
  },
  tableWrapper3TXT: {
    fontWeight: '600',
    color: 'black',
    fontSize: 18,
    marginTop: 6
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

  btn: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 4
  },
  label: {
    fontWeight: '600',
    fontSize: 18,
    flexWrap: 'wrap',
    width: 150,
  },
  head: { height: 40, backgroundColor: '#80aaff' },
  text: { textAlign: 'center', color: 'black', padding: 2 },
  row: { height: 'auto' },
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
    marginTop: '2%',
  },
  card: {
    marginTop: 10,
    marginHorizontal: 14,
    marginBottom: 10,
    width: 330,
    padding: 10,
  },
  cardBody: {
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
  },
  cardtext: {
    fontWeight: '600',
    color: 'black',
    textTransform: 'uppercase',
    width: 100,
  },
  cardtext2: {
    fontWeight: '600',
    flexWrap: 'wrap',
    // width: 100,
  },
  cardBodyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  grpDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 10,
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
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginVertical: 6,
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
});
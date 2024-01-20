import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';

const EpatientPresentComplaint = () => {
  const navigation = useNavigation();
  const [p_category, setP_category] = useState('');
  const [selectedCategoryData, setSelectedCategoryData] = useState('');
  //table content ....
  const [widthArr, setWidthArr] = useState([]);

  const {patientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;

  const keys = ['Name', 'Symptoms', 'Days', 'Hrs', 'Min', 'Frequency'];
  let data = [
    {
      label: 'Often',
      value: 'Often',
    },
    {
      label: 'Once',
      value: 'Once',
    },
  ];
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
    setWidthArr([120, 120, 60, 60, 60, 120, ...Array(keys.length).fill(2)]);
  }, []);

  const category = [
    {
      value: 'GENERAL',
      label: 'GENERAL',
    },
    {
      value: 'CARDIO-VASCULAR',
      label: 'CARDIO-VASCULAR',
    },
    {
      value: 'RESPIRATORY',
      label: 'RESPIRATORY',
    },
    {
      value: 'Gastro-Intestinal',
      label: 'GASTRO-INTESTINAL',
    },
    {
      value: 'EYE',
      label: 'EYE',
    },
    {
      value: 'ENT',
      label: 'ENT',
    },
    {
      value: 'NEUROLOGICAL',
      label: 'NEUROLOGICAL',
    },
    {
      value: 'MUSCULO-SKELETAL',
      label: 'MUSCULO-SKELETAL',
    },
    {
      value: 'GenitoUrinary',
      label: 'GENITOURINARY',
    },
    {
      value: 'Endocrine',
      label: 'ENDOCRINE',
    },
    {
      value: 'SKIN',
      label: 'SKIN',
    },
    {
      value: 'PSYCHITRIC',
      label: 'PSYCHITRIC',
    },
    {
      value: 'OTHER',
      label: 'OTHER',
    },
  ];

  const updateSelectedCategoryData = selectedValue => {
    setSelectedCategoryData(selectedValue);
  };
  const [dropdownValues, setDropdownValues] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const _data = {
    symptoms: '',
    days: '',
    hours: '',
    minute: '',
    frequency: '',
  };
  const [rowData, setRowData] = useState([]);

  const inputChangeHandler = (rowIndex, field, text) => {
    // Copy the existing array
    const newData = [...rowData];

    // Update the specific row and field
    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: text,
    };

    // Update the state with the new data
    setRowData(newData);
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
        })
        .then(res => {
          const _data = res.data.data.map(res => ({
            illnessname: res.illnessname,
            symptoms: '',
            days: '',
            hours: '',
            minute: '',
            frequency: '',
            id: res._id,
          }));

          setRowData(_data);
          console.log('update data ; ', _data);
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
    setDropdownValues([]); // Clear the value when category changes
  }, [selectedCategoryData]);

  const submitHandler = () => {
    // Filter out the rows where all fields are filled
    const filledRows = rowData.filter(
      row =>
        (row.symptoms !== '' && row.frequency !== '') ||
        row.days !== '' ||
        row.hours !== '' ||
        row.minute !== '',
    );

    // Do something with the filtered rows, for example, send them to the server
    console.log('Filled Rows:', filledRows);

    // Clear the form data
    setRowData([]);
    setSelectedCategoryData([]);
    setDropdownValues([]);
    setP_category('');
    navigation.navigate('Eipdoptions');
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
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
              data={category?.map(res => ({
                label: res.label,
                value: res.value,
              }))}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select' : '...'}
              searchPlaceholder="Search..."
              value={p_category}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setP_category(item.value);
                updateSelectedCategoryData(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View
          style={[styles.categorySelection, {marginBottom: keyboardHeight}]}>
          <Text style={styles.tableWrapper3TXT}>Category Details</Text>

          <ScrollView horizontal={true} style={{padding: 10}}>
            <View style={{height: '90%', minHeight: 300}}>
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
                      row.illnessname,
                      <TextInput
                        key={row.id}
                        style={styles.tableInput}
                        onChangeText={text =>
                          inputChangeHandler(rowIndex, 'symptoms', text)
                        }
                      />,
                      <TextInput
                        key={row.id}
                        style={styles.tableInput}
                        keyboardType="numeric"
                        onChangeText={text =>
                          inputChangeHandler(rowIndex, 'days', text)
                        }
                      />,
                      <TextInput
                        key={row.id}
                        style={styles.tableInput}
                        keyboardType="numeric"
                        onChangeText={text =>
                          inputChangeHandler(rowIndex, 'hours', text)
                        }
                      />,
                      <TextInput
                        key={row.id}
                        style={styles.tableInput}
                        keyboardType="numeric"
                        onChangeText={text =>
                          inputChangeHandler(rowIndex, 'minute', text)
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
      </KeyboardAvoidingView>

      <Button
        style={styles.submitBtn}
        mode="contained"
        onPress={() => submitHandler()}>
        Save
      </Button>
    </SafeAreaView>
  );
};

export default EpatientPresentComplaint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: 10,
    bottom: 0,
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
    borderWidth: 0.5,
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
});

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
import DropDown from 'react-native-paper-dropdown';
import {Button, TextInput} from 'react-native-paper';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';
import {Dropdown} from 'react-native-element-dropdown';

const EpatientPresentComplaint = () => {
  const [p_category, setP_category] = useState('');
  const [selectedCategoryData, setSelectedCategoryData] = useState('');
  //table content ....
  const [tableData, setTableData] = useState([]);
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
    // const selectedData = categoryData[selectedValue] || [];
    setSelectedCategoryData(selectedValue);
  };
  const [value, setValue] = useState('');
  const [dropdownValues, setDropdownValues] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
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
          const SymptomsData = res.data.data.map(res => [
            res.illnessname,
            <TextInput style={styles.tableInput} />,
            <TextInput style={styles.tableInput} />,
            <TextInput style={styles.tableInput} />,
            <TextInput style={styles.tableInput} />,

            // <Dropdown
            //   key={res._id}
            //   style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            //   placeholderStyle={styles.placeholderStyle}
            //   selectedTextStyle={styles.selectedTextStyle}
            //   inputSearchStyle={styles.inputSearchStyle}
            //   iconStyle={styles.iconStyle}
            //   data={data}
            //   // search
            //   maxHeight={300}
            //   labelField="label"
            //   valueField="value"
            //   placeholder={!isFocus ? 'Select' : '...'}
            //   // searchPlaceholder="Search..."
            //   value={value}
            //   onFocus={() => setIsFocus(true)}
            //   onBlur={() => setIsFocus(false)}
            //   onChange={item => {
            //     setValue(item.value);
            //     setIsFocus(false);
            //   }}
            // />,
            <Dropdown
              key={res._id}
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select' : '...'}
              value={dropdownValues[res._id] || ''} // Use the value from the array
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                // Update the array with the new value
                setDropdownValues(prevValues => ({
                  ...prevValues,
                  [res._id]: item.value,
                }));
                setIsFocus(false);
              }}
            />,
          ]);
          setTableData(SymptomsData);
        });
      6;
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
                    // data={dataSet.map(row => Object.values(row))}
                    data={tableData}
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
        onPress={() => console.log('Pressed')}>
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

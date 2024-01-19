import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDown from 'react-native-paper-dropdown';
import {Button, TextInput} from 'react-native-paper';
import {Table, Row, Rows} from 'react-native-table-component';

const EpatientPresentComplaint = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [p_category, setP_category] = useState('');
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  //table content ....
  const [tableData, setTableData] = useState([]);
  const [widthArr, setWidthArr] = useState([]);
  const [p_relation, setP_relation] = useState('');
  const [showRelation, setShowRelation] = useState(false);

  const keys = ['Name', 'Symptoms', 'Days', 'Hrs', 'Min', 'Frequency'];
  let relation = [
    {
      label: 'Father',
      value: 'Father',
    },
    {
      label: 'Mother',
      value: 'Mother',
    },
  ];
  const dataSet = [
    {
      Name: 'Sumit Sjkhkjkjhkjhl kjjhkjhkh',
      Symptoms: 'fever',
      Days: '4',
      Hrs: '3',
      Min: '35',
      Frequency: (
        <View
          style={{width: '85%', marginBottom: 5, marginLeft: 10, marginTop: 5}}>
          <DropDown
            placeholder="Frequency"
            mode={'outlined'}
            dropDownStyle={{backgroundColor: 'white', height: 150}}
            visible={showRelation}
            showDropDown={() => setShowRelation(true)}
            onDismiss={() => setShowRelation(false)}
            value={p_relation}
            setValue={setP_relation}
            list={relation?.map(res => ({
              label: res.label,
              value: res.value,
            }))}
          />
        </View>
      ),
    },
  ];

  // to set width of table ......
  useEffect(() => {
    // Set a specific width for the 'Sr.No' column, and the same width for the rest
    setWidthArr([120, 80, 50, 50, 50, 120, ...Array(keys.length).fill(2)]);
  }, []);

  const category = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

  const categoryData = {
    Male: [
      {
        value: 'Sumit',
        label: 'Sumit Solapurkar',
      },
      {
        value: 'Pranay',
        label: 'Pranay',
      },
      {
        value: 'Master',
        label: 'Master',
      },
      {
        value: 'Pawan',
        label: 'Pawan',
      },
      {
        value: 'John',
        label: 'John',
      },
      {
        value: 'Sam',
        label: 'Sam',
      },
      {
        value: 'Jack',
        label: 'Jack',
      },
      {
        value: 'Oggy',
        label: 'Oggy',
      },
    ],
    Female: [
      {
        value: 'Sayali',
        label: 'Sayali',
      },
      {
        value: 'Neha',
        label: 'Neha',
      },
    ],
    Other: [
      {
        value: 'Yash',
        label: 'Yash',
      },
    ],
  };

  const updateSelectedCategoryData = selectedValue => {
    const selectedData = categoryData[selectedValue] || [];
    setSelectedCategoryData(selectedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.tableWrapper3TXT}>Category</Text>
        <View style={{width: '60%'}}>
          <DropDown
            mode={'outlined'}
            label="Category"
            dropDownStyle={{backgroundColor: 'white'}}
            visible={showCategory}
            showDropDown={() => setShowCategory(true)}
            onDismiss={() => setShowCategory(false)}
            value={p_category}
            setValue={value => {
              setP_category(value);
              updateSelectedCategoryData(value);
            }}
            list={category?.map(res => ({
              label: res.label,
              value: res.value,
            }))}
          />
        </View>
      </View>
      <View style={styles.categorySelection}>
        <Text style={styles.tableWrapper3TXT}>Category Details</Text>

        <ScrollView horizontal={true} style={{padding: 10}}>
          <View style={{height: 300}}>
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
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={dataSet.map(row => Object.values(row))}
                  widthArr={widthArr}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
});

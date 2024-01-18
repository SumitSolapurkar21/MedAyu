import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DropDown from 'react-native-paper-dropdown';
import {Button, TextInput} from 'react-native-paper';

const EpatientTreatment = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [p_category, setP_category] = useState('');
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);

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
        <ScrollView vertical style={styles.grpData}>
          {selectedCategoryData.map((data, index) => (
            <View style={styles.selectedView} key={index}>
              <Text style={styles.label}>{data.label}</Text>
              <View style={styles.input}>
                <TextInput mode="flat" />
              </View>
            </View>
          ))}
        </ScrollView>
        <View>
          <Button
            style={styles.submitBtn}
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Save
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EpatientTreatment;

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
    padding: 12,
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
  },
  label: {
    fontWeight: '600',
    fontSize: 18,
    flexWrap: 'wrap',
    width: 150,
  },
});

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const EpatientTreatment = () => {
  const [rowData, setRowData] = useState([
    {id: 1, label: 'Name', value: ''},
    {id: 2, label: 'Age', value: ''},
    {id: 3, label: 'Number', value: ''},
  ]);

  const inputChangeHandler = (id, text) => {
    setRowData(prevData => {
      return prevData.map(item =>
        item.id === id ? {...item, value: text} : item,
      );
    });
  };

  const addButtonPressHandler = () => {
    // Add a new set of input fields dynamically
    const newId = rowData.length + 1;
    const newFields = [
      {id: newId, label: `Name`, value: ''},
      {id: newId + 1, label: `Age`, value: ''},
      {id: newId + 2, label: `Number`, value: ''},
    ];
    setRowData(prevData => [...prevData, ...newFields]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Treatments</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputGroup}>
        {rowData.map(item => (
          <TextInput
            key={item.id}
            mode="outlined"
            label={item.label}
            style={styles.input}
            value={item.value}
            onChangeText={text => inputChangeHandler(item.id, text)}
          />
        ))}
      </ScrollView>
      <View style={styles.addButton}>
        <TouchableOpacity style={styles.btn} onPress={addButtonPressHandler}>
          <FontAwesome6
            name="plus"
            size={18}
            color="#ffffff"
            style={{textAlign: 'center'}}
          />
        </TouchableOpacity>
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
  heading: {
    fontWeight: '600',
    fontSize: 18,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  inputGroup: {
    marginHorizontal: 14,
    gap: 4,
  },
  input: {
    marginBottom: 8,
  },
  addButton: {
    marginVertical: 10,
    marginHorizontal: 14,
    alignSelf: 'flex-end',
  },
  btn: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#289ffa',
    height: 40,
    width: 40,
  },
});

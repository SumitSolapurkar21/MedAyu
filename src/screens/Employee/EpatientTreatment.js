import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {List, TextInput} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';

const EpatientTreatment = () => {
  const [searchInput, setSearchInput] = useState('');
  const [drugCode, setDrugCode] = useState('');
  const [selectedDrugCode, setSelectedDrugCode] = useState('');
  const [visibleList, setVisibleList] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [newArray, setNewArray] = useState([]); // State to store new data

  const {patientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const [drugCodeChanges, setDrugCodeChanges] = useState(0);

  useEffect(() => {
    if (searchInput !== '') searchInputHandler();
  }, [searchInput]);

  const searchInputHandler = async () => {
    try {
      const response = await axios.post(
        `${api.baseurl}/search_prescription_data`,
        {
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
          text: searchInput,
        },
      );

      const _drugCode = response.data.data.map(res => ({
        drugcode: res.drugcode,
        drugname: res.drugname,
      }));

      setDrugCode(_drugCode);
      setSelectedData(response.data.data);
      setVisibleList(true);
    } catch (error) {
      console.error(error);
    }
  };

  const _filterData = selectedData.filter(
    res => res.drugcode === selectedDrugCode.drugcode,
  );

  const addButtonPressHandler = () => {
    const newDrugData = {
      drugcode: '',
      drugname: '',
      dose: '',
      anupan: '',
      route: '',
      schedule: '',
      duration: '',
    };
    setNewArray([...newArray, newDrugData]);
    setVisibleList(false);
  };

  const resetHandler = () => {
    setSearchInput('');
    setSelectedDrugCode([]);
    setVisibleList(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Treatments</Text>
      <TextInput
        mode="outlined"
        label="Drug Code"
        placeholder="Search Drug Code ..."
        style={[styles.input, {marginHorizontal: 14}]}
        value={
          selectedDrugCode?.drugcode ? selectedDrugCode?.drugcode : searchInput
        }
        onChangeText={text => {
          setSearchInput(text), setSelectedDrugCode('');
        }}
        right={<TextInput.Icon icon="close" onPress={() => resetHandler()} />}
      />
      <ScrollView
        style={{
          zIndex: 1,
          marginHorizontal: 14,
          maxHeight: drugCode.length > 0 && visibleList ? 200 : 0,
        }} // Set a higher zIndex for the ScrollView
        vertical={true}>
        {visibleList && (
          <View>
            {drugCode?.map(res => (
              <List.Item
                style={styles.listView}
                title={res?.drugname}
                key={res?.drugcode}
                onPress={() => {
                  setSelectedDrugCode({
                    drugcode: res.drugcode,
                    drugname: res.drugname,
                  });
                  setVisibleList(false);
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputGroup}>
        {_filterData.map(res => {
          return (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Drug Code : </Text>
                <Text style={styles.para}>{res.drugcode}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Drug Name : </Text>
                <Text style={styles.para}>{res.drugname}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Dose : </Text>
                <Text style={styles.para}>{res.dose}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Instruction : </Text>
                <Text style={styles.para}>{res.anupan}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Route : </Text>
                <Text style={styles.para}>{res.route}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Schedule : </Text>
                <Text style={styles.para}>{res.schedule}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Days : </Text>
                <Text style={styles.para}>{res.duration}</Text>
              </View>
            </View>
          );
        })}
        {newArray.map((newData, index) => (
          <View style={styles.card} key={index}>
            {/* Render new data with empty values */}
            <View style={styles.cardContent}>
              <Text style={styles.label}>Drug Code : </Text>
              <Text style={styles.para}>{newData.drugcode}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>Drug Name : </Text>
              <Text style={styles.para}>{newData.drugname}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>Dose : </Text>
              <Text style={styles.para}>{newData.dose}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>Instruction : </Text>
              <Text style={styles.para}>{newData.anupan}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>Route : </Text>
              <Text style={styles.para}>{newData.route}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>Schedule : </Text>
              <Text style={styles.para}>{newData.schedule}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.label}>Duration : </Text>
              <Text style={styles.para}>{newData.duration}</Text>
            </View>
          </View>
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
  listView: {
    backgroundColor: '#ede8ed',
    marginBottom: 2,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
  },
  card: {
    borderWidth: 0.7,
    borderRadius: 6,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 5,
  },
  label: {
    fontWeight: '600',
    color: 'black',
    width: 100,
  },
  para: {
    fontWeight: '600',
    flexWrap: 'wrap',
    width: 225,
    maxWidth: 225,
  },
});

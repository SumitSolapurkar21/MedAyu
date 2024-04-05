import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {
  Appbar,
  Dialog,
  List,
  Portal,
  SegmentedButtons,
  DefaultTheme,
  Button,
  TextInput,
} from 'react-native-paper';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import DateTimePicker from 'react-native-ui-datepicker';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

const OpdProcedure = () => {
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('OpdTreatment');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const navigation = useNavigation();
  const {patientsData} = useContext(UserContext);
  const {hospital_id} = patientsData;
  const [selectionValue, setSelectionValue] = useState(null);
  const [p_category, setP_category] = useState('');
  const [isFocus2, setIsFocus2] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [_searchProcedure, _setSearchProcedure] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [visibleList, setVisibleList] = useState(false);
  const [temp, setTemp] = useState([]);
  const [selectedProcedureCode, setSelectedProcedureCode] = useState('');
  const [selectedProcedureDataCode, setSelectedProcedureDataCode] =
    useState('');

  const [_category, _setCategory] = useState(null);
  useEffect(() => {
    const _GetPanchakarmaCategoryMobile = async () => {
      try {
        await axios
          .post(`${api.baseurl}/GetPanchakarmaCategoryMobile`, {
            hospital_id: hospital_id,
          })
          .then(res => {
            const {status, message} = res.data;
            if (status === true) {
              _setCategory(res.data.data);
              setSelectionValue(
                res.data.data.length > 0 ? res.data.data[0].category_id : null,
              );
            } else {
              console.error(message);
            }
          });
      } catch (error) {
        console.error(error);
      }
    };

    _GetPanchakarmaCategoryMobile();
  }, [hospital_id]);

  const theme = {
    ...DefaultTheme,
    roundness: 0, // Set roundness to 0 to remove borderRadius
  };

  //dropdown for procedure type .....
  const _dropdowndata = [
    {
      label: 'Single',
      value: 'Single',
    },
    {
      label: 'Prototype',
      value: 'Prototype',
    },
    {
      label: 'Combo',
      value: 'Combo',
    },
  ];

  //search input handler ...
  useEffect(() => {
    const searchInputHandler = async () => {
      try {
        await axios
          .post(`${api.baseurl}/SearchPanchakarmaProcedureMobile`, {
            hospital_id: hospital_id,
            category_id: selectionValue,
            proceduretype: p_category,
            text: searchInput,
          })
          .then(res => {
            const _procedurename = res.data.data.map(res => ({
              procedure_id: res.procedure_id,
              procedurename: res.procedurename,
            }));
            setSelectedProcedureCode(_procedurename);
            setSelectedProcedure(res.data.data);
            setVisibleList(true);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (searchInput !== '') searchInputHandler();
  }, [searchInput]);

  useEffect(() => {
    // Update temp array when selectedDrugCode changes
    if (selectedProcedureDataCode !== '') {
      const filteredData = selectedProcedure?.filter(
        res => res.procedure_id === selectedProcedureDataCode?.procedure_id,
      );
      setTemp(prevData => [...prevData, ...filteredData]);
    }
  }, [selectedProcedureDataCode, selectedProcedure]);
  const resetHandler = () => {
    setSearchInput('');
  };

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('OpdTreatment');
          }}
        />
        <Appbar.Content title="OPD Procedure" style={styles.appbar_title} />
      </Appbar.Header>
      <View style={styles.container}>
        <View>
          <ScrollView horizontal style={styles.categoryTabs}>
            {_category ? (
              <SegmentedButtons
                theme={theme}
                style={styles.segmentBtn}
                value={selectionValue}
                onValueChange={setSelectionValue}
                buttons={_category.map(res => ({
                  label: res.category,
                  value: res.category_id,
                }))}
              />
            ) : (
              <Text>Loading...</Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.dropdownCategory}>
          <Text style={styles.heading}>Procedure Type</Text>
          <View style={{width: '70%'}}>
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
              value={p_category}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={item => {
                setP_category(item.value);
                setIsFocus2(false);
              }}
            />
          </View>
        </View>
        <View style={styles.searchInput}>
          <Text style={styles.heading}>Search Procedure</Text>
          <TextInput
            mode="outlined"
            label="Procedure"
            placeholder="Search Procedure ..."
            style={[styles.input]}
            value={
              selectedProcedureCode?.procedurename
                ? selectedProcedureCode?.procedurename
                : searchInput
            }
            onChangeText={text => {
              setSearchInput(text);
            }}
            right={
              <TextInput.Icon icon="close" onPress={() => resetHandler()} />
            }
          />
          <ScrollView
            style={{
              zIndex: 1,
              marginHorizontal: 14,
              //   maxHeight: drugCode.length > 0 && visibleList ? 200 : 0,
            }} // Set a higher zIndex for the ScrollView
            vertical={true}>
            {visibleList && (
              <View>
                {selectedProcedureCode?.map(res => (
                  <List.Item
                    style={styles.listView}
                    title={res?.procedurename}
                    key={res?.procedure_id}
                    onPress={() => {
                      setSelectedProcedureDataCode({
                        procedure_id: res.procedure_id,
                        procedurename: res.procedurename,
                      });
                      setVisibleList(false);
                    }}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles._card}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.inputGroup}>
            {temp.map((res, index) => {
              return (
                <View style={styles.card} key={index}>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}> Name : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.procedurename}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].procedurename = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}> Amount : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.procedureamount}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].procedureamount = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}> Time : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.proceduretime}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].proceduretime = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}> KIT : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.procedurekit}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].procedurekit = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>

                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Instruction : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.procedureinstruction}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].procedureinstruction = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>

                  <View style={styles.cardContent}>
                    <Text style={styles.label}> Day's : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.proceduredays}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].proceduredays = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                </View>
              );
            })}

            <Button
              mode="contained"
              style={[styles.btn, {alignSelf: 'flex-start'}]}
              onPress={() => resetHandler()}>
              Add More
            </Button>
          </ScrollView>
        </View>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdTreatment')}>
            Previous
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdHomePage')}>
            Save
          </Button>

          {/* <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdTreatment')}>
            Skip
          </Button> */}
        </View>
      </View>
    </>
  );
};

export default OpdProcedure;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryTabs: {
    padding: 10,
    paddingBottom: 20,
  },
  segmentBtn: {
    width: 500,
    gap: 2,
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
    marginHorizontal: 6,
  },
  dropdownCategory: {
    marginHorizontal: 12,
    marginBottom: 14,
  },
  heading: {
    color: 'black',
    marginBottom: 4,
    fontWeight: '600',
  },
  searchInput: {
    marginHorizontal: 12,
  },
  listView: {
    backgroundColor: '#ede8ed',
    marginBottom: 2,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
  },
  input2: {
    //     backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingLeft: 0,
    height: 35,
    width: 210,
    maxWidth: 220,
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
  inputGroup: {
    marginHorizontal: 14,
    gap: 4,
  },
  card: {
    borderWidth: 0.7,
    borderRadius: 6,
    marginBottom: 10,
  },
  btn: {
    marginVertical: 12,
    // alignSelf: 'center',
  },
  submitbutton: {
    flexDirection: 'row',
    gap: 10,
    bottom: 10,
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

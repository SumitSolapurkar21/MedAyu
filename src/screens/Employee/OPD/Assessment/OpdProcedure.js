import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, BackHandler} from 'react-native';
import {
  Appbar,
  List,
  SegmentedButtons,
  DefaultTheme,
  Button,
  TextInput,
  IconButton,
  MD3Colors,
  Card,
} from 'react-native-paper';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import OpdpageNavigation from './OpdpageNavigation';

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
  const {
    patientsData,
    scannedPatientsData,
    waitingListData,
    setWaitingListData,
    userData,
  } = useContext(UserContext);

  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id, mobilenumber} = scannedPatientsData;
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
  const [procedureId, setProcedureId] = useState('');
  const [_serviceCategoryArray, _setServiceCategoryArray] = useState([]);

  const [opdAssessment, setOpdAssessment] = useState([]);

  // get service type data :
  useEffect(() => {
    const _fetchservicetype = async () => {
      try {
        await axios
          .post(`${api.baseurl}/FetchServiceType`, {
            hospital_id: userData?.hospital_id,
            reception_id: userData?._id,
          })
          .then(res => {
            const _filterData = res.data.data.filter(
              item => item.servicetype === 'PROCEDURE',
            );
            setProcedureId(_filterData[0]?._id);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (hospital_id !== '' || undefined || null) _fetchservicetype();
  }, []);

  // getservicecategoryacctype ....

  useEffect(() => {
    const _fetchservicecategory = async () => {
      try {
        await axios
          .post(`${api.baseurl}/getservicecategoryacctype`, {
            hospital_id: userData?.hospital_id,
            servicetype_id: procedureId,
            reception_id: userData?._id,
          })
          .then(res => {
            _setServiceCategoryArray(res.data.data);
            const category = res.data.data;
            const defaultCategory = category?.find(
              category => category.servicecategory === 'PANCHAKARMA',
            );
            setSelectionValue(defaultCategory?._id);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (procedureId !== '' || undefined || null) _fetchservicecategory();
  }, [procedureId]);

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
            hospital_id: userData?.hospital_id,
            category_id: selectionValue,
            procedure_id: procedureId,
            text: searchInput,
            reception_id: userData?._id,
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
  }, [selectedProcedureDataCode]);
  const resetHandler = () => {
    setSearchInput('');
    setVisibleList(false);
    setP_category('');
  };

  // remove selected data handler ....
  const _removeSelectedDataHandler = _id => {
    // Filter out data with the specified id
    const updatedSelectedRow = temp?.filter(row => row.procedure_id !== _id);
    setTemp(updatedSelectedRow);
  };

  //submit handler ....
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: userData?.hospital_id,
      patient_id: patient_id,
      reception_id: userData?._id,
      appoint_id: appoint_id || waitingListData?.appoint_id,
      uhid: uhid,
      api_type: 'OPD-PROCEDURE',
      opdprocedurehistoryarray: temp,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            setTemp([]);
            // navigation.navigate('EpatientDetails');
            FetchMobileOpdAssessment();
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchMobileOpdAssessment();
  }, [hospital_id, patient_id, reception_id]);

  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: userData?.hospital_id,
          reception_id: userData?._id,
          patient_id: patient_id,
          appoint_id: appoint_id || waitingListData?.appoint_id,
          api_type: 'OPD-PROCEDURE',
          uhid: uhid,
          mobilenumber: mobilenumber || waitingListData?.mobilenumber,
        })
        .then(res => {
          setOpdAssessment(res.data.data);
          // console.log('res.data.data : ', res.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // navigate handler .....
  const navigateHandler = () => {
    if (waitingListData?.assessmenttype === 'NewAssessment') {
      setWaitingListData([]);
      navigation.replace('Listofpatients');
    } else {
      navigation.replace('EpatientDetails');
    }
  };

  const _handleMore = () => {
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('OpdTreatment');
          }}
        />
        <Appbar.Content title="Procedure" style={styles.appbar_title} />
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
      <ScrollView style={styles.container}>
        <View>
          <ScrollView horizontal style={styles.categoryTabs}>
            {_serviceCategoryArray ? (
              <SegmentedButtons
                theme={theme}
                style={styles.segmentBtn}
                value={selectionValue}
                onValueChange={setSelectionValue}
                buttons={_serviceCategoryArray.map(res => ({
                  label: res.servicecategory,
                  value: res._id,
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.inputGroup}>
          {temp.map((res, index) => {
            // console.log('temp : ', temp);
            return (
              <View style={styles.card} key={index}>
                <View style={styles.cardContentDiv}>
                  <Text style={[styles.label, {width: 200, marginLeft: 10}]}>
                    Name : &nbsp; {res.procedurename}
                  </Text>
                  <IconButton
                    icon="trash-can"
                    iconColor={MD3Colors.error50}
                    size={20}
                    onPress={() =>
                      _removeSelectedDataHandler(res?.procedure_id)
                    }
                  />
                </View>
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
          <View style={styles.submitbutton}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('OpdTreatment')}>
              Previous
            </Button>
            <Button mode="contained" onPress={() => submitTreatmenthandler()}>
              Submit
            </Button>
            <Button mode="contained" onPress={() => navigateHandler()}>
              Home
            </Button>
          </View>
        </ScrollView>
        {opdAssessment.length > 0 &&
          opdAssessment?.map((row, index) => {
            return (
              <Card style={styles.card2} key={index + 1}>
                <Card.Content>
                  <View style={styles.cardBodyHead}>
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Name :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.procedurename}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.cardBody, {gap: 8}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Amount :
                    </Text>
                    <Text variant="titleLarge" style={[styles.cardtext2]}>
                      {row?.procedureamount}
                    </Text>
                  </View>
                  <View style={[styles.cardBody, {gap: 8}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Time :
                    </Text>
                    <Text variant="titleLarge" style={[styles.cardtext2]}>
                      {row?.proceduretime}
                    </Text>
                  </View>
                  <View style={styles.cardBodyHead}>
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Kit :
                      </Text>
                      <Text variant="titleLarge" style={[styles.cardtext2]}>
                        {row?.procedurekit}
                      </Text>
                    </View>
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Instruction :
                      </Text>
                      <Text variant="titleLarge" style={[styles.cardtext2]}>
                        {row?.procedureinstruction}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.cardBody, {gap: 8}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Procedure Type :
                    </Text>
                    <Text variant="titleLarge" style={[styles.cardtext2]}>
                      {row?.proceduretype}
                    </Text>
                  </View>

                  <View style={[styles.cardBody, {gap: 10, width: 'auto'}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Date / Time :
                    </Text>
                    <Text variant="titleLarge" style={styles.cardtext2}>
                      {row.opd_date} / {row.opd_time}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            );
          })}
      </ScrollView>
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
    width: 700,
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingLeft: 0,
    height: 35,
    width: 210,
    maxWidth: 220,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
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
  },
  cardContentDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card2: {
    marginHorizontal: 12,
    marginVertical: 10,
  },
  cardBodyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardtext: {
    fontWeight: '600',
    color: 'black',
    width: 90,
  },
  cardtext2: {
    fontWeight: '600',
    flexWrap: 'wrap',
    width: 200,
  },
});

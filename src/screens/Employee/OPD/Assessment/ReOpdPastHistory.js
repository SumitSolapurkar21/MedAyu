import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
     Alert,
     BackHandler,
     ScrollView,
     StyleSheet,
     Text,
     View,
} from 'react-native';
import { Appbar, Button, List, TextInput, Card } from 'react-native-paper';
import api from '../../../../../api.json';
import DateTimePicker from 'react-native-ui-datepicker';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../../../components/Context/Context';
import { Dropdown } from 'react-native-element-dropdown';
import { IconButton, MD3Colors } from 'react-native-paper';
import { ReAssessmentOpdpageNavigation } from './OpdpageNavigation';

const ReOpdPastHistory = () => {
     const navigation = useNavigation();
     const [searchInput, setSearchInput] = useState('');
     const [illnessCode, setIllnessCode] = useState('');
     const [selectedIllnessCode, setSelectedIllnessCode] = useState('');
     const [visibleList, setVisibleList] = useState(false);
     const [illnessSelectedData, setIllnessSelectedData] = useState([]);
     const [temp, setTemp] = useState([]);
     const [showCalender, setShowCalender] = useState(false);
     const [dateValues, setDateValues] = useState([]);
     // edit...
     const [showCalender1, setShowCalender1] = useState(false);
     const [dateValues1, setDateValues1] = useState([]);
     const [datePickerIndex1, setDatePickerIndex1] = useState([]);

     const [datePickerIndex, setDatePickerIndex] = useState([]);
     const [isFocus2, setIsFocus2] = useState(false);
     const [p_category, setP_category] = useState('');
     const { patientsData, scannedPatientsData, waitingListData, userData } =
          useContext(UserContext);
     const { hospital_id, patient_id, reception_id, uhid } = patientsData;
     const { appoint_id, mobilenumber } = scannedPatientsData;

     const [opdAssessmentforEdit, setOpdAssessmentforEdit] = useState([]);

     //backHandler ...
     useEffect(() => {
          const backAction = () => {
               navigation.replace('ReOpdComplaints');
               return true;
          };

          const backHandler = BackHandler.addEventListener(
               'hardwareBackPress',
               backAction,
          );

          return () => backHandler.remove();
     }, []);

     useEffect(() => {
          if (searchInput !== '') searchInputHandler();
     }, [searchInput]);

     useEffect(() => {
          // Update temp array when selectedIllnessCode changes
          if (selectedIllnessCode !== '') {
               const filteredData = illnessSelectedData.filter(
                    res => res.illness_id === selectedIllnessCode.illness_id,
               );
               setTemp(prevData => [...filteredData, ...prevData]);
          }
     }, [selectedIllnessCode, illnessSelectedData]);

     const searchInputHandler = async () => {
          try {
               const response = await axios.post(
                    `${api.baseurl}/search_opd_past_history`,
                    {
                         hospital_id: userData?.hospital_id,
                         patient_id: patient_id,
                         reception_id: userData?._id,
                         text: searchInput,
                    },
               );
               const _illnessCode = response.data.data.map(res => ({
                    illness_id: res.illness_id,
                    illnessname: res.illnessname,
               }));

               setIllnessCode(_illnessCode);
               setIllnessSelectedData(response.data.data);
               setVisibleList(true);
          } catch (error) {
               console.error(error);
          }
     };

     const resetHandler = () => {
          setSearchInput('');
          setSelectedIllnessCode('');
          setVisibleList(false);
     };
     const Themes = [{ mainColor: '#F5803E', activeTextColor: '#fff' }];

     const calenderHandler = index => {
          setShowCalender(true);
          setDatePickerIndex(index); // Set the index of the date field for which the calendar is being opened
     };

     const calenderHandler1 = index => {
          setShowCalender1(true);
          setDatePickerIndex1(index); // Set the index of the date field for which the calendar is being opened
     };

     const handleDateChange = async (date, index) => {
          const [_dateformat] = date.split(' ');
          const updatedTemp = [...temp];
          updatedTemp[index].activestatus = true;
          updatedTemp[index].dateValues = _dateformat; // Store the selected date in the temp array
          const updatedDateValues = [...dateValues];
          updatedDateValues[index] = _dateformat;
          setDateValues(updatedDateValues);

          updatedTemp[index].treatment_status = p_category;
          try {
               await axios
                    .post(`${api.baseurl}/GetMobiledatedetails`, {
                         date: _dateformat,
                    })
                    .then(res => {
                         // const updatedTemp = [...temp];
                         updatedTemp[index] = {
                              ...updatedTemp[index],
                              days: res.data.days.toString(),
                              months: res.data.month.toString(),
                              years: res.data.year.toString(),
                         };
                         setTemp(updatedTemp);

                         setShowCalender(false);
                    });
          } catch (error) {
               Alert.alert('Error !!', `${error}`);
          }
     };
     const handleDateChange1 = async (date, index) => {
          const [_dateformat] = date.split(' ');
          const updatedTemp = [...opdAssessmentforEdit];
          updatedTemp[index].activestatus = true;
          updatedTemp[index].dateValues = _dateformat; // Store the selected date in the temp array
          const updatedDateValues = [...dateValues1];
          updatedDateValues[index] = _dateformat;
          setDateValues1(updatedDateValues);

          updatedTemp[index].treatment_status = p_category;
          try {
               await axios
                    .post(`${api.baseurl}/GetMobiledatedetails`, {
                         date: _dateformat,
                    })
                    .then(res => {
                         // const updatedTemp = [...temp];
                         updatedTemp[index] = {
                              ...updatedTemp[index],
                              days: res.data.days.toString(),
                              months: res.data.month.toString(),
                              years: res.data.year.toString(),
                         };
                         setOpdAssessmentforEdit(updatedTemp);

                         setShowCalender1(false);
                    });
          } catch (error) {
               Alert.alert('Error !!', `${error}`);
          }
     };

     //submit handler ....
     const submitTreatmenthandler = async () => {
          const _body = {
               hospital_id: userData?.hospital_id || hospital_id,
               patient_id: patient_id,
               reception_id: userData?._id,
               appoint_id: waitingListData?.appoint_id || appoint_id,
               uhid: waitingListData?.uhid || uhid,
               api_type: 'OPD-PAST-HISTORY',
               opdpasthistoryarray: [...temp, ...opdAssessmentforEdit],
               mobilenumber: waitingListData?.mobilenumber || mobilenumber,

          };

          try {
               await axios
                    .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
                    .then(res => {
                         const { status, message } = res.data;
                         if (status === true) {
                              setTemp([]);
                              FetchMobileOpdAssessment();
                              FetchMobileOpdAssessmentForEdit();
                         } else {
                              console.error(`${message}`);
                         }
                    });
          } catch (error) {
               console.error(error);
          }
     };

     let data = [
          {
               label: 'Treated',
               value: 'Treated',
          },
          {
               label: 'On Treatment',
               value: 'Treatment',
          },
     ];

     const [opdAssessment, setOpdAssessment] = useState([]);

     useEffect(() => {
          FetchMobileOpdAssessment();
          FetchMobileOpdAssessmentForEdit();
     }, [hospital_id, patient_id, reception_id]);

     //list of FetchMobileOpdAssessment....
     const FetchMobileOpdAssessment = async () => {
          try {
               await axios
                    .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
                         hospital_id: userData?.hospital_id,
                         reception_id: userData?._id,
                         patient_id: patient_id,
                         appoint_id: waitingListData?.appoint_id || appoint_id,
                         api_type: 'OPD-PAST-HISTORY',
                         uhid: waitingListData?.uhid || uhid,
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

     const FetchMobileOpdAssessmentForEdit = async () => {
          try {
               await axios
                    .post(`${api.baseurl}/FetchMobileOpdAssessmentForEdit`, {
                         hospital_id: userData?.hospital_id || hospital_id,
                         reception_id: userData?._id || reception_id,
                         patient_id: patient_id,
                         appoint_id: waitingListData?.appoint_id || appoint_id,
                         api_type: 'OPD-PAST-HISTORY',
                         uhid: waitingListData?.uhid || uhid,
                         mobilenumber: waitingListData?.mobilenumber || mobilenumber,
                    })
                    .then(res => {
                         const opdData = res.data.opdpasthistoryarray;
                         setOpdAssessmentforEdit(opdData)
                    });
          } catch (error) {
               console.error(error);
          }
     };
     // remove selected data handler ....
     const _removeSelectedDataHandler = _id => {
          // Filter out data with the specified id
          const updatedSelectedRow = temp?.filter(row => row.illness_id !== _id);
          const updatedSelectedRow2 = opdAssessmentforEdit?.filter(row => row.illness_id !== _id);
          setTemp(updatedSelectedRow);
          setOpdAssessmentforEdit(updatedSelectedRow2);
     };

     const displayData = opdAssessment.map((item, index) => (
          <View key={index}>
               {Object.entries(item).map(([key, value]) => (
                    <Card key={key} style={styles.card}>
                         {Array.isArray(value) ? (
                              <Text style={{ lineHeight: 20, width: 300 }}>{value.join('\n')}</Text>
                         ) : null}
                    </Card>
               ))}
          </View>
     ));

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
                              navigation.replace('ReOpdComplaints');
                         }}
                    />
                    <Appbar.Content title="Past History" />
                    <Appbar.Action
                         icon="account-details"
                         size={30}
                         onPress={() => openMenu()}
                    />
               </Appbar.Header>

               <ReAssessmentOpdpageNavigation
                    closeMenu={closeMenu}
                    openMenu={openMenu}
                    _handleMore={_handleMore}
                    visible={visible}
               />

               {showCalender && (
                    <View style={styles.datePickerContainer}>
                         <View style={styles.datePicker}>
                              <DateTimePicker
                                   mode="date"
                                   headerButtonColor={Themes[0]?.mainColor}
                                   selectedItemColor={Themes[0]?.mainColor}
                                   selectedTextStyle={{
                                        fontWeight: 'bold',
                                        color: Themes[0]?.activeTextColor,
                                   }}
                                   value={dateValues[datePickerIndex]}
                                   onValueChange={date => handleDateChange(date, datePickerIndex)}
                              />
                         </View>
                    </View>
               )}

               {showCalender1 && (
                    <View style={styles.datePickerContainer}>
                         <View style={styles.datePicker}>
                              <DateTimePicker
                                   mode="date"
                                   headerButtonColor={Themes[0]?.mainColor}
                                   selectedItemColor={Themes[0]?.mainColor}
                                   selectedTextStyle={{
                                        fontWeight: 'bold',
                                        color: Themes[0]?.activeTextColor,
                                   }}
                                   value={dateValues1[datePickerIndex1]}
                                   onValueChange={date => handleDateChange1(date, datePickerIndex1)}
                              />
                         </View>
                    </View>
               )}


               <View style={styles.container}>

                    {/* search input ... */}
                    <View style={styles.searchInput}>
                         <Text style={styles.heading}>Past History</Text>
                         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                              <TextInput
                                   mode="outlined"
                                   label="Diseases"
                                   placeholder="Search Diseases ..."
                                   style={[styles.input]}
                                   value={
                                        selectedIllnessCode?.illnessname
                                             ? selectedIllnessCode?.illnessname
                                             : searchInput
                                   }
                                   onChangeText={text => {
                                        setSearchInput(text), setSelectedIllnessCode('');
                                   }}
                                   right={<TextInput.Icon icon="close" onPress={() => resetHandler()} />}
                              />
                              <Button
                                   mode="contained"
                                   style={[styles.btn, { alignSelf: 'flex-start' }]}
                                   onPress={() => resetHandler()}>
                                   Add More
                              </Button>
                         </View>
                    </View>

                    {/* list  */}
                    <View>
                         <ScrollView
                              style={{
                                   zIndex: 1,
                                   marginHorizontal: 0,
                                   maxHeight: 200
                              }}
                              vertical={true}>
                              {visibleList && (
                                   <View>
                                        {illnessCode?.map(res => (
                                             <List.Item
                                                  style={styles.listView}
                                                  title={res?.illnessname}
                                                  key={res?.illness_id}
                                                  onPress={() => {
                                                       setSelectedIllnessCode({
                                                            illness_id: res.illness_id,
                                                            illnessname: res.illnessname,
                                                       });
                                                       setVisibleList(false);
                                                  }}
                                             />
                                        ))}
                                   </View>
                              )}
                         </ScrollView>
                    </View>

                    {/* edit form... */}
                    <View>
                         <ScrollView horizontal
                              showsVerticalScrollIndicator={false}
                              style={styles.inputGroup}>
                              {/* add ... */}
                              {temp?.map((res, index) => {
                                   return (
                                        <View style={styles.card} key={index + 1}>
                                             <View style={styles.cardContentDiv}>
                                                  <Text style={[styles.label, { width: 200 }]}>
                                                       Illness : &nbsp; {res?.illnessname}
                                                  </Text>
                                                  <IconButton
                                                       icon="trash-can"
                                                       iconColor={MD3Colors.error50}
                                                       size={20}
                                                       onPress={() => _removeSelectedDataHandler(res?.illness_id)}
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={styles.label}>From Date : </Text>
                                                  <TextInput
                                                       mode="flat"
                                                       style={[styles.input2]}
                                                       value={res?.dateValues}
                                                       editable={false}
                                                       right={
                                                            <TextInput.Icon
                                                                 icon="calendar"
                                                                 onPress={() => calenderHandler(index)}
                                                            />
                                                       }
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={styles.label}>Years : </Text>
                                                  <TextInput
                                                       mode="flat"
                                                       style={[styles.input2]}
                                                       value={
                                                            res?.years !== undefined ? res?.years.toString() : ''
                                                       }
                                                       editable={false}
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={styles.label}>Months : </Text>
                                                  <TextInput
                                                       mode="flat"
                                                       style={[styles.input2]}
                                                       value={
                                                            res?.months !== undefined ? res?.months.toString() : ''
                                                       }
                                                       editable={false}
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={styles.label}>Days : </Text>
                                                  <TextInput
                                                       mode="flat"
                                                       style={[styles.input2]}
                                                       value={
                                                            res?.days !== undefined ? res?.days.toString() : ''
                                                       }
                                                       editable={false}
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={[styles.label]}>
                                                       Treatment Status
                                                  </Text>
                                                  <View>
                                                       <Dropdown
                                                            mode={'outlined'}
                                                            style={[styles.dropdown, { borderColor: 'blue' }]}
                                                            placeholderStyle={styles.placeholderStyle}
                                                            selectedTextStyle={styles.selectedTextStyle}
                                                            inputSearchStyle={styles.inputSearchStyle}
                                                            iconStyle={styles.iconStyle}
                                                            data={data?.map(res => ({
                                                                 label: res?.label,
                                                                 value: res?.value,
                                                            }))}
                                                            //   search
                                                            maxHeight={300}
                                                            labelField="label"
                                                            valueField="value"
                                                            placeholder={!isFocus2 ? 'Select' : '...'}
                                                            //   searchPlaceholder="Search..."
                                                            value={res?.treatment_status}
                                                            onFocus={() => setIsFocus2(true)}
                                                            onBlur={() => setIsFocus2(false)}
                                                            onChange={item => {
                                                                 setP_category(item.value);
                                                                 //     updateSelectedCategoryData(item.value);
                                                                 setIsFocus2(false);
                                                                 const updatedTemp = [...temp];
                                                                 updatedTemp[index].treatment_status = item.value;
                                                                 setTemp(updatedTemp);
                                                            }}
                                                       />
                                                  </View>
                                             </View>
                                        </View>
                                   );
                              })}
                              {/* edit.... */}
                              {opdAssessmentforEdit?.map((res, index) => {
                                   return (
                                        <View style={styles.card} key={index + 1}>
                                             <View style={styles.cardContentDiv}>
                                                  <Text style={[styles.label, { width: 200 }]}>
                                                       Illness : &nbsp; {res?.illnessname}
                                                  </Text>
                                                  <IconButton
                                                       icon="trash-can"
                                                       iconColor={MD3Colors.error50}
                                                       size={20}
                                                       onPress={() => _removeSelectedDataHandler(res?.illness_id)}
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={styles.label}>From Date : </Text>
                                                  <TextInput
                                                       mode="flat"
                                                       style={[styles.input2]}
                                                       value={res?.dateValues}
                                                       editable={false}
                                                       right={
                                                            <TextInput.Icon
                                                                 icon="calendar"
                                                                 onPress={() => calenderHandler1(index)}
                                                            />
                                                       }
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={styles.label}>Years : </Text>
                                                  <TextInput
                                                       mode="flat"
                                                       style={[styles.input2]}
                                                       value={
                                                            res?.years !== undefined ? res?.years.toString() : ''
                                                       }
                                                       editable={false}
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={styles.label}>Months : </Text>
                                                  <TextInput
                                                       mode="flat"
                                                       style={[styles.input2]}
                                                       value={
                                                            res?.months !== undefined ? res?.months.toString() : ''
                                                       }
                                                       editable={false}
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={styles.label}>Days : </Text>
                                                  <TextInput
                                                       mode="flat"
                                                       style={[styles.input2]}
                                                       value={
                                                            res?.days !== undefined ? res?.days.toString() : ''
                                                       }
                                                       editable={false}
                                                  />
                                             </View>
                                             <View style={styles.cardContent}>
                                                  <Text style={[styles.label]}>
                                                       Treatment Status
                                                  </Text>
                                                  <View>
                                                       <Dropdown
                                                            mode={'outlined'}
                                                            style={[styles.dropdown, { borderColor: 'blue' }]}
                                                            placeholderStyle={styles.placeholderStyle}
                                                            selectedTextStyle={styles.selectedTextStyle}
                                                            inputSearchStyle={styles.inputSearchStyle}
                                                            iconStyle={styles.iconStyle}
                                                            data={data?.map(res => ({
                                                                 label: res?.label,
                                                                 value: res?.value,
                                                            }))}
                                                            //   search
                                                            maxHeight={300}
                                                            labelField="label"
                                                            valueField="value"
                                                            placeholder={!isFocus2 ? 'Select' : '...'}
                                                            //   searchPlaceholder="Search..."
                                                            value={res?.treatment_status}
                                                            onFocus={() => setIsFocus2(true)}
                                                            onBlur={() => setIsFocus2(false)}
                                                            onChange={item => {
                                                                 setP_category(item.value);
                                                                 //     updateSelectedCategoryData(item.value);
                                                                 setIsFocus2(false);
                                                                 const updatedTemp = [...opdAssessmentforEdit];
                                                                 updatedTemp[index].treatment_status = item.value;
                                                                 setOpdAssessmentforEdit(updatedTemp);
                                                            }}
                                                       />
                                                  </View>
                                             </View>
                                        </View>
                                   );
                              })}

                         </ScrollView>
                    </View>


                    {/* submit handlers */}
                    <View style={styles.submitbutton}>
                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => navigation.replace('ReOpdComplaints')}>
                              Previous
                         </Button>
                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => submitTreatmenthandler()}>
                              Submit
                         </Button>

                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => navigation.navigate('ReOpdFamilyHistory')}>
                              Next / Skip
                         </Button>
                    </View>

                    {/* fetch opd assessment */}
                    <ScrollView>
                         <View style={{ padding: 10 }}>{displayData}</View>
                    </ScrollView>
               </View>
          </>
     );
};

export default ReOpdPastHistory;

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     heading: {
          fontWeight: '600',
          fontSize: 18,
          marginVertical: 10,
     },

     inputGroup: {
          marginHorizontal: 14,
          maxHeight: '100%',
     },
     input: {
          width: 200,
     },
     input2: {
          backgroundColor: '#ffffff',
          paddingTop: 0,
          paddingLeft: 0,
          height: 35,
          width: 210,
          maxWidth: 220,
     },
     addButton: {
          alignSelf: 'flex-end',
     },
     btn: {
          marginVertical: 12,
          //     alignSelf: 'center',
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
          marginRight: 6,
          padding: 6,
     },
     innerCard: {
          flexDirection: 'row',
          flexWrap: 'wrap',
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
     para: {
          fontWeight: '600',
          flexWrap: 'wrap',
          width: 225,
          maxWidth: 225,
     },
     datePickerContainer: {
          alignItems: 'center',
          flex: 1,
          top: 100,
          zIndex: 10,
     },
     datePicker: {
          width: 300,
          height: 330,
          backgroundColor: '#d1e8ff',
          padding: 10,
          borderRadius: 15,
          shadowRadius: 20,
          shadowColor: '#e6e8eb',
          shadowOpacity: 0.2,
          shadowOffset: { width: 10, height: 10 },
     },
     submitbutton: {
          flexDirection: 'row',
          justifyContent: "center",
          gap: 10,
     },
     dropdown: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1.5,
          borderRadius: 4,
          paddingHorizontal: 6,
          marginHorizontal: 6,
          width: 200
     },
     placeholderStyle: {
          fontSize: 16,
     },
     selectedTextStyle: {
          fontSize: 16,
     },
     head: { height: 40, backgroundColor: '#80aaff' },
     text: { textAlign: 'center', color: 'black', padding: 2 },
     row: { height: 'auto' },

     cardBody: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
     },
     cardtext: {
          fontWeight: '600',
          color: 'black',
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
     cardContentDiv: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
     },
     searchInput: {
          marginHorizontal: 12,
     },
});
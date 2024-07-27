import {
     ScrollView,
     StyleSheet,
     Text,
     View,
     TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import { Appbar, Button, Card, RadioButton, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { OpdpageNavigation, ReAssessmentOpdpageNavigation } from './OpdpageNavigation';

const ReOpdMenstrualHistory = () => {
     const { patientsData, scannedPatientsData, waitingListData, userData } =
          useContext(UserContext);
     const { hospital_id, patient_id, reception_id, uhid } = patientsData;
     const { appoint_id, mobilenumber } = scannedPatientsData;

     const [temp, setTemp] = useState([]);
     const navigation = useNavigation();
     const [widthArr, setWidthArr] = useState([]);

     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
     const [opdAssessmentforEdit, setOpdAssessmentforEdit] = useState([]);


     //due date
     const showDatePicker = () => {
          setDatePickerVisibility(true);
     };
     const hideDatePicker = () => {
          setDatePickerVisibility(false);
     };

     // Function for handling Date
     const handleDate = date => {
          const dt = new Date(date);
          const year = dt.getFullYear();
          const month = (dt.getMonth() + 1).toString().padStart(2, '0');
          const day = dt.getDate().toString().padStart(2, '0');
          const Dateformat = `${day}-${month}-${year}`;
          setOpdAssessmentforEdit({
               ...opdAssessmentforEdit,
               lmp: Dateformat,
          });
          hideDatePicker();
     };

     const handleRadioChange = (name, value) => {
          setOpdAssessmentforEdit(prevState => ({
               ...prevState,
               [name]: value,
          }));
     };

     useEffect(() => {

          setOpdAssessmentforEdit({
               durations: opdAssessmentforEdit?.durations,
               lmp: opdAssessmentforEdit?.lmp,
               menarche_age: opdAssessmentforEdit?.menarche_age,
               menopause: opdAssessmentforEdit?.menopause,
               periods: opdAssessmentforEdit.periods,
               qualityofbloodflow: opdAssessmentforEdit.qualityofbloodflow,
               painduringcycle: opdAssessmentforEdit.painduringcycle,
          });
     }, []);
     const tableHead1 = [
          {
               key: 1,
               label: 'Menarche',
               content: (
                    <>
                         <View
                              style={{
                                   flexDirection: 'row',
                                   justifyContent: 'space-between',
                                   marginHorizontal: 6,
                                   alignItems: 'center',
                              }}>
                              <Text style={[styles.label, { width: 'auto' }]}>Age : </Text>
                              <TextInput
                                   mode="flat"
                                   style={[styles.input2]}
                                   value={opdAssessmentforEdit?.menarche_age}
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             menarche_age: text,
                                        }));
                                   }}
                                   editable={true}
                                   keyboardType="numeric"
                              />
                         </View>
                    </>
               ),
          },
     ];
     const tableHead2 = [
          {
               key: 2,
               label: 'LMP',
               content: (
                    <>
                         <View
                              style={{
                                   flexDirection: 'row',
                                   marginHorizontal: 6,
                              }}>

                              <TouchableOpacity
                                   onPress={showDatePicker}
                                   style={{
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                   }}>
                                   <Text style={[styles.input, { padding: 4 }]}>{opdAssessmentforEdit?.lmp}</Text>
                                   <FontAwesome6 name="calendar-days" color="red" size={20} />
                              </TouchableOpacity>
                              <DateTimePickerModal
                                   isVisible={isDatePickerVisible}
                                   mode="date"
                                   onConfirm={handleDate}
                                   onCancel={hideDatePicker}
                              />
                         </View>
                    </>
               ),
          },
     ];
     const tableHead3 = [
          {
               key: 3,
               label: 'Periods',
               content: (
                    <>
                         <RadioButton.Group
                              onValueChange={newValue => handleRadioChange('periods', newValue)}
                              value={opdAssessmentforEdit?.periods}>
                              <View
                                   style={[
                                        styles.radioBtn,
                                        { marginHorizontal: 6, flexWrap: 'wrap' },
                                   ]}>
                                   <View style={styles.radioBtn}>
                                        <RadioButton value="regular" />
                                        <Text>Regular</Text>
                                   </View>
                                   <View style={styles.radioBtn}>
                                        <RadioButton value="irregular" />
                                        <Text>Irregular</Text>
                                   </View>
                              </View>
                         </RadioButton.Group>
                    </>
               ),
          },
     ];
     const tableHead4 = [
          {
               key: 4,
               label: 'Duration in days',
               content: (
                    <>
                         <View
                              style={{
                                   flexDirection: 'row',
                                   marginHorizontal: 6,
                              }}>
                              <TextInput
                                   mode="flat"
                                   style={[styles.input2, { width: '100%' }]}
                                   value={opdAssessmentforEdit?.durations}
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             durations: text,
                                        }));
                                   }}
                                   editable={true}
                                   keyboardType="numeric"
                              />
                         </View>
                    </>
               ),
          },
     ];
     const tableHead5 = [
          {
               key: 5,
               label: 'Quality of Blood Flow',
               content: (
                    <>
                         <RadioButton.Group
                              onValueChange={newValue =>
                                   handleRadioChange('qualityofbloodflow', newValue)
                              }
                              value={opdAssessmentforEdit?.qualityofbloodflow}>
                              <View
                                   style={[
                                        styles.radioBtn,
                                        { flexWrap: 'wrap', marginHorizontal: 6 },
                                   ]}>
                                   <View style={styles.radioBtn}>
                                        <RadioButton value="Scanty" />
                                        <Text>Scanty</Text>
                                   </View>
                                   <View style={styles.radioBtn}>
                                        <RadioButton value="Mod" />
                                        <Text>Mod</Text>
                                   </View>
                                   <View style={styles.radioBtn}>
                                        <RadioButton value="Heavy" />
                                        <Text>Heavy</Text>
                                   </View>
                              </View>
                         </RadioButton.Group>
                    </>
               ),
          },
     ];
     const tableHead6 = [
          {
               key: 6,
               label: 'Pain during cycle',
               content: (
                    <>
                         <RadioButton.Group
                              onValueChange={newValue =>
                                   handleRadioChange('painduringcycle', newValue)
                              }
                              value={opdAssessmentforEdit?.painduringcycle}>
                              <View style={[styles.radioBtn, { marginHorizontal: 6 }]}>
                                   <View style={styles.radioBtn}>
                                        <RadioButton value="yes" />
                                        <Text>Yes</Text>
                                   </View>
                                   <View style={styles.radioBtn}>
                                        <RadioButton value="no" />
                                        <Text>No</Text>
                                   </View>
                              </View>
                         </RadioButton.Group>
                    </>
               ),
          },
     ];
     const tableHead7 = [
          {
               key: 7,
               label: 'Menopause',
               content: (
                    <>
                         <View
                              style={{
                                   flexDirection: 'row',
                                   justifyContent: 'space-between',
                                   marginHorizontal: 6,
                                   alignItems: 'center',
                              }}>
                              <Text style={[styles.label, { width: 'auto' }]}>Age : </Text>
                              <TextInput
                                   mode="flat"
                                   style={[styles.input2]}
                                   value={opdAssessmentforEdit?.menopause}
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             menopause: text,
                                        }));
                                   }}
                                   editable={true}
                                   keyboardType="numeric"
                              />
                         </View>
                    </>
               ),
          },
     ];

     //backHandler ...
     useEffect(() => {
          const backAction = () => {
               navigation.replace('ReOpdObstetricsHistory');
               return true;
          };

          const backHandler = BackHandler.addEventListener(
               'hardwareBackPress',
               backAction,
          );

          return () => backHandler.remove();
     }, []);

     useEffect(() => {
          setWidthArr([166, 166, ...Array(tableHead1.length - 1).fill(0)]);
     }, []);

     useEffect(() => {
          // Push radio button values to temp state array
          setTemp(prev => ({
               ...prev,
               ...opdAssessmentforEdit,
          }));
     }, [opdAssessmentforEdit]);
     //  submit handler ....
     const submitTreatmenthandler = async () => {
          const _body = {
               hospital_id: userData?.hospital_id,
               patient_id: patient_id,
               reception_id: userData?._id,
               appoint_id: waitingListData?.appoint_id || appoint_id,
               uhid: waitingListData?.uhid || uhid,
               api_type: 'OPD-MENSTRUAL-HISTORY',
               opdmenstrualhistoryarray: [temp],
          };
          try {
               await axios
                    .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
                    .then(res => {
                         const { status, message } = res.data;
                         if (status === true) {
                              setTemp([]);
                              FetchMobileOpdAssessment();
                         } else {
                              console.error(`${message}`);
                         }
                    });
          } catch (error) {
               console.error(error);
          }
     };

     const [opdAssessment, setOpdAssessment] = useState([]);

     useEffect(() => {
          FetchMobileOpdAssessment();
          FetchMobileOpdAssessmentforEdit();
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
                         api_type: 'OPD-MENSTRUAL-HISTORY',
                         uhid: waitingListData?.uhid || uhid,
                         mobilenumber: waitingListData?.mobilenumber || mobilenumber,
                    })
                    .then(res => {
                         setOpdAssessment(res.data.data);
                    });
          } catch (error) {
               console.error(error);
          }
     };
     //list of FetchMobileOpdAssessment....
     const FetchMobileOpdAssessmentforEdit = async () => {
          try {
               await axios
                    .post(`${api.baseurl}/FetchMobileOpdAssessmentforEdit`, {
                         hospital_id: userData?.hospital_id,
                         reception_id: userData?._id,
                         patient_id: patient_id,
                         appoint_id: waitingListData?.appoint_id || appoint_id,
                         api_type: 'OPD-MENSTRUAL-HISTORY',
                         uhid: waitingListData?.uhid || uhid,
                         mobilenumber: waitingListData?.mobilenumber || mobilenumber,
                    })
                    .then(res => {
                         const data = res.data.opdmenstrualhistoryarray[0];
                         setOpdAssessmentforEdit(data)
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


     return (
          <>
               {/* Appbar header */}
               <Appbar.Header>
                    <Appbar.BackAction
                         onPress={() => {
                              navigation.replace('ReOpdObstetricsHistory');
                         }}
                    />
                    <Appbar.Content title="Menstrual History" />
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

               {/*  */}
               <ScrollView vertical style={styles.container}>
                    <ScrollView vertical={true}>
                         <View>
                              <Table
                                   borderStyle={{
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                   }}>
                                   <Rows
                                        data={tableHead1?.map(item => {
                                             return [item.label, item.content];
                                        })}
                                        widthArr={widthArr}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                   />
                                   <Rows
                                        data={tableHead2?.map(item => {
                                             return [item.label, item.content];
                                        })}
                                        widthArr={widthArr}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                   />
                                   <Rows
                                        data={tableHead3?.map(item => {
                                             return [item.label, item.content];
                                        })}
                                        widthArr={widthArr}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                   />
                                   <Rows
                                        data={tableHead4?.map(item => {
                                             return [item.label, item.content];
                                        })}
                                        widthArr={widthArr}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                   />
                                   <Rows
                                        data={tableHead5?.map(item => {
                                             return [item.label, item.content];
                                        })}
                                        widthArr={widthArr}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                   />
                                   <Rows
                                        data={tableHead6?.map(item => {
                                             return [item.label, item.content];
                                        })}
                                        widthArr={widthArr}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                   />
                                   <Rows
                                        data={tableHead7?.map(item => {
                                             return [item.label, item.content];
                                        })}
                                        widthArr={widthArr}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                   />
                              </Table>
                         </View>
                    </ScrollView>
                    {/* Group Buttons .....  */}
                    <View style={styles.submitbutton}>
                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => navigation.navigate('ReOpdObstetricsHistory')}>
                              Previous
                         </Button>

                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={submitTreatmenthandler}>
                              Submit
                         </Button>

                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => navigation.navigate('ReOpdVitals')}>
                              Next / Skip
                         </Button>
                    </View>

                    {opdAssessment?.map((row, index) => {
                         return (
                              <Card style={styles.card2} key={index + 1}>
                                   <Card.Content>
                                        <View style={styles.cardBodyHead}>
                                             <View style={[styles.cardBody, { gap: 8 }]}>
                                                  <Text variant="titleLarge" style={styles.cardtext}>
                                                       Menarche Age :
                                                  </Text>
                                                  <Text variant="titleLarge" style={styles.cardtext2}>
                                                       {row?.menarche_age}
                                                  </Text>
                                             </View>
                                             <View style={[styles.cardBody, { gap: 8 }]}>
                                                  <Text variant="titleLarge" style={styles.cardtext}>
                                                       Lmp :
                                                  </Text>
                                                  <Text variant="titleLarge" style={[styles.cardtext2]}>
                                                       {row?.lmp}
                                                  </Text>
                                             </View>
                                        </View>
                                        <View style={styles.cardBodyHead}>
                                             <View style={[styles.cardBody, { gap: 8 }]}>
                                                  <Text variant="titleLarge" style={styles.cardtext}>
                                                       Periods :
                                                  </Text>
                                                  <Text variant="titleLarge" style={[styles.cardtext2]}>
                                                       {row?.periods}
                                                  </Text>
                                             </View>
                                             <View style={[styles.cardBody, { gap: 8 }]}>
                                                  <Text variant="titleLarge" style={styles.cardtext}>
                                                       Durations :
                                                  </Text>
                                                  <Text variant="titleLarge" style={[styles.cardtext2]}>
                                                       {row?.durations}
                                                  </Text>
                                             </View>
                                        </View>
                                        <View style={[styles.cardBody, { gap: 8 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  Quality of Blood Flow :
                                             </Text>
                                             <Text variant="titleLarge" style={styles.cardtext2}>
                                                  {row?.qualityofbloodflow}
                                             </Text>
                                        </View>
                                        <View style={[styles.cardBody, { gap: 8 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  Pain during Cycle :
                                             </Text>
                                             <Text variant="titleLarge" style={styles.cardtext2}>
                                                  {row?.painduringcycle}
                                             </Text>
                                        </View>
                                        {/* <View style={styles.cardBodyHead}> */}
                                        <View style={[styles.cardBody, { gap: 10 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  Menopause :
                                             </Text>
                                             <Text variant="titleLarge" style={styles.cardtext2}>
                                                  {row?.menopause}
                                             </Text>
                                        </View>
                                        <View style={[styles.cardBody, { gap: 10, width: 'auto' }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  Date / Time :
                                             </Text>
                                             <Text variant="titleLarge" style={styles.cardtext2}>
                                                  {row.opd_date} / {row.opd_time}
                                             </Text>
                                        </View>
                                        {/* </View> */}
                                   </Card.Content>
                              </Card>
                         );
                    })}
               </ScrollView>
          </>
     );
};

export default ReOpdMenstrualHistory;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          padding: 12,
     },
     card: {
          borderWidth: 0.7,
          borderRadius: 6,
          marginBottom: 10,
          padding: 6,
          backgroundColor: '#ffffff',
     },
     cardContent: {
          flexDirection: 'row',
          padding: 5,
          //     width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          //     marginHorizontal: 6,
     },
     label: {
          fontWeight: '600',
          color: 'black',
          width: 100,
     },
     card2: {
          flexDirection: 'row',
          flexWrap: 'wrap',
     },
     radioBtn: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     submitbutton: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginTop: 10,
     },
     input2: {
          height: 40,
          width: '60%',
          backgroundColor: 'white',
     },
     head: { height: 40, backgroundColor: '#80aaff' },
     text: {
          textAlign: 'left',
          color: 'black',
          fontSize: 14,
          marginLeft: 6,
          backgroundColor: '#ffffff',
     },
     dataWrapper: { marginTop: -1 },
     row: {
          height: 'auto',
          backgroundColor: '#ffffff',
          minHeight: 55,
     },
     cellText: {
          fontSize: 11,
          color: '#071bf5',
          marginLeft: 6,
     },
     card2: {
          marginTop: 10,
          marginHorizontal: 14,
          marginBottom: 10,
     },
     cardBody: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: 100,
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
     input: {
          // height: 45,
          backgroundColor: 'white',
          width: '80%',
     },
});

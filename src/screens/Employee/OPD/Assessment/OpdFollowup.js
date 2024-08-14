import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Appbar, Button, Card, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { OpdpageNavigation } from './OpdpageNavigation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import axios from 'axios';

// Function to get the day of the week
const getDayOfWeek = (date) => {
     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     return days[date.getDay()];
};

const OpdFollowup = () => {

     const { patientsData, scannedPatientsData, waitingListData, userData } =
          useContext(UserContext);
     const { hospital_id, patient_id, reception_id, uhid } = patientsData;
     const [opdAssessment, setOpdAssessment] = useState([]);
     const { appoint_id, mobilenumber } = scannedPatientsData;
     const navigation = useNavigation(); // Ensure navigation is defined here

     const [visible, setVisible] = useState(false);
     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
     const [dateField, setDateField] = useState('');

     // BackHandler ...
     useEffect(() => {
          const backAction = () => {
               navigation.replace('OpdAdvice');
               return true;
          };

          const backHandler = BackHandler.addEventListener(
               'hardwareBackPress',
               backAction,
          );

          return () => backHandler.remove();
     }, [navigation]); // Include navigation in the dependency array

     const _handleMore = () => {
          setVisible(true);
     };

     const openMenu = () => setVisible(true);
     const closeMenu = () => setVisible(false);

     // Form inputs...
     const [submittedformData, setSubmittedFormData] = useState({
          followup_date: new Date().toISOString().slice(0, 10),
          followup_days: '0',
          followup_day: getDayOfWeek(new Date()),
     });

     // Function for handling Date
     const handleDate = (date) => {
          const selectedDate = new Date(date);
          const dt = selectedDate.toISOString().slice(0, 10);
          const daysDifference = Math.floor((selectedDate - new Date()) / (1000 * 60 * 60 * 24));
          const dayOfWeek = getDayOfWeek(selectedDate);

          setSubmittedFormData((prevState) => ({
               ...prevState,
               [dateField]: dt, // Set the date to the appropriate field based on dateField state
               followup_days: daysDifference,
               followup_day: dayOfWeek,
          }));
          hideDatePicker();
     };

     const hideDatePicker = () => {
          setDatePickerVisibility(false);
     };

     // Due date
     const showFromDatePicker = () => {
          setDatePickerVisibility(true);
          setDateField('followup_date'); // Set the date field to 'followup_date'
     };

     useEffect(() => {
          FetchMobileOpdAssessment();
     }, [waitingListData?.mobilenumber]);

     // Function to handle days change and set the date accordingly
     const handleDaysChange = (days) => {
          if (days === '') {
               setSubmittedFormData((prevState) => ({
                    ...prevState,
                    followup_days: '',
               }));
               return;
          }

          const daysInt = parseInt(days);
          if (isNaN(daysInt) || daysInt < 0) {
               console.error('Invalid number of days');
               return;
          }

          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + daysInt);
          const dt = futureDate.toISOString().slice(0, 10);
          const dayOfWeek = getDayOfWeek(futureDate);

          setSubmittedFormData((prevState) => ({
               ...prevState,
               followup_days: daysInt,
               followup_date: dt,
               followup_day: dayOfWeek,
          }));
     };

     const submitHandler = async () => {
          const _body = {
               hospital_id: userData?.hospital_id,
               patient_id: waitingListData?.newpatient_id || patient_id,
               reception_id: userData?._id,
               appoint_id: waitingListData?.appoint_id || appoint_id,
               uhid: waitingListData?.uhid || uhid,
               api_type: 'OPD-FOLLOW-UP',
               opdfollowuparray: [submittedformData],
               mobilenumber: waitingListData?.mobilenumber || mobilenumber,
          };
          try {
               await axios
                    .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
                    .then(res => {
                         const { status, message } = res.data;
                         if (status === true) {
                              setSubmittedFormData({
                                   followup_date: new Date().toISOString().slice(0, 10),
                                   followup_days: '0',
                                   followup_day: getDayOfWeek(new Date()),
                              })
                              FetchMobileOpdAssessment();
                         } else {
                              console.error(`${message}`);
                         }
                    });
          } catch (error) {
               console.error(error);
          }
     }

     //list of FetchMobileOpdAssessment....
     const FetchMobileOpdAssessment = async () => {
          try {
               await axios
                    .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
                         hospital_id: userData?.hospital_id,
                         patient_id: waitingListData?.newpatient_id || patient_id,
                         reception_id: userData?._id,
                         appoint_id: waitingListData?.appoint_id || appoint_id,
                         uhid: waitingListData?.uhid || uhid,
                         api_type: 'OPD-FOLLOW-UP',
                         mobilenumber: waitingListData?.mobilenumber || mobilenumber,
                    })
                    .then(res => {
                         setOpdAssessment(res.data.data);
                    });
          } catch (error) {
               console.error(error);
          }
     };

     return (
          <>
               {/* Appbar header */}
               <Appbar.Header>
                    <Appbar.BackAction
                         onPress={() => {
                              navigation.replace('OpdAdvice');
                         }}
                    />
                    <Appbar.Content title="Follow Up" style={styles.appbar_title} />
                    <Appbar.Action
                         icon="account-details"
                         size={30}
                         onPress={openMenu}
                    />
               </Appbar.Header>
               <OpdpageNavigation
                    closeMenu={closeMenu}
                    openMenu={openMenu}
                    _handleMore={_handleMore}
                    visible={visible}
               />

               <View style={styles.container}>
                    <View style={styles.filterDiv}>
                         <View style={styles.filter}>
                              <Text style={styles.label}>Follow Up Date</Text>
                              <TouchableOpacity style={styles.input}>
                                   <TextInput
                                        dense
                                        value={submittedformData.followup_date}
                                        editable={false}
                                        style={styles.inputText}
                                        right={<TextInput.Icon icon="calendar" onPress={showFromDatePicker} />}
                                   />
                              </TouchableOpacity>
                         </View>
                         <View style={styles.filter}>
                              <Text style={styles.label}>Follow Up Days</Text>
                              <TextInput
                                   keyboardType='numeric'
                                   dense
                                   value={submittedformData.followup_days.toString()}
                                   onChangeText={handleDaysChange}
                                   style={styles.inputText}
                              />
                         </View>
                         <View style={styles.filter}>
                              <Text style={styles.label}>Follow Up Day</Text>
                              <TextInput
                                   dense
                                   value={submittedformData.followup_day}
                                   editable={false}
                                   style={styles.inputText}
                              />
                         </View>

                         <DateTimePickerModal
                              isVisible={isDatePickerVisible}
                              mode="date"
                              onConfirm={handleDate}
                              onCancel={hideDatePicker}
                         />
                         <Button
                              mode="elevated"
                              style={styles.button}
                              textColor="white"
                              onPress={submitHandler}>
                              Submit
                         </Button>
                    </View>
                    <ScrollView vertical style={{ maxHeight: '90%' }}>
                         {opdAssessment?.length > 0 && opdAssessment?.map((res, index) => {
                              return (
                                   <Card style={styles.card} key={index + 1}>
                                        <Text style={styles.cardText}> {res.opd_date} &nbsp;&nbsp;{res.opd_time}</Text>
                                        <Text style={styles.cardText}>Next Followup is on {res.followup_date} , {res.followup_day}</Text>
                                   </Card>
                              )
                         })}
                    </ScrollView>
               </View>
          </>
     );
};

export default OpdFollowup;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          padding: 10,
     },
     filter: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: "center",
          marginVertical: 6,
          marginHorizontal: 6
     },
     button: {
          backgroundColor: '#80aaff',
          alignSelf: 'center',
          marginVertical: 10,
          marginBottom: 40
     },
     label: {
          fontSize: 16,
          color: "black"
     },
     inputText: {
          minWidth: 160
     },
     card: {
          borderWidth: 0.7,
          borderRadius: 6,
          marginBottom: 10,
          marginRight: 6,
          padding: 12,
          // width: '100%'
     },
});

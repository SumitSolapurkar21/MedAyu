import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextInput, Appbar, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import { Image } from 'react-native';

// Images...
import temperature from '../../../../images/temperature.png';
import spo2 from '../../../../images/spo2.png';
import rr from '../../../../images/rr.png';
import pulse from '../../../../images/pulse.png';
import sysbp from '../../../../images/sysbp.png';
import diabp from '../../../../images/diabp.png';
import DropDown from 'react-native-paper-dropdown';
import { BackHandler } from 'react-native';
import { OpdpageNavigation, ReAssessmentOpdpageNavigation } from './OpdpageNavigation';

const ReOpdVitals = () => {
     //backHandler ...
     useEffect(() => {
          const backAction = () => {
               navigation.replace('ReOpdMenstrualHistory');
               return true;
          };

          const backHandler = BackHandler.addEventListener(
               'hardwareBackPress',
               backAction,
          );

          return () => backHandler.remove();
     }, []);
     const navigation = useNavigation();


     const { patientsData, scannedPatientsData, waitingListData, userData } =
          useContext(UserContext);
     const { hospital_id, patient_id, reception_id, uhid } = patientsData;
     const { appoint_id, mobilenumber } = scannedPatientsData;

     const [validationErrors, setValidationErrors] = React.useState({
          p_temp: opdAssessmentforEdit?.p_temp,
          p_pulse: opdAssessmentforEdit?.p_pulse,
          p_spo2: opdAssessmentforEdit?.p_spo2,
          p_systolicbp: opdAssessmentforEdit?.p_systolicbp,
          p_diastolicbp: opdAssessmentforEdit?.p_diastolicbp,
          p_rsprate: opdAssessmentforEdit?.p_rsprate,
          motorResponse: opdAssessmentforEdit?.motorResponse,
          verbalResponse: opdAssessmentforEdit?.verbalResponse,
          eyeopening: opdAssessmentforEdit?.eyeopening,
     });
     const [showEyeopening, setshowEyeopening] = useState(false);
     const [showverbalReaponse, setshowverbalReaponse] = useState(false);
     const [showMotorResponse, setshowMotorResponse] = useState(false);

     // Input handler
     const addVitalsData = async () => {
          const errors = {};
          let isValidInput = true;

          if (!validateInputRange(opdAssessmentforEdit?.p_temp, 90, 110)) {
               errors.p_temp = 'Temperature Not in Range';
               isValidInput = false;
          }

          if (!validateInputRange(opdAssessmentforEdit?.p_pulse, 20, 300)) {
               errors.p_pulse = 'Pulse Not in Range';
               isValidInput = false;
          }

          if (!validateInputRange(opdAssessmentforEdit?.p_spo2, 30, 100)) {
               errors.p_spo2 = 'SPO2 Not in Range';
               isValidInput = false;
          }

          if (!validateInputRange(opdAssessmentforEdit?.p_systolicbp, 30, 240)) {
               errors.p_systolicbp = 'Systolic BP Not in Range';
               isValidInput = false;
          }

          if (!validateInputRange(opdAssessmentforEdit?.p_diastolicbp, 10, 200)) {
               errors.p_diastolicbp = 'Diastolic BP Not in Range';
               isValidInput = false;
          }

          if (!validateInputRange(opdAssessmentforEdit?.p_rsprate, 5, 50)) {
               errors.p_rsprate = 'Respiratory Rate Not in Range';
               isValidInput = false;
          }
          if (!validateInputRange(opdAssessmentforEdit?.eyeopening, 1, 4)) {
               errors.eyeopening = 'EyeOpening Range 1-4';
               isValidInput = false;
          } else {
               errors.eyeopening = ''; // Clear error if input is in range
          }
          if (!validateInputRange(opdAssessmentforEdit?.verbalResponse, 1, 5)) {
               errors.verbalResponse = 'Verbal Range 1-5';
               isValidInput = false;
          } else {
               errors.verbalResponse = ''; // Clear error if input is in range
          }
          if (!validateInputRange(opdAssessmentforEdit?.motorResponse, 1, 6)) {
               errors.motorResponse = 'Motor Range 1-6';
               isValidInput = false;
          } else {
               errors.motorResponse = ''; // Clear error if input is in range
          }

          if (isValidInput) {
               const _body = {
                    p_rsprate: opdAssessmentforEdit?.p_rsprate,
                    p_diastolicbp: opdAssessmentforEdit?.p_diastolicbp,
                    p_systolicbp: opdAssessmentforEdit?.p_systolicbp,
                    p_spo2: opdAssessmentforEdit?.p_spo2,
                    p_pulse: opdAssessmentforEdit?.p_pulse,
                    p_temp: opdAssessmentforEdit?.p_temp,
                    eyeopening: opdAssessmentforEdit?.eyeopening,
                    motorResponse: opdAssessmentforEdit?.motorResponse,
                    verbalResponse: opdAssessmentforEdit?.verbalResponse,
                    gcss_status: opdAssessmentforEdit?.gcssStatus,
               };
               try {
                    await axios
                         .post(`${api.baseurl}/AddMobileOpdAssessment  `, {
                              reception_id: userData?._id,
                              hospital_id: userData?.hospital_id,
                              patient_id: patient_id,
                              appoint_id: waitingListData?.appoint_id || appoint_id,
                              uhid: waitingListData?.uhid || uhid,
                              api_type: 'OPD-VITALS',
                              opdvitalshistoryarray: [_body],
                         })
                         .then(res => {
                              if (res.data.status === false) {
                                   ToastAndroid.show(
                                        `${res.data.message}`,
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM,
                                   );
                              } else {

                                   FetchMobileOpdAssessment();
                                   FetchMobileOpdAssessmentforEdit();
                              }
                         });
               } catch (error) {
                    console.error(error);
               }
          } else {
               // Handle validation error, show a message, or perform other actions
               setValidationErrors(errors);
               ToastAndroid.show(
                    `Validation failed. Please check input values.`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
               );
          }
     };

     const validateInputRange = (value, min, max) => {
          const numericValue = parseFloat(value);
          return !isNaN(numericValue) && numericValue >= min && numericValue <= max;
     };

     let relation = [
          {
               label: 'Spontaneous',
               value: '4',
          },
          {
               label: 'To sound',
               value: '3',
          },
          {
               label: 'To pressure',
               value: '2',
          },
          {
               label: 'None',
               value: '1',
          },
     ];
     let relationV = [
          {
               label: 'Orientated',
               value: '5',
          },
          {
               label: 'Confused',
               value: '4',
          },
          {
               label: 'Words',
               value: '3',
          },
          {
               label: 'Sounds',
               value: '2',
          },
          {
               label: 'None',
               value: '1',
          },
     ];
     let relationM = [
          {
               label: 'Obey commands',
               value: '6',
          },
          {
               label: 'Localising',
               value: '5',
          },
          {
               label: 'Normal flexion',
               value: '4',
          },
          {
               label: 'Abnormal flexion',
               value: '3',
          },
          {
               label: 'Extension',
               value: '2',
          },
          {
               label: 'None',
               value: '1',
          },
     ];

     // useEffect(() => {
     //      const scalecount =
     //           parseInt(eyeopening) + parseInt(verbalResponse) + parseInt(motorResponse);

     //      if (scalecount >= 13) {
     //           setGcssStatus('mild');
     //           setmildColor('green');
     //           setmoderateColor('white');
     //           setsevereColor('white');
     //      } else if (scalecount >= 9 && scalecount <= 12) {
     //           setGcssStatus('moderate');
     //           setmoderateColor('yellow');
     //           setmildColor('white');
     //           setsevereColor('white');
     //      } else if (scalecount >= 3 && scalecount <= 8) {
     //           setGcssStatus('severe');
     //           setsevereColor('red');
     //           setmoderateColor('white');
     //           setmildColor('white');
     //      } else {
     //           null;
     //      }
     // }, [eyeopening, verbalResponse, motorResponse]);

     const [opdAssessment, setOpdAssessment] = useState([]);
     const [opdAssessmentforEdit, setOpdAssessmentforEdit] = useState([]);

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
                         api_type: 'OPD-VITALS',
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
                         api_type: 'OPD-VITALS',
                         uhid: waitingListData?.uhid || uhid,
                         mobilenumber: waitingListData?.mobilenumber || mobilenumber,
                    })
                    .then(res => {
                         const data = res.data.opdvitalshistoryarray[0];
                         setOpdAssessmentforEdit(data);
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


     const [mildColor, setmildColor] = useState('');
     const [moderateColor, setmoderateColor] = useState('');
     const [severeColor, setsevereColor] = useState('');


     return (
          <>
               {/* Appbar header */}
               <Appbar.Header>
                    <Appbar.BackAction
                         onPress={() => {
                              navigation.replace('ReOpdMenstrualHistory');
                         }}
                    />
                    <Appbar.Content title="Vitals" />
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
               <ScrollView vertical style={styles.container}>
                    <View style={styles.tableWrapper}>
                         <View style={styles.grpInput}>
                              <View style={styles.grpImgTxt}>
                                   <Image source={temperature} alt="Temp" style={styles.img} />
                                   <Text style={styles.label}>TEMP</Text>
                              </View>
                              <TextInput
                                   value={opdAssessmentforEdit?.p_temp}
                                   style={[
                                        styles.input,
                                        validationErrors.p_temp && styles.errorInput,
                                   ]}
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             p_temp: text,
                                        }));
                                   }}
                                   keyboardType="numeric"
                                   error={!!validationErrors.p_temp}
                                   right={<TextInput.Affix textStyle={{ fontSize: 13 }} text=" °F" />}
                                   backgroundColor={'white'}
                              />
                         </View>
                         {validationErrors.p_temp && (
                              <Text style={styles.errorText}>{validationErrors.p_temp}</Text>
                         )}
                         <View style={styles.grpInput}>
                              <View style={styles.grpImgTxt}>
                                   <Image source={pulse} alt="Temp" style={styles.img} />
                                   <Text style={styles.label}>PULSE</Text>
                              </View>
                              <TextInput
                                   value={opdAssessmentforEdit?.p_pulse}
                                   style={[
                                        styles.input,
                                        validationErrors.p_pulse && styles.errorInput,
                                   ]}
                                   keyboardType="numeric"
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             p_pulse: text,
                                        }));
                                   }}
                                   error={!!validationErrors.p_pulse}
                                   right={
                                        <TextInput.Affix textStyle={{ fontSize: 13 }} text=" /min" />
                                   }
                                   backgroundColor={'white'}
                              />
                         </View>
                         {validationErrors.p_pulse && (
                              <Text style={styles.errorText}>{validationErrors.p_pulse}</Text>
                         )}
                         <View style={styles.grpInput}>
                              <View style={styles.grpImgTxt}>
                                   <Image source={spo2} alt="SPO2" style={styles.img} />
                                   <Text style={styles.label}>SPO2</Text>
                              </View>
                              <TextInput
                                   value={opdAssessmentforEdit?.p_spo2}
                                   style={[
                                        styles.input,
                                        validationErrors.p_spo2 && styles.errorInput,
                                   ]}
                                   keyboardType="numeric"
                                   error={!!validationErrors.p_spo2}
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             p_spo2: text,
                                        }));
                                   }}
                                   right={<TextInput.Affix textStyle={{ fontSize: 13 }} text="  %" />}
                                   backgroundColor={'white'}
                              />
                         </View>
                         {validationErrors.p_spo2 && (
                              <Text style={styles.errorText}>{validationErrors.p_spo2}</Text>
                         )}
                         <View style={styles.grpInput}>
                              <View style={styles.grpImgTxt}>
                                   <Image source={sysbp} alt="SYS_BP" style={styles.img} />
                                   <Text style={styles.label}>SYSTOLIC BP</Text>
                              </View>
                              <TextInput
                                   value={opdAssessmentforEdit?.p_systolicbp}
                                   style={[
                                        styles.input,
                                        validationErrors.p_systolicbp && styles.errorInput,
                                   ]}
                                   keyboardType="numeric"
                                   error={!!validationErrors.p_systolicbp}
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             p_systolicbp: text,
                                        }));
                                   }}
                                   right={
                                        <TextInput.Affix textStyle={{ fontSize: 13 }} text="  mmHg" />
                                   }
                                   backgroundColor={'white'}
                              />
                         </View>
                         {validationErrors.p_systolicbp && (
                              <Text style={styles.errorText}>
                                   {validationErrors.p_systolicbp}
                              </Text>
                         )}
                         <View style={styles.grpInput}>
                              <View style={styles.grpImgTxt}>
                                   <Image source={diabp} alt="DIA_BP" style={styles.img} />
                                   <Text style={styles.label}>DIASTOLIC BP</Text>
                              </View>
                              <TextInput
                                   value={opdAssessmentforEdit?.p_diastolicbp}
                                   style={[
                                        styles.input,
                                        validationErrors.p_diastolicbp && styles.errorInput,
                                   ]}
                                   keyboardType="numeric"
                                   error={!!validationErrors.p_diastolicbp}
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             p_diastolicbp: text,
                                        }));
                                   }}
                                   right={
                                        <TextInput.Affix textStyle={{ fontSize: 13 }} text="  mmHg" />
                                   }
                                   backgroundColor={'white'}
                              />
                         </View>
                         {validationErrors.p_diastolicbp && (
                              <Text style={styles.errorText}>
                                   {validationErrors.p_diastolicbp}
                              </Text>
                         )}
                         <View style={styles.grpInput}>
                              <View style={styles.grpImgTxt}>
                                   <Image source={rr} alt="RR" style={styles.img} />
                                   <Text style={styles.label}>RESP. Rate</Text>
                              </View>
                              <TextInput
                                   value={opdAssessmentforEdit?.p_rsprate}
                                   style={[
                                        styles.input,
                                        validationErrors.p_rsprate && styles.errorInput,
                                   ]}
                                   keyboardType="numeric"
                                   error={!!validationErrors.p_rsprate}
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             p_rsprate: text,
                                        }));
                                   }}
                                   right={
                                        <TextInput.Affix textStyle={{ fontSize: 13 }} text="  /min" />
                                   }
                                   backgroundColor={'white'}
                              />
                         </View>
                         {validationErrors.p_rsprate && (
                              <Text style={styles.errorText}>{validationErrors.p_rsprate}</Text>
                         )}
                    </View>
                    <Text style={styles.tableWrapper2TXT}>Glasgow Coma Scale</Text>
                    <View style={styles.tableWrapper2}>
                         <View style={styles.txtInput}>
                              <Text style={styles.tableWrapperTXT}>Eye Opening</Text>
                              <TextInput
                                   style={styles.textinput}
                                   value={opdAssessmentforEdit?.eyeopening}
                                   keyboardType="numeric"
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             eyeopening: text,
                                        }));
                                        setValidationErrors(prevState => ({
                                             ...prevState,
                                             eyeopening: validateInputRange(text, 1, 4)
                                                  ? ''
                                                  : 'Eye Opening range 1-4',
                                        }));
                                   }}
                                   error={!!validationErrors.eyeopening}
                              />
                              {validationErrors.eyeopening && (
                                   <Text style={styles.errorText}>
                                        {validationErrors.eyeopening}
                                   </Text>
                              )}
                         </View>
                         <View style={styles.txtInput}>
                              <Text style={styles.tableWrapperTXT}>Verbal Resp.</Text>
                              <TextInput
                                   style={styles.textinput}
                                   value={opdAssessmentforEdit?.verbalResponse}
                                   keyboardType="numeric"
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             verbalResponse: text,
                                        }));
                                        setValidationErrors(prevState => ({
                                             ...prevState,
                                             verbalResponse: validateInputRange(text, 1, 5)
                                                  ? ''
                                                  : 'Verbal range 1-5',
                                        }));
                                   }}
                                   error={!!validationErrors.verbalResponse}
                              />
                              {validationErrors.verbalResponse && (
                                   <Text style={styles.errorText}>
                                        {validationErrors.verbalResponse}
                                   </Text>
                              )}
                         </View>
                         <View style={styles.txtInput}>
                              <Text style={styles.tableWrapperTXT}>Motor Resp.</Text>
                              <TextInput
                                   style={styles.textinput}
                                   value={opdAssessmentforEdit?.motorResponse}
                                   keyboardType="numeric"
                                   onChangeText={text => {
                                        setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             motorResponse: text,
                                        }));
                                        setValidationErrors(prevState => ({
                                             ...prevState,
                                             motorResponse: validateInputRange(text, 1, 6)
                                                  ? ''
                                                  : 'Motor range 1-6',
                                        }));
                                   }}
                                   error={!!validationErrors.motorResponse}
                              />
                              {validationErrors.motorResponse && (
                                   <Text style={styles.errorText}>
                                        {validationErrors.motorResponse}
                                   </Text>
                              )}
                         </View>
                    </View>
                    <View style={styles.tableWrapper3}>
                         <View style={styles.formGroup}>
                              <Text style={styles.tableWrapper3TXT}>Eye Opening</Text>
                              <View style={{ width: '60%' }}>
                                   <DropDown
                                        mode={'outlined'}
                                        dropDownStyle={{ backgroundColor: 'white' }}
                                        visible={showEyeopening}
                                        showDropDown={() => setshowEyeopening(true)}
                                        onDismiss={() => setshowEyeopening(false)}
                                        value={opdAssessmentforEdit?.eyeopening}
                                        setValue={(value) => setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             eyeopening: value,
                                        }))}
                                        list={relation?.map(res => ({
                                             label: res.label,
                                             value: res.value,
                                        }))}
                                   />
                              </View>
                         </View>
                         <View style={styles.formGroup}>
                              <Text style={styles.tableWrapper3TXT}>Verbal Response</Text>
                              <View style={{ width: '60%' }}>
                                   <DropDown
                                        mode={'outlined'}
                                        visible={showverbalReaponse}
                                        style={styles.dropdown}
                                        showDropDown={() => setshowverbalReaponse(true)}
                                        onDismiss={() => setshowverbalReaponse(false)}
                                        value={opdAssessmentforEdit?.verbalResponse}
                                        setValue={(value) => setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             verbalResponse: value,
                                        }))}
                                        list={relationV?.map(res => ({
                                             label: res.label,
                                             value: res.value,
                                        }))}
                                   />
                              </View>
                         </View>
                         <View style={styles.formGroup}>
                              <Text style={styles.tableWrapper3TXT}>Motor Response</Text>
                              <View style={{ width: '60%' }}>
                                   <DropDown
                                        mode={'outlined'}
                                        visible={showMotorResponse}
                                        style={styles.dropdown}
                                        showDropDown={() => setshowMotorResponse(true)}
                                        onDismiss={() => setshowMotorResponse(false)}
                                        value={opdAssessmentforEdit?.motorResponse}
                                        setValue={(value) => setOpdAssessmentforEdit(prevState => ({
                                             ...prevState,
                                             motorResponse: value,
                                        }))}
                                        list={relationM?.map(res => ({
                                             label: res.label,
                                             value: res.value,
                                        }))}
                                   />
                                   <View style={styles.spacerStyle} />
                              </View>
                         </View>
                    </View>
                    <Text style={styles.tableWrapper2TXT}>Glasgow Coma Scale Score</Text>
                    <View style={styles.tableWrapper4}>
                         <View
                              key="Mild"
                              style={[
                                   styles.gcsStatus,
                                   {
                                        backgroundColor: mildColor,
                                   },
                              ]}>
                              <Text style={styles.gcsStatusTxt}>Mild</Text>
                              <Text style={styles.gcsStatusTxt}>13-15</Text>
                         </View>
                         <View
                              key="Moderate"
                              style={[
                                   styles.gcsStatus,
                                   {
                                        backgroundColor: moderateColor,
                                   },
                              ]}>
                              <Text style={styles.gcsStatusTxt}>Moderate</Text>
                              <Text style={styles.gcsStatusTxt}>9-12</Text>
                         </View>
                         <View
                              key="Severe"
                              style={[
                                   styles.gcsStatus,
                                   {
                                        backgroundColor: severeColor,
                                   },
                              ]}>
                              <Text style={styles.gcsStatusTxt}>Severe</Text>
                              <Text style={styles.gcsStatusTxt}>3-8</Text>
                         </View>
                    </View>
                    <View style={styles.grpBtn}>
                         {/* Group Buttons .....  */}
                         <View style={styles.submitbutton}>
                              <Button
                                   mode="contained"
                                   style={styles.btn}
                                   onPress={() => navigation.replace('ReOpdMenstrualHistory')}>
                                   Previous
                              </Button>

                              <Button
                                   mode="contained"
                                   style={styles.btn}
                                   onPress={() => addVitalsData()}>
                                   Submit
                              </Button>

                              <Button
                                   mode="contained"
                                   style={styles.btn}
                                   onPress={() => navigation.navigate('ReOpdGeneralExamination')}>
                                   Next / Skip
                              </Button>
                         </View>
                    </View>

                    {opdAssessment?.map((row, index) => {
                         return (
                              <Card style={styles.card2} key={index + 1}>
                                   <Card.Content>
                                        <View style={[styles.cardBody, { gap: 10, width: 'auto' }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  Date / Time :
                                             </Text>
                                             <Text variant="titleLarge" style={styles.cardtext2}>
                                                  {row.opd_date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{row.opd_time}
                                             </Text>
                                        </View>
                                        <View style={[styles.cardBody, { gap: 8 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  Temp :
                                             </Text>
                                             <Text variant="titleLarge" style={styles.cardtext2}>
                                                  {row?.p_temp} &#8457;
                                             </Text>
                                        </View>
                                        <View style={[styles.cardBody, { gap: 8 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  Pulse :
                                             </Text>
                                             <Text variant="titleLarge" style={[styles.cardtext2]}>
                                                  {row?.p_pulse} /min
                                             </Text>
                                        </View>

                                        <View style={[styles.cardBody, { gap: 8 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  SPO2 :
                                             </Text>
                                             <Text variant="titleLarge" style={[styles.cardtext2]}>
                                                  {row?.p_spo2} %
                                             </Text>
                                        </View>
                                        <View style={[styles.cardBody, { gap: 8 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  BP :
                                             </Text>
                                             <Text variant="titleLarge" style={[styles.cardtext2]}>
                                                  {row?.p_systolicbp} / {row?.p_diastolicbp} mmHg
                                             </Text>
                                        </View>

                                        <View style={[styles.cardBody, { gap: 8 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  RR :
                                             </Text>
                                             <Text variant="titleLarge" style={styles.cardtext2}>
                                                  {row?.p_rsprate} /min
                                             </Text>
                                        </View>
                                        <View style={[styles.cardBody, { gap: 10 }]}>
                                             <Text variant="titleLarge" style={styles.cardtext}>
                                                  GC :
                                             </Text>
                                             <Text variant="titleLarge" style={styles.cardtext2}>
                                                  {row?.gcss_status} (E{row?.eyeopening}V{row?.verbalResponse}
                                                  M{row?.motorResponse})
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

export default ReOpdVitals;

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     tableWrapper: {
          marginHorizontal: 16,
     },
     grpInput: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 8,
          justifyContent: 'space-between',
     },
     label: {
          fontWeight: '600',
          marginHorizontal: 10,
     },
     input: {
          width: 150,
     },
     btn: {
          width: 'auto',
          alignSelf: 'center',
          marginVertical: 10,
     },
     title: {
          textAlign: 'center',
     },
     grpBtn: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 2,
     },
     img: {
          resizeMode: 'contain',
          width: 40,
          height: 40,
     },
     grpImgTxt: {
          flexDirection: 'row',
          alignItems: 'center',
     },

     errorText: {
          color: 'red',
          fontSize: 12,
          textAlign: 'right',
     },
     tableWrapper2: {
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
     },
     txtInput: {
          flexDirection: 'column',
          gap: 10,
          alignItems: 'center',
     },
     tableWrapperTXT: {
          fontSize: 14,
          fontWeight: '600',
          color: 'black',
     },
     tableWrapper2TXT: {
          fontSize: 18,
          fontWeight: '600',
          color: '#3888ff',
          marginVertical: 10,
          textAlign: 'center',
     },
     tableWrapper3: {
          marginVertical: 10,
          marginHorizontal: 16,
     },
     tableWrapper3TXT: {
          fontWeight: '600',
          color: 'black',
     },
     formGroup: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 6,
     },
     textinput: {
          height: 40,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          backgroundColor: 'white',
     },
     tableWrapper4: {
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: 10,
          marginBottom: 10,
     },
     gcsStatus: {
          flexDirection: 'column',
          alignItems: 'center',
          borderWidth: 0.9,
          padding: 4,
          borderColor: '#f0f2f0',
          borderRadius: 16,
          width: '30%',
     },
     gcsStatusTxt: {
          fontSize: 14,
          fontWeight: '600',
     },
     submitbutton: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
     },
     head: { height: 40, backgroundColor: '#80aaff' },
     text: { textAlign: 'center', color: 'black', padding: 2 },
     row: { height: 'auto' },

     card2: {
          marginTop: 10,
          marginHorizontal: 14,
          marginBottom: 10,
     },
     cardBody: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // width: 100,
     },
     cardtext: {
          fontWeight: '600',
          color: 'black',
          width: 85,
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
});

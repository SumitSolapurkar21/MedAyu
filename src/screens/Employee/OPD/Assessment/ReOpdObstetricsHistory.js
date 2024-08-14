import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
     Appbar,
     Button,
     RadioButton,
     TextInput,
     Divider,
     Checkbox,
     Card,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import axios from 'axios';
import { ReAssessmentOpdpageNavigation } from './OpdpageNavigation';

const ReOpdObstetricsHistory = () => {
     const { patientsData, scannedPatientsData, waitingListData, userData } =
          useContext(UserContext);
     const { hospital_id, patient_id, reception_id, uhid } = patientsData;
     const { appoint_id, mobilenumber } = scannedPatientsData;

     const navigation = useNavigation();


     //backHandler ...
     useEffect(() => {
          const backAction = () => {
               navigation.navigate('ReOpdPersonalHistory');
               return true;
          };

          const backHandler = BackHandler.addEventListener(
               'hardwareBackPress',
               backAction,
          );

          return () => backHandler.remove();
     }, []);


     //  submit handler ....


     const submitTreatmenthandler = async () => {
          const _body = {
               hospital_id: userData?.hospital_id,
               patient_id: patient_id,
               reception_id: userData?._id,
               appoint_id: waitingListData?.appoint_id || appoint_id,
               uhid: waitingListData?.uhid || uhid,
               api_type: 'OPD-OBSTETRICS-HISTORY',
               opdobstetricshistoryarray: [opdAssessmentforEdit],
          };
          try {
               await axios
                    .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
                    .then(res => {
                         const { status, message } = res.data;
                         if (status === true) {
                              FetchMobileOpdAssessment();
                              FetchMobileOpdAssessmentforEdit();
                         } else {
                              console.error(`${message}`);
                         }
                    });
          } catch (error) {
               console.error(error);
          }
     };



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
                         hospital_id: hospital_id,
                         reception_id: reception_id,
                         patient_id: patient_id,
                         appoint_id: waitingListData?.appoint_id || appoint_id,
                         api_type: 'OPD-OBSTETRICS-HISTORY',
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

     //list of FetchMobileOpdAssessment....
     const FetchMobileOpdAssessmentforEdit = async () => {
          try {
               await axios
                    .post(`${api.baseurl}/FetchMobileOpdAssessmentforEdit`, {
                         hospital_id: hospital_id,
                         reception_id: reception_id,
                         patient_id: patient_id,
                         appoint_id: waitingListData?.appoint_id || appoint_id,
                         api_type: 'OPD-OBSTETRICS-HISTORY',
                         uhid: waitingListData?.uhid || uhid,
                         mobilenumber: waitingListData?.mobilenumber || mobilenumber,
                    })
                    .then(res => {
                         setOpdAssessmentforEdit(res.data.opdobstetricshistoryarray[0]);
                    });
          } catch (error) {
               console.error(error);
          }
     };


     const displayData = opdAssessment?.map((item, index) => (
          <>
               <View key={index + 1}>
                    {Object.entries(item).map(([key, value], index) => (
                         <Card key={index + 1} style={styles.card}>
                              {Array.isArray(value) ? (
                                   <Text style={{ lineHeight: 20 }} key={index + 1} >{value.join('\n')}</Text>
                              ) : null}
                         </Card>
                    ))}
               </View>
          </>
     ));
     const _handleMore = () => {
          setVisible(true);
     };
     const [visible, setVisible] = useState(false);

     const openMenu = () => setVisible(true);

     const closeMenu = () => setVisible(false);


     const handleCheckboxChange = (field) => {
          setOpdAssessmentforEdit(prevState => ({
               ...prevState,
               [field]: !prevState[field]
          }));
     };


     return (
          <>
               {/* Appbar header */}
               <Appbar.Header>
                    <Appbar.BackAction
                         onPress={() => {
                              navigation.replace('PersonalHistory');
                         }}
                    />
                    <Appbar.Content title="Obstetrics History" />
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
                    <View style={styles.card}>
                         <View style={styles.cardDiv}>
                              <View style={styles.cardContent}>
                                   <Text style={styles.label}>G : </Text>
                                   <TextInput
                                        mode="flat"
                                        style={[styles.input2]}
                                        value={opdAssessmentforEdit?.g}
                                        onChangeText={text => {
                                             setOpdAssessmentforEdit(prevState => ({
                                                  ...prevState,
                                                  g: text,
                                             }));
                                        }}
                                        editable={true}
                                        keyboardType="numeric"
                                   />
                              </View>
                              <View style={styles.cardContent}>
                                   <Text style={styles.label}>P : </Text>
                                   <TextInput
                                        mode="flat"
                                        style={[styles.input2]}
                                        value={opdAssessmentforEdit?.p}
                                        onChangeText={text => {
                                             setOpdAssessmentforEdit(prevState => ({
                                                  ...prevState,
                                                  p: text,
                                             }));
                                        }}
                                        editable={true}
                                        keyboardType="numeric"
                                   />
                              </View>
                              <View style={styles.cardContent}>
                                   <Text style={styles.label}>L : </Text>
                                   <TextInput
                                        mode="flat"
                                        style={[styles.input2]}
                                        value={opdAssessmentforEdit?.l}
                                        onChangeText={text => {
                                             setOpdAssessmentforEdit(prevState => ({
                                                  ...prevState,
                                                  l: text,
                                             }));
                                        }}
                                        editable={true}
                                        keyboardType="numeric"
                                   />
                              </View>
                              <View style={styles.cardContent}>
                                   <Text style={styles.label}>A : </Text>
                                   <TextInput
                                        mode="flat"
                                        style={[styles.input2]}
                                        value={opdAssessmentforEdit?.a}
                                        onChangeText={text => {
                                             setOpdAssessmentforEdit(prevState => ({
                                                  ...prevState,
                                                  a: text,
                                             }));
                                        }}
                                        editable={true}
                                        keyboardType="numeric"
                                   />
                              </View>
                              <View style={styles.cardContent}>
                                   <Text style={styles.label}>D : </Text>
                                   <TextInput
                                        mode="flat"
                                        style={[styles.input2]}
                                        value={opdAssessmentforEdit?.d}
                                        onChangeText={text => {
                                             setOpdAssessmentforEdit(prevState => ({
                                                  ...prevState,
                                                  d: text,
                                             }));
                                        }}
                                        editable={true}
                                        keyboardType="numeric"
                                   />
                              </View>
                         </View>
                         <Divider />
                         <RadioButton.Group
                              onValueChange={newValue => {
                                   setOpdAssessmentforEdit(prevState => ({
                                        ...prevState,
                                        pregnant: newValue,
                                   }));
                              }}
                              value={opdAssessmentforEdit?.pregnant}>
                              <View
                                   style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                   }}>
                                   <Text style={[styles.label, { width: 200 }]}>Pregnant : </Text>
                                   <View style={styles.radioBtn}>
                                        <View style={styles.radioBtn}>
                                             <Text>Yes</Text>
                                             <RadioButton value="yes" />
                                        </View>
                                        <View style={styles.radioBtn}>
                                             <Text>No</Text>
                                             <RadioButton value="no" />
                                        </View>
                                   </View>
                              </View>
                         </RadioButton.Group>
                         <RadioButton.Group
                              onValueChange={newValue => {
                                   setOpdAssessmentforEdit(prevState => ({
                                        ...prevState,
                                        breastFeeding: newValue,
                                   }));
                              }}
                              value={opdAssessmentforEdit?.breastFeeding}>
                              <View
                                   style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                   }}>
                                   <Text style={[styles.label, { width: 200 }]}>Breast Feeding :</Text>
                                   <View style={styles.radioBtn}>
                                        <View style={styles.radioBtn}>
                                             <Text>Yes</Text>
                                             <RadioButton value="yes" />
                                        </View>
                                        <View style={styles.radioBtn}>
                                             <Text>No</Text>
                                             <RadioButton value="no" />
                                        </View>
                                   </View>
                              </View>
                         </RadioButton.Group>
                         <RadioButton.Group
                              onValueChange={newValue => {
                                   setOpdAssessmentforEdit(prevState => ({
                                        ...prevState,
                                        conception: newValue,
                                   }));
                              }}
                              value={opdAssessmentforEdit?.conception}>
                              <View
                                   style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                   }}>
                                   <Text style={[styles.label, { width: 200 }]}>
                                        Planing to Conceive :
                                   </Text>
                                   <View style={styles.radioBtn}>
                                        <View style={styles.radioBtn}>
                                             <Text>Yes</Text>
                                             <RadioButton value="yes" />
                                        </View>
                                        <View style={styles.radioBtn}>
                                             <Text>No</Text>
                                             <RadioButton value="no" />
                                        </View>
                                   </View>
                              </View>
                         </RadioButton.Group>
                         <Divider />
                         <RadioButton.Group
                              onValueChange={newValue => {
                                   setOpdAssessmentforEdit(prevState => ({
                                        ...prevState,
                                        contraception: newValue,
                                   }));
                              }}
                              value={opdAssessmentforEdit?.contraception}>
                              <View
                                   style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                   }}>
                                   <Text style={[styles.label, { width: 200 }]}>Contraception :</Text>
                                   <View style={styles.radioBtn}>
                                        <View style={styles.radioBtn}>
                                             <Text>Yes</Text>
                                             <RadioButton value="yes" />
                                        </View>
                                        <View style={styles.radioBtn}>
                                             <Text>No</Text>
                                             <RadioButton value="no" />
                                        </View>
                                   </View>
                              </View>
                              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                   <View
                                        style={{
                                             flexDirection: 'row',
                                             alignItems: 'center',
                                             width: 60,
                                        }}>
                                        <Checkbox
                                             status={opdAssessmentforEdit?.pillsChecked ? 'checked' : 'unchecked'}
                                             onPress={() => {
                                                  handleCheckboxChange('pillsChecked');
                                             }}
                                        />
                                        <Text style={styles.label}>Pill</Text>
                                   </View>
                                   <View
                                        style={{
                                             flexDirection: 'row',
                                             alignItems: 'center',
                                             width: 90,
                                        }}>
                                        <Checkbox
                                             status={opdAssessmentforEdit?.injuctionChecked ? 'checked' : 'unchecked'}
                                             onPress={() => {
                                                  handleCheckboxChange('injuctionChecked');
                                             }}
                                        />
                                        <Text style={styles.label}>Injection</Text>
                                   </View>
                                   <View
                                        style={{
                                             flexDirection: 'row',
                                             alignItems: 'center',
                                             width: 90,
                                        }}>
                                        <Checkbox
                                             status={opdAssessmentforEdit?.otherChecked ? 'checked' : 'unchecked'}
                                             onPress={() => {
                                                  handleCheckboxChange('otherChecked');
                                             }}
                                        />
                                        <Text style={styles.label}>Other</Text>
                                   </View>
                              </View>
                         </RadioButton.Group>
                    </View>
                    <View style={styles.submitbutton}>
                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => navigation.replace('ReOpdPersonalHistory')}>
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
                              onPress={() => navigation.navigate('ReOpdMenstrualHistory')}
                         >
                              Next / Skip
                         </Button>
                    </View>
                    <View style={{ padding: 8, marginBottom: 10 }}>{displayData}</View>
               </ScrollView>
          </>
     );
};

export default ReOpdObstetricsHistory;

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
          flexDirection: 'column',
          padding: 5,
          width: '33%',
     },
     label: {
          fontWeight: '600',
          color: 'black',
          width: 100,
     },
     cardDiv: {
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
     },
     head: { height: 40, backgroundColor: '#80aaff' },
     text: { textAlign: 'center', color: 'black', padding: 2 },
     row: { height: 'auto' },
     card3: {
          marginTop: 10,
          marginHorizontal: 14,
          marginBottom: 10,
     },
     cardBody: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // width: 150,
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
     card4: {
          width: 320, // 90% width of the container
          maxWidth: 340, // Maximum width of 400 pixels
          borderRadius: 5,
          padding: 10,
          marginTop: 10,
     },
});

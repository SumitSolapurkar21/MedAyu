import React, { useContext, useEffect, useState } from 'react';
import {
     BackHandler,
     FlatList,
     ScrollView,
     StyleSheet,
     Text,
     View,
} from 'react-native';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import { useNavigation } from '@react-navigation/native';
import { Appbar, RadioButton, Button, Card } from 'react-native-paper';
import { ReAssessmentOpdpageNavigation } from './OpdpageNavigation';

const ReOpdGeneralExamination = () => {
     const navigation = useNavigation();
     const { patientsData, scannedPatientsData, waitingListData, userData } =
          useContext(UserContext);
     const { hospital_id, patient_id, reception_id, uhid } = patientsData;
     const { appoint_id, mobilenumber } = scannedPatientsData;


     const [opdAssessment, setOpdAssessment] = useState([]);
     const [opdAssessmentforEdit, setOpdAssessmentforEdit] = useState({
          cyanosis: '',
          icterus: '',
          ln: '',
          odema: '',
          pallor: '',
     });
     const [visible, setVisible] = useState(false);

     useEffect(() => {
          const backAction = () => {
               navigation.replace('ReOpdVitals');
               return true;
          };

          const backHandler = BackHandler.addEventListener(
               'hardwareBackPress',
               backAction,
          );

          return () => backHandler.remove();
     }, []);

     const handleRadioChange = (name, value) => {
          setOpdAssessmentforEdit(prevState => ({
               ...prevState,
               [name]: value,
          }));
     };

     useEffect(() => {
          FetchMobileOpdAssessment();
          FetchMobileOpdAssessmentforEdit();
     }, [hospital_id, patient_id, reception_id]);

     const FetchMobileOpdAssessment = async () => {
          try {
               const response = await axios.post(`${api.baseurl}/FetchMobileOpdAssessment`, {
                    hospital_id: userData?.hospital_id,
                    reception_id: userData?._id,
                    patient_id: patient_id,
                    appoint_id: waitingListData?.appoint_id || appoint_id,
                    api_type: 'OPD-GENERAL-EXAMINATION',
                    uhid: waitingListData?.uhid || uhid,
                    mobilenumber: waitingListData?.mobilenumber || mobilenumber,
               });
               const parsedData = response.data.data;
               setOpdAssessment(parsedData);
          } catch (error) {
               console.error(error);
          }
     };

     const FetchMobileOpdAssessmentforEdit = async () => {
          try {
               const response = await axios.post(`${api.baseurl}/FetchMobileOpdAssessmentforEdit`, {
                    hospital_id: userData?.hospital_id,
                    reception_id: userData?._id,
                    patient_id: patient_id,
                    appoint_id: waitingListData?.appoint_id || appoint_id,
                    api_type: 'OPD-GENERAL-EXAMINATION',
                    uhid: waitingListData?.uhid || uhid,
                    mobilenumber: waitingListData?.mobilenumber || mobilenumber,
               });
               const data = response.data.opdgeneralexaminationhistoryarray[0];
               setOpdAssessmentforEdit(data);
          } catch (error) {
               console.error(error);
          }
     };

     const submitTreatmenthandler = async () => {
          const _body = {
               hospital_id: userData?.hospital_id,
               patient_id: patient_id,
               reception_id: userData?._id,
               appoint_id: waitingListData?.appoint_id || appoint_id,
               uhid: waitingListData?.uhid || uhid,
               api_type: 'OPD-GENERAL-EXAMINATION',
               opdgeneralexaminationhistoryarray: [opdAssessmentforEdit],
          };
          try {
               const response = await axios.post(`${api.baseurl}/AddMobileOpdAssessment`, _body);
               const { status, message } = response.data;
               if (status === true) {
                    FetchMobileOpdAssessment();
                    FetchMobileOpdAssessmentforEdit();
               } else {
                    console.error(`${message}`);
               }
          } catch (error) {
               console.error(error);
          }
     };

     const _data = [
          {
               id: 1,
               label: 'Pallor',
               content: (
                    <RadioButton.Group
                         onValueChange={newValue => handleRadioChange('pallor', newValue)}
                         value={opdAssessmentforEdit.pallor}
                    >
                         <View style={[styles.radioBtn, { marginHorizontal: 6 }]}>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="present" />
                                   <Text>Present</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="absent" />
                                   <Text>Absent</Text>
                              </View>
                         </View>
                    </RadioButton.Group>
               ),
          },
          {
               id: 2,
               label: 'Cyanosis',
               content: (
                    <RadioButton.Group
                         onValueChange={newValue => handleRadioChange('cyanosis', newValue)}
                         value={opdAssessmentforEdit.cyanosis}
                    >
                         <View style={[styles.radioBtn, { marginHorizontal: 6 }]}>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="present" />
                                   <Text>Present</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="absent" />
                                   <Text>Absent</Text>
                              </View>
                         </View>
                    </RadioButton.Group>
               ),
          },
          {
               id: 3,
               label: 'Icterus',
               content: (
                    <RadioButton.Group
                         onValueChange={newValue => handleRadioChange('icterus', newValue)}
                         value={opdAssessmentforEdit.icterus}
                    >
                         <View style={[styles.radioBtn, { marginHorizontal: 6 }]}>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="present" />
                                   <Text>Present</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="absent" />
                                   <Text>Absent</Text>
                              </View>
                         </View>
                    </RadioButton.Group>
               ),
          },
          {
               id: 4,
               label: 'LN',
               content: (
                    <RadioButton.Group
                         onValueChange={newValue => handleRadioChange('ln', newValue)}
                         value={opdAssessmentforEdit.ln}
                    >
                         <View style={[styles.radioBtn, { marginHorizontal: 6 }]}>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="present" />
                                   <Text>Present</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="absent" />
                                   <Text>Absent</Text>
                              </View>
                         </View>
                    </RadioButton.Group>
               ),
          },
          {
               id: 5,
               label: 'Odema',
               content: (
                    <RadioButton.Group
                         onValueChange={newValue => handleRadioChange('odema', newValue)}
                         value={opdAssessmentforEdit.odema}
                    >
                         <View style={[styles.radioBtn, { marginHorizontal: 6 }]}>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="present" />
                                   <Text>Present</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <RadioButton value="absent" />
                                   <Text>Absent</Text>
                              </View>
                         </View>
                    </RadioButton.Group>
               ),
          },
     ];

     const renderItem = ({ item }) => (
          <ScrollView
               horizontal
               style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderColor: 'black',
               }}
          >
               <View
                    style={{
                         backgroundColor: 'white',
                         borderRightWidth: 1,
                         borderLeftWidth: 1,
                         borderTopWidth: 1,
                         borderColor: 'black',
                    }}
               >
                    <Text style={styles.cellLabel}>{item.label}</Text>
               </View>
               <View
                    style={{
                         backgroundColor: 'white',
                         borderRightWidth: 1,
                         borderTopWidth: 1,
                         borderColor: 'black',
                    }}
               >
                    <View style={styles.cellText}>{item.content}</View>
               </View>
          </ScrollView>
     );

     const displayData = opdAssessment?.map((item, index) => (
          <View key={index}>
               {Object.entries(item).map(([key, value]) => (
                    <Card key={key} style={styles.card2}>
                         {Array.isArray(value) ? (
                              <Text style={{ lineHeight: 20 }}>{value.join('\n')}</Text>
                         ) : null}
                    </Card>
               ))}
          </View>
     ));

     const _handleMore = () => {
          setVisible(true);
     };

     const openMenu = () => setVisible(true);
     const closeMenu = () => setVisible(false);

     return (
          <>
               {/* Appbar header */}
               <Appbar.Header>
                    <Appbar.BackAction
                         onPress={() => {
                              navigation.replace('ReOpdVitals');
                         }}
                    />
                    <Appbar.Content title="General Examination" />
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
               <ScrollView vertical>
                    <ScrollView horizontal>
                         <View style={{ padding: 10 }}>
                              <FlatList
                                   data={_data}
                                   renderItem={renderItem}
                                   keyExtractor={item => item.id}
                              />
                         </View>
                    </ScrollView>
                    {/* Group Buttons .....  */}
                    <View style={styles.submitbutton}>
                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => navigation.replace('ReOpdVitals')}
                         >
                              Previous
                         </Button>

                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => submitTreatmenthandler()}
                         >
                              Submit
                         </Button>

                         <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => navigation.replace('ReOpdDiagnosis')}
                         >
                              Next / Skip
                         </Button>
                    </View>

                    <View style={{ padding: 10 }}>{displayData}</View>
               </ScrollView>
          </>
     );
};

export default ReOpdGeneralExamination;

const styles = StyleSheet.create({
     cellLabel: {
          fontSize: 16,
          padding: 5,
          color: 'black',
          width: 150,
          marginTop: 6,
     },
     cellText: {
          fontSize: 16,
          padding: 5,
          color: 'black',
     },
     radioBtn: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     submitbutton: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginVertical: 10,
     },
     head: { height: 40, backgroundColor: '#80aaff' },
     text: { textAlign: 'center', color: 'black', padding: 2 },
     row: { height: 'auto' },

     card2: {
          marginBottom: 10,
          padding: 10,
     },
     cardBody: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: 120,
     },
     cardtext: {
          fontWeight: '600',
          color: 'black',
     },
     cardtext2: {
          fontWeight: '600',
          flexWrap: 'wrap',
     },
     cardBodyHead: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
     },
     card: {
          padding: 10,
          width: 320,
          maxWidth: 340,
          marginBottom: 10,
     },
});

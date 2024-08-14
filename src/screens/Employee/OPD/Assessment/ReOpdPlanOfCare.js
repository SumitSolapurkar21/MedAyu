import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Checkbox, Button, Card } from 'react-native-paper';
import { Table, Row, Rows } from 'react-native-table-component';
import { OpdpageNavigation, ReAssessmentOpdpageNavigation } from './OpdpageNavigation';

const ReOpdPlanOfCare = () => {
     const { patientsData, scannedPatientsData, waitingListData, userData } =
          useContext(UserContext);
     const { hospital_id, patient_id, reception_id, uhid } = patientsData;
     const { appoint_id, mobilenumber } = scannedPatientsData;

     const navigation = useNavigation();
     const [checkedValues, setCheckedValues] = useState({});


     //backHandler ...
     useEffect(() => {
          const backAction = () => {
               navigation.replace('ReOpdDiagnosis');
               return true;
          };

          const backHandler = BackHandler.addEventListener(
               'hardwareBackPress',
               backAction,
          );

          return () => backHandler.remove();
     }, []);
     // checkbox handler .....

     // Function to handle checkbox toggle
     const handleCheckboxToggle = key => {
          setCheckedValues(prevState => ({
               ...prevState,
               [key]: !prevState[key], // Toggle the checkbox value
          }));
     };

     //
     const tableHead8 = ['Plan of Care'];
     const tableData8 = [
          {
               id: 1,

               radio1: (
                    <>
                         <View style={styles.radioBtn}>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="preventive"
                                        status={checkedValues['preventive'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('preventive')}
                                   />
                                   <Text>PREVENTIVE</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="curative"
                                        status={checkedValues['curative'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('curative')}
                                   />
                                   <Text>CURATIVE</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="supportive"
                                        status={checkedValues['supportive'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('supportive')}
                                   />
                                   <Text>SUPPORTIVE</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="rehabilitative"
                                        status={
                                             checkedValues['rehabilitative'] ? 'checked' : 'unchecked'
                                        }
                                        onPress={() => handleCheckboxToggle('rehabilitative')}
                                   />
                                   <Text>REHABILITATIVE</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="pallative"
                                        status={checkedValues['pallative'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('pallative')}
                                   />
                                   <Text>PALLATIVE</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="eolcare"
                                        status={checkedValues['eolcare'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('eolcare')}
                                   />
                                   <Text>EOL CARE</Text>
                              </View>
                         </View>
                    </>
               ),
          },
          {
               id: 2,

               radio1: (
                    <>
                         <View style={styles.radioBtn}>
                              <View style={styles.radioBtn}>
                                   <Text>THERPAY PLAN : </Text>
                                   <Checkbox
                                        value="medicine"
                                        status={checkedValues['medicine'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('medicine')}
                                   />
                                   <Text>MEDICNE</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="surgery"
                                        status={checkedValues['surgery'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('surgery')}
                                   />
                                   <Text>SURGERY</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="procedure"
                                        status={checkedValues['procedure'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('procedure')}
                                   />
                                   <Text>PROCEDURE</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="physiotherapy"
                                        status={
                                             checkedValues['physiotherapy'] ? 'checked' : 'unchecked'
                                        }
                                        onPress={() => handleCheckboxToggle('physiotherapy')}
                                   />
                                   <Text>PHYSIOTHERAPY</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="diettherapy"
                                        status={checkedValues['diettherapy'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('diettherapy')}
                                   />
                                   <Text>DIET THERAPY</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="occupationaltherapy"
                                        status={
                                             checkedValues['occupationaltherapy'] ? 'checked' : 'unchecked'
                                        }
                                        onPress={() => handleCheckboxToggle('occupationaltherapy')}
                                   />
                                   <Text>OCCUPATIONAL THERAPY</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="counselling"
                                        status={checkedValues['counselling'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('counselling')}
                                   />
                                   <Text>COUNSELLING</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="physical therapy"
                                        status={
                                             checkedValues['physicaltherapy'] ? 'checked' : 'unchecked'
                                        }
                                        onPress={() => handleCheckboxToggle('physicaltherapy')}
                                   />
                                   <Text>PHYSICAL THERAPY</Text>
                              </View>
                              <View style={styles.radioBtn}>
                                   <Checkbox
                                        value="other"
                                        status={checkedValues['other'] ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxToggle('other')}
                                   />
                                   <Text>OTHER</Text>
                              </View>
                         </View>
                    </>
               ),
          },
     ];
     const _tableData8 = tableData8?.map(item => {
          return [item.radio1];
     });
     const [widthArr, setWidthArr] = useState([]);
     const [headwidthArr, setheadWidthArr] = useState([]);
     useEffect(() => {
          setheadWidthArr([340, ...Array(tableHead8?.length - 1).fill(0)]);
          setWidthArr([338, ...Array(_tableData8?.length - 1).fill(0)]);
     }, []);

     //  submit handler ....
     const submitTreatmenthandler = async () => {
          const _body = {
               hospital_id: userData?.hospital_id,
               patient_id: patient_id,
               reception_id: userData?._id,
               appoint_id: waitingListData?.appoint_id || appoint_id,
               uhid: uhid,
               api_type: 'OPD-PLAN-OF-CARE',
               opdplanofcarehistoryarray: [checkedValues],
          };
          try {
               await axios
                    .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
                    .then(res => {
                         const { status, message } = res.data;
                         if (status === true) {
                              setCheckedValues({});
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
     const keys3 = [
          'Preventive',
          'Medicine',
          'Physiotherapy',
          'Physicaltherapy',
          'Date / Time',
     ];
     const [widthArr2, setWidthArr2] = useState([]);
     useEffect(() => {
          setWidthArr2([120, 120, 150, 120, 120, ...Array(keys3?.length).fill(2)]);
     }, []);
     useEffect(() => {
          FetchMobileOpdAssessment();
          return () => { };
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
                         api_type: 'OPD-PLAN-OF-CARE',
                         uhid: uhid,
                         mobilenumber: waitingListData?.mobilenumber || mobilenumber,
                    })
                    .then(res => {
                         setOpdAssessment(res.data.data);
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
                              navigation.replace('ReOpdDiagnosis');
                         }}
                    />
                    <Appbar.Content title="Plan oF Care" style={styles.appbar_title} />
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
               <ScrollView
                    vertical
                    showsVerticalScrollIndicator={false}
                    style={styles.container}>
                    {/*  */}
                    <View style={styles.tableDiv}>
                         <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
                              <Row
                                   data={tableHead8}
                                   widthArr={headwidthArr}
                                   style={styles.head}
                                   textStyle={styles.headtext}
                              />
                         </Table>
                         <ScrollView style={styles.dataWrapper}>
                              <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
                                   <Rows
                                        data={_tableData8}
                                        widthArr={widthArr}
                                        style={[styles.row]}
                                        textStyle={styles.text}
                                   />
                              </Table>
                         </ScrollView>
                    </View>

                    <View style={styles.submitbutton}>
                         <Button
                              mode="contained"
                              onPress={() => navigation.replace('ReOpdDiagnosis')}>
                              Previous
                         </Button>
                         <Button mode="contained" onPress={() => submitTreatmenthandler()}>
                              Submit
                         </Button>
                         <Button
                              mode="contained"
                              onPress={() => navigation.navigate('ReOpdTreatment')}>
                              Next / Skip
                         </Button>
                    </View>

                    {opdAssessment?.length > 0 &&
                         opdAssessment?.map((row, index) => {
                              return (
                                   <Card style={styles.card2} key={index + 1}>
                                        <Card.Content>
                                             <View style={styles.cardBodyHead}>
                                                  <View style={[styles.cardBody, { gap: 8 }]}>
                                                       <Text variant="titleLarge" style={styles.cardtext}>
                                                            Preventive :
                                                       </Text>
                                                       <Text variant="titleLarge" style={styles.cardtext2}>
                                                            {row?.preventive ? 'Yes' : 'No'}
                                                       </Text>
                                                  </View>
                                                  <View style={[styles.cardBody, { gap: 8 }]}>
                                                       <Text variant="titleLarge" style={styles.cardtext}>
                                                            Medicine :
                                                       </Text>
                                                       <Text variant="titleLarge" style={styles.cardtext2}>
                                                            {row?.medicine ? 'Yes' : 'No'}
                                                       </Text>
                                                  </View>
                                             </View>
                                             <View style={styles.cardBodyHead}>
                                                  <View style={[styles.cardBody, { gap: 8 }]}>
                                                       <Text variant="titleLarge" style={styles.cardtext}>
                                                            Physiotherapy :
                                                       </Text>
                                                       <Text variant="titleLarge" style={[styles.cardtext2]}>
                                                            {row?.physiotherapy ? 'Yes' : 'No'}
                                                       </Text>
                                                  </View>
                                                  <View style={[styles.cardBody, { gap: 8 }]}>
                                                       <Text variant="titleLarge" style={styles.cardtext}>
                                                            Physicaltherapy :
                                                       </Text>
                                                       <Text variant="titleLarge" style={[styles.cardtext2]}>
                                                            {row?.physicaltherapy ? 'Yes' : 'No'}
                                                       </Text>
                                                  </View>
                                             </View>

                                             {/* <View style={styles.cardBodyHead}> */}

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

export default ReOpdPlanOfCare;

const styles = StyleSheet.create({
     submitbutton: {
          flexDirection: 'row',
          gap: 10,
          // bottom: 10,
          // position: 'absolute',
          // textAlign: 'center',
          alignSelf: 'center',
     },
     container: {
          flex: 1,
          padding: 10,
     },
     head: { height: 40, backgroundColor: '#80aaff' },
     headtext: {
          textAlign: 'left',
          color: 'white',
          fontSize: 18,
          marginLeft: 6,
          fontWeight: '600',
     },
     text: { textAlign: 'left', color: 'black', fontSize: 14, marginLeft: 6 },
     dataWrapper: { marginTop: -1 },
     row: {
          height: 'auto',
     },
     cellText: {
          fontSize: 11,
          color: '#071bf5',
          marginLeft: 6,
     },
     tableDiv: {
          marginBottom: 10,
     },
     radioText: {
          marginLeft: 8,
     },
     checkBoxText: {
          flexWrap: 'wrap',
          width: 200,
     },
     radioBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
     },
     card2: {
          marginHorizontal: 6,
          marginVertical: 10,
     },
     cardBody: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // width: 140,
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
});

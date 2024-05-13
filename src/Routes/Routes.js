import {Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/Patients/Login';
import Otp from '../screens/Patients/Otp';
import DoctorList from '../screens/Patients/DoctorList';
import TimeSlot from '../screens/Patients/TimeSlot';
import Ehome from '../screens/Employee/Ehome';
import EpatientRegistration from '../screens/Employee/EpatientRegistration';
import Scanner from '../components/Scanner/Scanner';
import EpatientDetails from '../screens/Employee/EpatientDetails';
import Eappointment from '../screens/Employee/Eappointment';
import DateTimeAppointment from '../components/DateTimeAppointment';
import EipregistrationProfile from '../screens/Employee/EipregistrationForm/EipregistrationProfile';
import EipdregistrationSocioeconomics from '../screens/Employee/EipregistrationForm/EipdregistrationSocioeconomics';
import EipdregistrationIdentification from '../screens/Employee/EipregistrationForm/EipdregistrationIdentification';
import EipdregistrationInsurance from '../screens/Employee/EipregistrationForm/EipdregistrationInsurance';
import EipdregistrationEmergencyContact from '../screens/Employee/EipregistrationForm/EipdregistrationEmergencyContact';
import Edepartment from '../screens/Employee/Edepartment';
import Edoctors from '../screens/Employee/Edoctors';
import BillLayout from '../screens/Employee/Bill/BillLayout';
import BillHistory from '../screens/Employee/Bill/BillHistory';
import Pdf from '../components/Pdf/Pdf';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import UserContext from '../components/Context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BillAddItems from '../screens/Employee/Bill/BillAddItems';
import BillEditItems from '../screens/Employee/Bill/BillEditItems';
import Eipdoptions from '../screens/Employee/Eipdoptions';
import Epatientvital from '../screens/Employee/Epatientvital';
import Signature from '../components/Signature/Signature';
import Epatientconsentform from '../screens/Employee/EipregistrationForm/Epatientconsentform';
import Epatientadt from '../screens/Employee/Epatientadt';
import Epatientvitalhistory from '../screens/Employee/Epatientvitalhistory';
import Eipdbeds from '../screens/Employee/Eipdbeds';
import EpatientDiagnosis from '../screens/Employee/EpatientDiagnosis';
import EpatientTreatment from '../screens/Employee/EpatientTreatment';
import EpatientPresentComplaint from '../screens/Employee/EpatientPresentComplaint';
import BillEditItemForm from '../screens/Employee/Bill/BillEditItemForm';
import EpatientTreatmentHistory from '../screens/Employee/EpatientTreatmentHistory';
import EpatientTreatmentPrescription from '../screens/Employee/EpatientTreatmentPrescription';
import EpatientTreatmentPrescriptionEdit from '../screens/Employee/EpatientTreatmentPrescriptionEdit';
import EpatientProcedure from '../screens/Employee/Procedure/EpatientProcedure';
import ProcedureContent from '../screens/Employee/Procedure/ProcedureContent';
import ProcedureServiceType from '../screens/Employee/Procedure/ProcedureServiceType';
import Procedurehistory from '../screens/Employee/Procedure/Procedurehistory';
import Preprecedureprescription from '../screens/Employee/Procedure/Preprecedureprescription';
import Prepostprocedure from '../screens/Employee/Procedure/Prepostprocedure';
import Editprocedure from '../screens/Employee/Procedure/Editprocedure';
import EditPreprocedure from '../screens/Employee/Procedure/EditPreProcedure';
import DischargeInitiation from '../screens/Employee/Discharge/DischargeInitiation';
import PatientDischargeSummary from '../screens/Employee/Discharge/PatientDischargeSummary';
import PatientDischargeHistory from '../screens/Employee/Discharge/PatientDischargeHistory';
import PatientDischargeDiagnosis from '../screens/Employee/Discharge/PatientDischargeDiagnosis';
import PatientDischargeTreatment from '../screens/Employee/Discharge/PatientDischargeTreatment';
import PatientDischargeInvestigation from '../screens/Employee/Discharge/PatientDischargeInvestigation';
import ConditionAtAdmission from '../screens/Employee/Discharge/ConditionAtAdmission';
import ConditionAtDischarge from '../screens/Employee/Discharge/ConditionAtDischarge';
import OpdHomePage from '../screens/Employee/OPD/OpdHomePage';
import OpdComplaints from '../screens/Employee/OPD/Assessment/OpdComplaints';
import OpdPastHistory from '../screens/Employee/OPD/Assessment/OpdPastHistory';
import FamilyHistory from '../screens/Employee/OPD/Assessment/FamilyHistory';
import MedicineHistory from '../screens/Employee/OPD/Assessment/MedicineHistory';
import PersonalHistory from '../screens/Employee/OPD/Assessment/PersonalHistory';
import ObstetricsHistory from '../screens/Employee/OPD/Assessment/ObstetricsHistory';
import MenstrualHistory from '../screens/Employee/OPD/Assessment/MenstrualHistory';
import OpdVitals from '../screens/Employee/OPD/Assessment/OpdVitals';
import GeneralExamination from '../screens/Employee/OPD/Assessment/GeneralExamination';
import SystemicExamination from '../screens/Employee/OPD/Assessment/SystemicExamination';
import OpdDiagnosis from '../screens/Employee/OPD/Assessment/OpdDiagnosis';
import OpdInvestigation from '../screens/Employee/OPD/Assessment/OpdInvestigation';
import OpdPlanOfCare from '../screens/Employee/OPD/Assessment/OpdPlanOfCare';
import OpdTreatment from '../screens/Employee/OPD/Assessment/OpdTreatment';
import OpdProcedure from '../screens/Employee/OPD/Assessment/OpdProcedure';
import Home from '../screens/Patients/Home';
import Consult from '../screens/Patients/Consult';
import Medicines from '../screens/Patients/Medicines';
import Tests from '../screens/Patients/Tests';
import HealthRecords from '../screens/Patients/HealthRecords';
import AttendantHome from '../screens/Attendant/AttendantHome';
import HouseKeepingHome from '../screens/HouseKeeping/HouseKeepingHome';
import NurseHome from '../screens/Nurse/NurseHome';
import PExecutiveHome from '../screens/PExecutive/PExecutiveHome';
import SecurityHome from '../screens/Security/SecurityHome';
import PharmacyHome from '../screens/Pharmacy/PharmacyHome';
import KitchenHome from '../screens/Kitchen/KitchenHome';
import HRHome from '../screens/HR/HRHome';
import HrModal from '../screens/HRModal/HrModal';
import Regularization from '../screens/HRModal/Regularization/Regularization';
import LeaveHomePage from '../screens/HRModal/Leave/LeaveHomePage';
import Expenses from '../components/Expenses/Expenses';
import DashboardHomePage from '../screens/Employee/Dashboard/DashboardHomePage';
import {Listofpatients} from '../screens/Employee/Dashboard/Listofpatients';
import DischargeScanner from '../screens/Employee/Discharge/DischargeScanner';
import Dashboardpatientslist from '../screens/Employee/Dashboard/Dashboardpatientslist';
import OpdAdvice from '../screens/Employee/OPD/Assessment/OpdAdvice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const {setIsLoggedIn, selectCategory} = useContext(UserContext);

  const logoutHandler = async () => {
    // Clear user token from AsyncStorage
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginPage"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpPage"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DoctorList"
          component={DoctorList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TimeSlot"
          component={TimeSlot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Ehome"
          component={Ehome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EpatientRegistration"
          component={EpatientRegistration}
          options={() => ({
            title: 'Patient Details',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="QRScanner"
          component={Scanner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DischargeScanner"
          component={DischargeScanner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EpatientDetails"
          component={EpatientDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Eappointment"
          component={Eappointment}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
              name="Eipdregistration"
              component={Eipdregistration}
              options={{headerShown: false}}
            /> */}
        <Stack.Screen
          name="DTAppointment"
          component={DateTimeAppointment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EipdregistrationProfile"
          component={EipregistrationProfile}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EipdregistrationSocioeconomics"
          component={EipdregistrationSocioeconomics}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EipdregistrationIdentification"
          component={EipdregistrationIdentification}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EipdregistrationInsurance"
          component={EipdregistrationInsurance}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EipdregistrationEmergencyContact"
          component={EipdregistrationEmergencyContact}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Edepartment"
          component={Edepartment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edoctors"
          component={Edoctors}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BillLayout"
          component={BillLayout}
          options={({navigation}) => ({
            headerShown: false,
            title: 'Patient Bill',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="BillHistory"
          component={BillHistory}
          options={({navigation}) => ({
            title: 'Patient Bill History',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="BillAddItems"
          component={BillAddItems}
          options={({navigation}) => ({
            title: 'Add Items to Sale',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="BillEditItems"
          component={BillEditItems}
          options={({navigation}) => ({
            title: 'Edit Items',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="ExportPdf"
          component={Pdf}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Eipdoptions"
          component={Eipdoptions}
          options={({navigation}) => ({
            title: 'Select IPD Option',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Epatientvital"
          component={Epatientvital}
          options={({navigation}) => ({
            title: 'Add Vitals',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Signature"
          component={Signature}
          options={({navigation}) => ({
            title: 'Add Signature',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Epatientconsentform"
          component={Epatientconsentform}
          options={({navigation}) => ({
            title: 'Consent Form',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Epatientadt"
          component={Epatientadt}
          options={({navigation}) => ({
            title: 'A-D-T',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Epatientvitalhistory"
          component={Epatientvitalhistory}
          options={({navigation}) => ({
            title: 'Vitals History',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Eipdbeds"
          component={Eipdbeds}
          options={({navigation}) => ({
            title: 'Add Room and Bed',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EpatientDiagnosis"
          component={EpatientDiagnosis}
          options={({navigation}) => ({
            title: 'Diagnosis',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EpatientPresentComplaint"
          component={EpatientPresentComplaint}
          options={({navigation}) => ({
            title: 'Complaint',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EpatientTreatment"
          component={EpatientTreatment}
          options={({navigation}) => ({
            title: 'Treatments',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EpatientTreatmentHistory"
          component={EpatientTreatmentHistory}
          options={({navigation}) => ({
            title: 'Treatment History',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EpatientTreatmentPrescription"
          component={EpatientTreatmentPrescription}
          options={({navigation}) => ({
            title: 'Treatment Prescription',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="BillEditItemForm"
          component={BillEditItemForm}
          options={({navigation}) => ({
            title: 'Edit Bill Details',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EpatientTreatmentPrescriptionEdit"
          component={EpatientTreatmentPrescriptionEdit}
          options={({navigation}) => ({
            title: 'Edit Treatment Prescription',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EpatientProcedure"
          component={EpatientProcedure}
          options={({navigation}) => ({
            title: 'Procedure',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="ProcedureContent"
          component={ProcedureContent}
          options={({navigation}) => ({
            title: 'Select Procedure',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="ProcedureServiceType"
          component={ProcedureServiceType}
          options={({navigation}) => ({
            title: `${selectCategory}`,
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Procedurehistory"
          component={Procedurehistory}
          options={({navigation}) => ({
            title: `${selectCategory} HISTORY`,
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Preprecedureprescription"
          component={Preprecedureprescription}
          // options={({navigation}) => ({
          //   title: `PRESCRIPTION`,
          //   headerRight: () => (
          //     <FontAwesome
          //       name="sign-out"
          //       size={22}
          //       color="#127359"
          //       style={{marginLeft: 20}}
          //       onPress={() => {
          //         navigation.navigate('LoginPage'), logoutHandler();
          //       }}
          //     />
          //   ),

          //   headerTitleStyle: {fontSize: 16},
          // })}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Prepostprocedure"
          component={Prepostprocedure}
          options={({navigation}) => ({
            title: `Procedures`,
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Editprocedure"
          component={Editprocedure}
          options={({navigation}) => ({
            title: `Edit Post-Procedure`,
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EditPreprocedure"
          component={EditPreprocedure}
          options={({navigation}) => ({
            title: `Edit Pre-Procedure`,
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        {/* discharge */}
        <Stack.Screen
          name="DischargeInitiation"
          component={DischargeInitiation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PatientDischargeSummary"
          component={PatientDischargeSummary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PatientDischargeHistory"
          component={PatientDischargeHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PatientDischargeDiagnosis"
          component={PatientDischargeDiagnosis}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PatientDischargeTreatment"
          component={PatientDischargeTreatment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PatientDischargeInvestigation"
          component={PatientDischargeInvestigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConditionAtAdmission"
          component={ConditionAtAdmission}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConditionAtDischarge"
          component={ConditionAtDischarge}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdHomePage"
          component={OpdHomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdComplaints"
          component={OpdComplaints}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdPastHistory"
          component={OpdPastHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FamilyHistory"
          component={FamilyHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MedicineHistory"
          component={MedicineHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalHistory"
          component={PersonalHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ObstetricsHistory"
          component={ObstetricsHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MenstrualHistory"
          component={MenstrualHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdVitals"
          component={OpdVitals}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GeneralExamination"
          component={GeneralExamination}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SystemicExamination"
          component={SystemicExamination}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdDiagnosis"
          component={OpdDiagnosis}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdInvestigation"
          component={OpdInvestigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdPlanOfCare"
          component={OpdPlanOfCare}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdTreatment"
          component={OpdTreatment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdProcedure"
          component={OpdProcedure}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AttendantHome"
          component={AttendantHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HouseKeepingHome"
          component={HouseKeepingHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NurseHome"
          component={NurseHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PExecutiveHome"
          component={PExecutiveHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SecurityHome"
          component={SecurityHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PharmacyHome"
          component={PharmacyHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="KitchenHome"
          component={KitchenHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HRHome"
          component={HRHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HrModal"
          component={HrModal}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Regularization"
          component={Regularization}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LeaveHomePage"
          component={LeaveHomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Expenses"
          component={Expenses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashboardHomePage"
          component={DashboardHomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Listofpatients"
          component={Listofpatients}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboardpatientslist"
          component={Dashboardpatientslist}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OpdAdvice"
          component={OpdAdvice}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
function Tabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: '#FFA500',
          tabBarInactiveTintColor: '#127359',
          tabBarLabelStyle: {fontSize: 11, fontWeight: '600'},
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <FontAwesome6
                name="house"
                color={focused ? '#FFA500' : color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Consult"
          component={Consult}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <FontAwesome6
                name="user-doctor"
                color={focused ? '#FFA500' : color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Medicines"
          component={Medicines}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <FontAwesome6
                name="capsules"
                color={focused ? '#FFA500' : color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Tests"
          component={Tests}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <FontAwesome6
                name="microscope"
                color={focused ? '#FFA500' : color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="HealthRecords"
          component={HealthRecords}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <FontAwesome6
                name="table-list"
                color={focused ? '#FFA500' : color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default Routes;

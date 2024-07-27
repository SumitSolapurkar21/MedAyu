import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { Button, Divider, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../../../components/Context/Context';

export const OpdpageNavigation = ({ visible, openMenu, closeMenu }) => {
  const { consultSelection } = useContext(UserContext)
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        right: 35,
        top: 60,
      }}>
      <Menu
        contentStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '105%' }}
        style={styles.menuItem}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}></Button>}>
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdComplaints'), closeMenu();
          }}
          title="Complaints"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdPastHistory'), closeMenu();
          }}
          title="Past History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('FamilyHistory'), closeMenu();
          }}
          title="Family History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('MedicineHistory'), closeMenu();
          }}
          title="Medicine History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('PersonalHistory'), closeMenu();
          }}
          title="Personal History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ObstetricsHistory'), closeMenu();
          }}
          title="Obstetrics History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('MenstrualHistory'), closeMenu();
          }}
          title="Menstrual History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdVitals'), closeMenu();
          }}
          title="Vitals"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('GeneralExamination'), closeMenu();
          }}
          title="General Examination"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('SystemicExamination'), closeMenu();
          }}
          title="Systemic Examination"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdDiagnosis'), closeMenu();
          }}
          title="Diagnosis"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdInvestigation'), closeMenu();
          }}
          title="Investigation"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdPlanOfCare'), closeMenu();
          }}
          title="Plan of care"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdTreatment'), closeMenu();
          }}
          title="Treatment"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdProcedure'), closeMenu();
          }}
          title="Procedure"
        />

        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdAdvice'), closeMenu();
          }}
          title="Advice"
        />

        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('OpdFollowup');
            closeMenu();
          }}
          title="Follow Up"
        />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            if (consultSelection === 'dashboard') {
              navigation.replace('DashboardHomePage')
            } else if (consultSelection === 'scanpatient') {
              navigation.replace('EpatientDetails')
            }
            closeMenu();
          }}
          title="Home"
        />
      </Menu>
    </View>
  );
};

export const OpdAyurvedicNavigation = ({ visible, openMenu, closeMenu }) => {
  const { consultSelection } = useContext(UserContext)
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        right: 35,
        top: 60,
      }}>
      <Menu
        contentStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '105%' }}
        style={styles.menuItem}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}></Button>}>
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('Prakruti'), closeMenu();
          }}
          title="Prakruti"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('AshtvidhPariksha'), closeMenu();
          }}
          title="Ashtvidh"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('DashavidhPariksha'), closeMenu();
          }}
          title="Dashavidh"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('SrotasPariksha'), closeMenu();
          }}
          title="Srotas"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('Samprapti'), closeMenu();
          }}
          title="Samprapti"
        />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            if (consultSelection === 'dashboard') {
              navigation.replace('DashboardHomePage')
            } else if (consultSelection === 'scanpatient') {
              navigation.replace('EpatientDetails')
            }
            closeMenu();
          }}
          title="Home"
        />
      </Menu>

    </View>
  );
};

export const IpdRegistrationNavigation = ({ visible, openMenu, closeMenu }) => {
  const { consultSelection } = useContext(UserContext)
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        right: 35,
        top: 60,
      }}>
      <Menu
        contentStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '105%' }}
        style={styles.menuItem}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}></Button>}>
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationProfile'), closeMenu();
          }}
          title="Profile"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationSocioeconomics'), closeMenu();
          }}
          title="Socioeconomics"
        />
        <Divider />

        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationIdentification'), closeMenu();
          }}
          title="Identification"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationInsurance'), closeMenu();
          }}
          title="Insurance"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationEmergencyContact'), closeMenu();
          }}
          title="EmergencyContact"
        />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('Epatientconsentform'), closeMenu();
          }}
          title="Consent Form"
        />
      </Menu>
    </View>
  );
};

// re assissment...
export const ReAssessmentOpdpageNavigation = ({ visible, openMenu, closeMenu }) => {
  const { consultSelection } = useContext(UserContext)
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        right: 35,
        top: 60,
      }}>
      <Menu
        contentStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '105%' }}
        style={styles.menuItem}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}></Button>}>
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdComplaints'), closeMenu();
          }}
          title="Complaints"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdPastHistory'), closeMenu();
          }}
          title="Past History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdFamilyHistory'), closeMenu();
          }}
          title="Family History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdMedicineHistory'), closeMenu();
          }}
          title="Medicine History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdPersonalHistory'), closeMenu();
          }}
          title="Personal History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdObstetricsHistory'), closeMenu();
          }}
          title="Obstetrics History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdMenstrualHistory'), closeMenu();
          }}
          title="Menstrual History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdVitals'), closeMenu();
          }}
          title="Vitals"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdGeneralExamination'), closeMenu();
          }}
          title="General Examination"
        />
        <Divider />
        {/* <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdSystemicExamination'), closeMenu();
          }}
          title="Systemic Examination"
        />
        <Divider /> */}
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdDiagnosis'), closeMenu();
          }}
          title="Diagnosis"
        />
        <Divider />
        {/* <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdInvestigation'), closeMenu();
          }}
          title="Investigation"
        />
        <Divider /> */}
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdPlanOfCare'), closeMenu();
          }}
          title="Plan of care"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdTreatment'), closeMenu();
          }}
          title="Treatment"
        />
        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdProcedure'), closeMenu();
          }}
          title="Procedure"
        />

        <Divider />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdAdvice'), closeMenu();
          }}
          title="Advice"
        />

        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            navigation.replace('ReOpdFollowup');
            closeMenu();
          }}
          title="Follow Up"
        />
        <Menu.Item
          contentStyle={{ width: 120 }}
          dense
          onPress={() => {
            if (consultSelection === 'dashboard') {
              navigation.replace('DashboardHomePage')
            } else if (consultSelection === 'scanpatient') {
              navigation.replace('EpatientDetails')
            }
            closeMenu();
          }}
          title="Home"
        />
      </Menu>
    </View>
  );
};
const styles = StyleSheet.create({});

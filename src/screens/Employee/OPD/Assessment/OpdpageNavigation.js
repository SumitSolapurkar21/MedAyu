import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Divider, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const OpdpageNavigation = ({visible, openMenu, closeMenu}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        right: 35,
        top: 60,
      }}>
      <Menu
        contentStyle={{flexDirection: 'row', flexWrap: 'wrap', width: '105%'}}
        style={styles.menuItem}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}></Button>}>
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdComplaints'), closeMenu();
          }}
          title="Complaints"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdPastHistory'), closeMenu();
          }}
          title="Past History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('FamilyHistory'), closeMenu();
          }}
          title="Family History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('MedicineHistory'), closeMenu();
          }}
          title="Medicine History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('PersonalHistory'), closeMenu();
          }}
          title="Personal History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('ObstetricsHistory'), closeMenu();
          }}
          title="Obstetrics History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('MenstrualHistory'), closeMenu();
          }}
          title="Menstrual History"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdVitals'), closeMenu();
          }}
          title="Vitals"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('GeneralExamination'), closeMenu();
          }}
          title="General Examination"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('SystemicExamination'), closeMenu();
          }}
          title="Systemic Examination"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdDiagnosis'), closeMenu();
          }}
          title="Diagnosis"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdInvestigation'), closeMenu();
          }}
          title="Investigation"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdPlanOfCare'), closeMenu();
          }}
          title="Plan of care"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdTreatment'), closeMenu();
          }}
          title="Treatment"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdProcedure'), closeMenu();
          }}
          title="Procedure"
        />

        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('OpdAdvice'), closeMenu();
          }}
          title="Advice"
        />
      </Menu>
    </View>
  );
};

export const OpdAyurvedicNavigation = ({visible, openMenu, closeMenu}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        right: 35,
        top: 60,
      }}>
      <Menu
        contentStyle={{flexDirection: 'row', flexWrap: 'wrap', width: '105%'}}
        style={styles.menuItem}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}></Button>}>
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('Prakruti'), closeMenu();
          }}
          title="Prakruti"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('AshtvidhPariksha'), closeMenu();
          }}
          title="Ashtvidh"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('DashavidhPariksha'), closeMenu();
          }}
          title="Dashavidh"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('SrotasPariksha'), closeMenu();
          }}
          title="Srotas"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('Samprapti'), closeMenu();
          }}
          title="Samprapti"
        />
      </Menu>
    </View>
  );
};

export const IpdRegistrationNavigation = ({visible, openMenu, closeMenu}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        right: 35,
        top: 60,
      }}>
      <Menu
        contentStyle={{flexDirection: 'row', flexWrap: 'wrap', width: '105%'}}
        style={styles.menuItem}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}></Button>}>
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationProfile'), closeMenu();
          }}
          title="Profile"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationSocioeconomics'), closeMenu();
          }}
          title="Socioeconomics"
        />
        <Divider />

        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationIdentification'), closeMenu();
          }}
          title="Identification"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationInsurance'), closeMenu();
          }}
          title="Insurance"
        />
        <Divider />
        <Menu.Item
          contentStyle={{width: 120}}
          dense
          onPress={() => {
            navigation.replace('EipdregistrationEmergencyContact'), closeMenu();
          }}
          title="EmergencyContact"
        />
        <Menu.Item
          contentStyle={{width: 120}}
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

const styles = StyleSheet.create({});

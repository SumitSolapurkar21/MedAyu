import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Divider, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const OpdpageNavigation = ({visible, openMenu, closeMenu}) => {
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

export default OpdpageNavigation;

const styles = StyleSheet.create({
  //   menuItem: {
  //     flexDirection: 'row',
  //   },
});

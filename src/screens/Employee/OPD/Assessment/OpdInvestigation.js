import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const OpdInvestigation = () => {
  const navigation = useNavigation();
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('OpdDiagnosis');
          }}
        />
        <Appbar.Content title="OPD Investigation" style={styles.appbar_title} />
      </Appbar.Header>
      <View>
        <Text style={{padding: 20}}>OpdInvestigation</Text>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdDiagnosis')}>
            Previous
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdPlanOfCare')}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdPlanOfCare')}>
            Skip
          </Button>
        </View>
      </View>
    </>
  );
};

export default OpdInvestigation;

const styles = StyleSheet.create({
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});

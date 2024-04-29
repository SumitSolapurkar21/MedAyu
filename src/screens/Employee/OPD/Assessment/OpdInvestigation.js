import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Appbar, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const OpdInvestigation = () => {
  const navigation = useNavigation();
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('OpdDiagnosis');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('OpdDiagnosis');
          }}
        />
        <Appbar.Content title="Investigation" style={styles.appbar_title} />
      </Appbar.Header>
      <View>
        <Text style={{padding: 20}}>OpdInvestigation</Text>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            onPress={() => navigation.replace('OpdDiagnosis')}>
            Previous
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdPlanOfCare')}>
            Submit
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdPlanOfCare')}>
            Next / Skip
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

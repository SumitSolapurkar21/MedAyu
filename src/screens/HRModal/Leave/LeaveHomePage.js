import {BackHandler, StyleSheet, Text, View, DefaultTheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {SegmentedButtons} from 'react-native-paper';

import ApplyLeave from './ApplyLeave';
import PendingLeaves from './PendingLeaves';
import HistoryLeaves from './HistoryLeaves';

const LeaveHomePage = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('apply');
  const theme = {
    ...DefaultTheme,
    roundness: 0, // Set roundness to 0 to remove borderRadius
  };

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('HrModal');
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
            navigation.navigate('HrModal');
          }}
        />
        <Appbar.Content title="Leave" />
      </Appbar.Header>
      <View style={styles.container}>
        <SegmentedButtons
          theme={theme}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'apply',
              label: 'Apply',
            },
            {
              value: 'pending',
              label: 'Pending',
            },
            {value: 'approved', label: 'Approved'},
          ]}
        />
        {value === 'apply' ? (
          <ApplyLeave />
        ) : value === 'pending' ? (
          <PendingLeaves />
        ) : value === 'approved' ? (
          <HistoryLeaves />
        ) : null}
      </View>
    </>
  );
};

export default LeaveHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

import {BackHandler, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Appbar,
  DefaultTheme,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import RegularizationApply from './RegularizationApply';
import RegularizationPending from './RegularizationPending';
import RegularizationHistory from './RegularizationHistory';

const Regularization = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('apply');

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

  const theme = {
    ...DefaultTheme,
    roundness: 0, // Set roundness to 0 to remove borderRadius
  };
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('HrModal');
          }}
        />
        <Appbar.Content title="Regularization" />
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
            {value: 'history', label: 'History'},
          ]}
        />
        {value === 'apply' ? (
          <RegularizationApply />
        ) : value === 'pending' ? (
          <RegularizationPending />
        ) : value === 'history' ? (
          <RegularizationHistory />
        ) : null}
      </View>
    </>
  );
};

export default Regularization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    marginTop: 16,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  formGroup: {
    marginVertical: 10,
  },

  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    fontWeight: '600',
    color: 'black',
    fontSize: 14,
    marginBottom: 6,
  },
  cardContent2: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  secTablehead: {
    backgroundColor: '#80aaff',
    width: '40%',
    borderWidth: 0.2,
    padding: 8,
  },
  secTableheadText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },

  contenthead: {
    width: '40%',
    borderWidth: 0.2,
    padding: 8,
  },
  contentheadText: {
    fontSize: 12,
    color: 'black',
  },
  btngroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
});

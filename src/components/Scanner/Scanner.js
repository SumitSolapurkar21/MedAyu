import {StyleSheet, Text, TouchableOpacity, LogBox, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes',
]);
export default function Scanner() {
  const navigation = useNavigation();
  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      // fadeIn={true}
      showMarker={true}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>QR Code Scanner</Text>
        </Text>
      }
      topViewStyle={{marginVertical: 30}}
      bottomViewStyle={{marginVertical: 20}}
      bottomContent={
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={navigation.navigate('EpatientDetails')}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  buttonTouchable: {
    padding: 10,
    backgroundColor: 'orange',
    flexDirection: 'row',
    borderRadius: 6,
  },
});

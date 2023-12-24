import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Button} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const Signature = () => {
  const ref = useRef();
  const [signture, setSignature] = useState('');

  const handleOK = signature => {
    setSignature(signature);
  };
  //   const handleClear = () => {
  //     ref.current.clearSignature();
  //   };

  //   const handleConfirm = () => {
  //     ref.current.readSignature();
  //   };

  //   const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <SignatureScreen ref={ref} onOK={handleOK} />
      {/* <View style={styles.row}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Confirm" onPress={handleConfirm} />
      </View> */}
    </View>
  );
};

export default Signature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    padding: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
});

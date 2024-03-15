import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useRef} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Snackbar} from 'react-native-paper';

export const ToastNotification = (visible, setVisible, subtitle) => {
  const onDismissSnackBar = () => setVisible(false);
  return (
    <>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        Comming Soon
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({});

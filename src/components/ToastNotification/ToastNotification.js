import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useRef} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ToastNotification = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <Animated.View
        entering={fadeIn}
        exiting={fadeOut}
        style={([styles.success], {opacity: fadeAnim})}>
        <FontAwesome6 name="circle-check" color="#127359" size={18} />
      </Animated.View>
      <View>
        <Text style={styles.successText}>Success</Text>
        <Text style={[styles.successText, {fontSize: 14}]}>Login Success</Text>
      </View>
    </>
  );
};

export default ToastNotification;

const styles = StyleSheet.create({
  success: {
    top: 40,
    backgroundColor: 'blue',
    width: '90%',
    borderRadius: 5,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  },
  successText: {
    color: 'white',
    fontWeight: '600',
    //     marginLeft: 10,
    fontSize: 16,
  },
});

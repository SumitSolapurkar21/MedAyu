import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const HomeButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.homeDiv}>
      <TouchableOpacity
        style={styles.homeBnt}
        onPress={() => navigation.navigate('Home')}>
        <FontAwesome6 name="home" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeButton;

const styles = StyleSheet.create({
  homeDiv: {
    backgroundColor: '#5c86fa',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 8,
    width: 45,
    padding: 8,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  homeBnt: {
    alignSelf: 'center',
  },
});

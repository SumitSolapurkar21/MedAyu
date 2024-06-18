import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const ConsultantPdf = () => {
  const navigation = useNavigation();

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('OpdHomePage');
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
            navigation.replace('EpatientDetails');
          }}
        />
        <Appbar.Content title="Consultant PDF" />
      </Appbar.Header>

      {/* section */}
      <View style={styles.container}></View>
    </>
  );
};

export default ConsultantPdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

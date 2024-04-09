import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Regularization = () => {
  const navigation = useNavigation();

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
        <Appbar.Content title="Regularization" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Comming Soon !!</Text>
      </View>
    </>
  );
};

export default Regularization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

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
import billHistory from '../../../images/billHistory.png';

const OpdHomePage2 = () => {
  const navigation = useNavigation();

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('EpatientDetails');
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
            navigation.replace('Listofpatients');
          }}
        />
        <Appbar.Content title="OPD" />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.cardSelection}>
          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => navigation.navigate('OpdComplaints')}>
            <Image source={billHistory} alt="billHistory" style={styles.img} />
            <Text style={styles.uName}>Initial Assessment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => navigation.navigate('Prakruti')}>
            <Image source={billHistory} alt="billHistory" style={styles.img} />
            <Text style={styles.uName}>Ayurvedic Assessment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OpdHomePage2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardSelection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 10,
    flexWrap: 'wrap',
  },
  selectDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
    borderRadius: 6,
    padding: 10,
    width: '47%',
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  uName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#127359',
    flexWrap: 'wrap',
    width: 90,
  },
});

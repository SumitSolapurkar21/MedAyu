import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import medayuLogo from '../../images/medayu.jpeg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const EpatientDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerHeader}>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>Hi Sumit</Text>
        </View>
        <View style={styles.hrcontent}>
          <TouchableOpacity>
            <FontAwesome name="bell" size={22} color="#127359" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <FontAwesome name="user" size={22} color="#127359" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>Hi Sumit</Text>
        </View>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>Hi Sumit</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EpatientDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  outerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hlcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 6,
  },
  uName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#127359',
  },
  hrcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 16,
  },
  img: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  card: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 2,
    //     width: '48%',
    padding: 6,
    //     height: 75,
    borderRadius: 4,
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

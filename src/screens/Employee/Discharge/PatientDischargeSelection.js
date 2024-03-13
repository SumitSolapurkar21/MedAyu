import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const PatientDischargeSelection = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.contentDiv}>
        <TouchableOpacity
          style={styles.contentItem}
          onPress={() => navigation.navigate('DischargeInitiation')}>
          <Text style={styles.contentText}>Discharge Initiation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentItem}
          onPress={() => navigation.navigate('PatientDischargeSummary')}>
          <Text style={styles.contentText}>Discharge Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientDischargeSelection;

const styles = StyleSheet.create({
  contentDiv: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginVertical: 14,
    justifyContent: 'space-between',
  },

  contentItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 6,
    width: '48%',
    padding: 6,
    height: 55,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  contentText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 15,
    color: '#127359',
    fontWeight: '600',
  },
});

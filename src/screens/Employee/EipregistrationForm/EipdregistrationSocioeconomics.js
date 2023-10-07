import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

const EipdregistrationSocioeconomics = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
          <FontAwesome6
            name="arrow-left-long"
            color="#127359"
            size={28}
            onPress={() => navigation.navigate('Ehome')}
          />
          <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
            Patient Registration
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <FontAwesome6 name="location-dot" color="#127359" size={18} />
          <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
            Nagpur
          </Text>
        </View>
      </View>
      <ScrollView vertical>
        <View style={styles.main}>
          <View style={styles.mainHead}>
            <Text style={styles.mainHeadText}>Socioeconomics</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Education</Text>
              <TextInput style={styles.fieldInput} placeholder="Education" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Occupation </Text>
              <TextInput style={styles.fieldInput} placeholder="Occupation" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Family Income </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Family Income"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>KPS Score </Text>
              <TextInput style={styles.fieldInput} placeholder="KPS Score" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>KPS Class </Text>
              <TextInput style={styles.fieldInput} placeholder="OP" />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.formGrpButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationProfile')}>
          <Text style={[styles.formButton, {backgroundColor: '#04e004'}]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.formButton, {backgroundColor: '#04e004'}]}>
            Save & Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[
              styles.formButton,
              {backgroundColor: '#049be0', width: 100},
            ]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EipdregistrationSocioeconomics;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  main: {
    marginHorizontal: 20,
  },
  mainHead: {
    borderBottomWidth: 3,
    borderBottomColor: '#ffb836',
    paddingBottom: 10,
    marginBottom: 30,
  },
  mainHeadText: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36abff',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    color: '#127359',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldInput: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
  },
  formGrpButton: {
    flexDirection: 'row',
    marginVertical: 16,
    alignSelf: 'center',
    columnGap: 10,
  },
  formButton: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 4,
    textAlign: 'center',
  },
});

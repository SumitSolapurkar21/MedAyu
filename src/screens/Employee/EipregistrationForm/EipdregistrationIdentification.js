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

const EipdregistrationIdentification = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical>
        <View style={styles.main}>
          <View style={styles.mainHead}>
            <Text style={styles.mainHeadText}>Identification</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Photo Id Type</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Photo Id Type"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Issuing Authority Detail </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Issuing Authority Detail"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Full Name </Text>
              <TextInput style={styles.fieldInput} placeholder="Full Name" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>ID Number </Text>
              <TextInput style={styles.fieldInput} placeholder="ID Number" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Valid From </Text>
              <TextInput style={styles.fieldInput} placeholder="Valid From" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Valid Till </Text>
              <TextInput style={styles.fieldInput} placeholder="Valid Till" />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.formGrpButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationSocioeconomics')}>
          <Text style={[styles.formButton, {backgroundColor: '#ebc934'}]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationInsurance')}>
          <Text style={[styles.formButton, {backgroundColor: '#04e004'}]}>
            Save & Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationInsurance')}>
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

export default EipdregistrationIdentification;

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

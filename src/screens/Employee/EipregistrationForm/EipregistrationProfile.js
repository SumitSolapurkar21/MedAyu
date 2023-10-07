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
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const EipregistrationProfile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
          <FontAwesome6
            name="arrow-left-long"
            color="#127359"
            size={28}
            onPress={() => navigation.navigate('EpatientDetails')}
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
            <Text style={styles.mainHeadText}>Profile</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Registered Date</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Registered Date"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Admission Date </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Admission Date"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Admission Time </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Admission Time"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>UHID No </Text>
              <TextInput style={styles.fieldInput} placeholder="UHID" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>OP No </Text>
              <TextInput style={styles.fieldInput} placeholder="OP" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Full Name </Text>
              <TextInput style={styles.fieldInput} placeholder="Full Name" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Gender </Text>
              <TextInput style={styles.fieldInput} placeholder="Gender" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Mobile Number </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Mobile Number"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Date Of Birth </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Date Of Birth"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Age </Text>
              <TextInput style={styles.fieldInput} placeholder="Age" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Martial Status </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Martial Status"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Country </Text>
              <TextInput style={styles.fieldInput} placeholder="Country" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>State </Text>
              <TextInput style={styles.fieldInput} placeholder="State" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>City </Text>
              <TextInput style={styles.fieldInput} placeholder="City" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Nationality </Text>
              <TextInput style={styles.fieldInput} placeholder="Nationality" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Mother Tounge </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Mother Tounge"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email </Text>
              <TextInput style={styles.fieldInput} placeholder="Email" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Address </Text>
              <TextInput style={styles.fieldInput} placeholder="Address" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Profession </Text>
              <TextInput style={styles.fieldInput} placeholder="Profession" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Flat / Door / Block No. </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Flat / Door / Block No."
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>
                Name of Primises / Building / Village{' '}
              </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Name of Primises / Building / Village"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Road / Street / Post-Office </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Road / Street / Post-Office"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Area / Locality </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Area / Locality"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Pin Code </Text>
              <TextInput style={styles.fieldInput} placeholder="Pin Code" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>LandLine No. </Text>
              <TextInput style={styles.fieldInput} placeholder="Landline No." />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Whatsapp No </Text>
              <TextInput style={styles.fieldInput} placeholder="Whatsapp" />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.formGrpButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationSocioeconomics')}>
          <Text style={[styles.formButton, {backgroundColor: '#ebc934'}]}>
            Save & Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationSocioeconomics')}>
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

export default EipregistrationProfile;

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

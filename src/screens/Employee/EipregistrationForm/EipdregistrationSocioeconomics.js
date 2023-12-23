import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import api from '../../../../api.json';
import DropDown from 'react-native-paper-dropdown';

const EipdregistrationSocioeconomics = () => {
  const education = [
    {
      label: 'Professional degree',
      value: 'Professional degree',
    },
    {
      label: 'Graduate',
      value: 'Graduate',
    },
    {
      label: 'Intermediate or diploma',
      value: 'Intermediate or diploma',
    },
    {
      label: 'High school',
      value: 'High school',
    },
    {
      label: 'Middle school',
      value: 'Middle school',
    },
    {
      label: 'Primary school',
      value: 'Primary school',
    },
    {
      label: 'Illiterate',
      value: 'Illiterate',
    },
  ];
  const occupation = [
    {
      label: 'Professional',
      value: 'Professional',
    },
    {
      label: 'Semi Profession',
      value: 'Semi Profession',
    },
    {
      label: 'Clerical/shop/farm',
      value: 'Clerical/shop/farm',
    },
    {
      label: 'Skilled worker',
      value: 'Skilled worker',
    },
    {
      label: 'Semiskilled worker',
      value: 'Semiskilled worker',
    },
    {
      label: 'Unskilled worker',
      value: 'Unskilled worker',
    },
    {
      label: 'Unemployed',
      value: 'Unemployed',
    },
  ];
  const familyincome = [
    {
      label: '10000-20000',
      value: '10000-20000',
    },
    {
      label: '20000-30000',
      value: '20000-30000',
    },
    {
      label: '30000-40000',
      value: '30000-40000',
    },
    {
      label: '40000-50000',
      value: '40000-50000',
    },
    {
      label: '50000-60000',
      value: '50000-60000',
    },
    {
      label: '60000-100000',
      value: '60000-100000',
    },
    {
      label: 'More than 100000',
      value: 'More than 100000',
    },
  ];
  //form data ....

  //submit handler.....
  const addSocioeconomicsData = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddMobileIPD`, {
          role: 'Socioeconomics',
          education: p_education,
          occupation: p_occupation,
          familyincome: p_income,
          kpsscore: kpscal?.data.kps_value1,
          kpsclass: kpscal?.data.kps_class,
        })
        .then(res => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const navigation = useNavigation();
  const [p_income, set_Income] = useState('');
  const [p_education, set_Education] = useState('');
  const [p_occupation, set_Occupation] = useState('');
  const [kpscal, setKpscal] = useState(null);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [showDropDown4, setShowDropDown4] = useState(false);

  useEffect(() => {
    const calculate_kpsHandler = async () => {
      await axios
        .post(`${api.baseurl}/calculate_kps`, {
          income: p_income,
          occupation: p_occupation,
          education: p_education,
        })
        .then(res => {
          setKpscal(res);
        });
    };
    if (p_income != '') calculate_kpsHandler();
  }, [p_income]);

  // const {kps_value, kps_class} = kpscal?.data;
  // console.log('kpscal', kps_value, kps_class);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical>
        <View style={styles.main}>
          <View style={styles.mainHead}>
            <Text style={styles.mainHeadText}>Socioeconomics</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <DropDown
                label={'Education'}
                mode={'outlined'}
                visible={showDropDown3}
                showDropDown={() => setShowDropDown3(true)}
                onDismiss={() => setShowDropDown3(false)}
                value={p_education}
                setValue={set_Education}
                list={education?.map(res => ({
                  label: res.label,
                  value: res.value,
                }))}
              />
            </View>
            <View style={styles.formGroup}>
              <DropDown
                label={'Occupation'}
                mode={'outlined'}
                visible={showDropDown2}
                showDropDown={() => setShowDropDown2(true)}
                onDismiss={() => setShowDropDown2(false)}
                value={p_occupation}
                setValue={set_Occupation}
                list={occupation?.map(res => ({
                  label: res.label,
                  value: res.value,
                }))}
              />
            </View>
            <View style={styles.formGroup}>
              <DropDown
                label={'Family Income'}
                mode={'outlined'}
                visible={showDropDown4}
                showDropDown={() => setShowDropDown4(true)}
                onDismiss={() => setShowDropDown4(false)}
                value={p_income}
                setValue={set_Income}
                list={familyincome?.map(res => ({
                  label: res.label,
                  value: res.value,
                }))}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>KPS Score </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="KPS Score"
                value={kpscal?.data.kps_value1 || ''}
                // keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>KPS Class </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="OP"
                value={kpscal?.data.kps_class || ''}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.formGrpButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationProfile')}>
          <Text style={[styles.formButton, {backgroundColor: '#ebc934'}]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EipdregistrationIdentification'),
              addSocioeconomicsData();
          }}>
          <Text style={[styles.formButton, {backgroundColor: '#04e004'}]}>
            Save & Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationIdentification')}>
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

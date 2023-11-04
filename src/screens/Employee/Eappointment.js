import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import medayuLogo from '../../images/medayu.jpeg';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useContext, useEffect, useState} from 'react';
import DateTimeAppointment from '../../components/DateTimeAppointment';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';

// import successIcon from '../../images/success.gif';

import MsgPopup from '../../components/MsgPopup/MsgPopup';
import UserContext from '../../components/Context/Context';
import axios from 'axios';
import api from '../../../api.json';

const Eappointment = ({route}) => {
  const {userData} = useContext(UserContext);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const navigation = useNavigation();
  const {patient_id} = route.params;
  const [formData, setFormData] = useState({
    department: '',
    doctor: '',
  });
  const [msgPopup, setMsgPopup] = useState(false);

  const [departmentData, setDepartmentData] = useState([]);
  const [consultDoctorData, setConsultDoctorData] = useState([]);
  const [dateArray, setDateArray] = useState([]);

  let reception_id = userData.data[0]._id;
  useEffect(() => {
    const departmentData = async () => {
      await dateData();
      try {
        await axios
          .post(`${api.baseurl}/FetchReceptionDepartmentDeopdown`, {
            reception_id: userData.data[0]._id,
          })
          .then(res => {
            const dpt_data = res.data.data;
            // console.log('dpt_data :', dpt_data);
            setDepartmentData(dpt_data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (reception_id !== '') departmentData();
  }, [reception_id]);

  let department_id = formData.department;
  useEffect(() => {
    const consultDoctorData = async () => {
      try {
        await axios
          .post(`${api.baseurl}/DoctorAccDepartmentinAppmtRecpt`, {
            depart_id: department_id,
          })
          .then(res => {
            const consultDoctor_data = res.data.data;
            // console.log('consultDoctor_data :', consultDoctor_data);
            setConsultDoctorData(consultDoctor_data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (department_id !== '') consultDoctorData();
  }, [department_id]);

  let doctor_id = formData.doctor;
  let today = new Date();

  let date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getDate().toString().padStart(2, '0');

  const dateData = async () => {
    try {
      await axios
        .post(`${api.baseurl}/ShowAppointDatesForMobile`, {
          reception_id,
          hospital_id: userData.data[0].hospital_id,
          todaysdates: date,
        })
        .then(res => {
          // console.log('Date Data : ', res.data.mydates);
          setDateArray(res.data.mydates);
          // date_Array.push(res.data.mydates);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // const handleSubmit = () => {
  //   const errors = {};

  //   if (Object.keys(errors).length === 0) {
  //     setFormData([]);
  //   }
  //   setMsgPopup(true);
  //   setBackdropOpacity(0.5);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerHeader}>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>{userData.data[0].name}</Text>
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

      <MsgPopup
        msgPopup={msgPopup}
        setMsgPopup={setMsgPopup}
        backdropOpacity={backdropOpacity}
      />

      <View style={styles.main}>
        <View style={styles.selection}>
          <Text
            style={{
              marginVertical: 8,
              fontWeight: '600',
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
            }}>
            Add Appointments
          </Text>

          <View style={styles.fields}>
            <Text style={styles.fieldText}>Department</Text>
            <SelectList
              setSelected={val => handleInputChange('department', val)}
              data={departmentData.map(res => ({
                key: res.depart_id,
                value: res.deptname,
              }))}
              search={true}
              boxStyles={styles.selectBox}
            />
          </View>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>Doctor</Text>
            <SelectList
              setSelected={val => handleInputChange('doctor', val)}
              data={consultDoctorData.map(res => ({
                key: res._id,
                value: res.name,
              }))}
              search={true}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>
      </View>

      <DateTimeAppointment
        dateArray={dateArray}
        doctor_id={doctor_id}
        patient_id={patient_id}
        formData={formData}
        setFormData={setFormData}
        setMsgPopup={setMsgPopup}
        setBackdropOpacity={setBackdropOpacity}
      />
    </SafeAreaView>
  );
};

export default Eappointment;

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
  selection: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  fields: {
    marginVertical: 6,
  },
  fieldText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#127359',
  },
  fieldInput: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
  },
});

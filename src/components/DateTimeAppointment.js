import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import api from '../../api.json';
import UserContext from './Context/Context';

const DateTimeAppointment = ({
  dateArray,
  doctor_id,
  patient_id,
  reception_id,
  department_id,
  setMsgPopup,
  setBackdropOpacity,
}) => {
  const {userData} = useContext(UserContext);
  const {_id, hospital_id} = userData.data[0];
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeslotArray, setTimeSlotArray] = useState([]);

  //current date

  useEffect(() => {
    if (doctor_id != '') {
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        today.getDate().toString().padStart(2, '0');
      setSelectedDate(date);
    } else {
      setSelectedDate('');
    }
  }, [doctor_id]);

  // DateSelection Handler
  const handleDateSelection = selectedDate => {
    setSelectedTime('');
    setSelectedDate(selectedDate);
  };

  // TimeSelection Handler
  const handleTimeSelection = selectedTime => {
    const isTimeSlotValid = timeslotArray.some(
      res => res.timeSlot === selectedTime && res.timestatus === 'true',
    );

    setSelectedTime(isTimeSlotValid ? selectedTime : selectedTime);
  };

  // On selected date time slot function run ...
  useEffect(() => {
    if (selectedDate !== '') timeSlot();
  }, [selectedDate]);

  // time slot function run
  const timeSlot = async () => {
    await axios
      .post(`${api.baseurl}/GetSchedulerForMobile`, {
        reception_id: _id,
        hospital_id,
        doctor_id: doctor_id,
        mydate: selectedDate,
      })
      .then(res => {
        setTimeSlotArray(res.data.data);
      });
  };

  // Add Appointments handler .....
  const handleSubmit = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddDirectMobileAppointments`, {
          patientcategory: 'Review',
          reception_id: _id,
          patient_id,
          depart_id: department_id,
          doctor_id: doctor_id,
          app_date: selectedDate,
          slot_id: selectedTime,
          hospital_id: hospital_id,
        })
        .then(res => {
          return res.data;
        });
      setMsgPopup(true);
      setBackdropOpacity(0.5);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        vertical
        style={styles.dateSlots}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.slotsD}>
          {dateArray?.map((res, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.datess,
                {
                  backgroundColor:
                    res.fullDate === selectedDate ? '#03b1fc' : 'white',

                  borderColor:
                    res.fullDate === selectedDate ? '#03b1fc' : '#03b1fc',
                },
              ]}
              onPress={() => handleDateSelection(res.fullDate)}>
              <Text
                style={[
                  styles.dateText,
                  {color: res.fullDate === selectedDate ? 'white' : '#03b1fc'},
                ]}>
                {res.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.timeSlot}>
          <Text style={styles.timeHeading}>
            9 AM - 9 PM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text>70 Slots Available</Text>
          </Text>
        </View>
        <View style={styles.wrapper}>
          {timeslotArray?.map((res, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.datess1,
                {
                  backgroundColor:
                    res.timestatus === 'true' || res.timeSlot === selectedTime
                      ? '#03b1fc'
                      : 'white',
                  borderColor:
                    res.timestatus === 'true' ? '#03b1fc' : '#03b1fc',
                },
              ]}
              onPress={() => handleTimeSelection(res.timeSlot)}>
              <Text
                style={[
                  styles.dateText,
                  {
                    color:
                      res.timestatus === 'true' || res.timeSlot === selectedTime
                        ? 'white'
                        : '#03b1fc',
                  },
                ]}>
                {res.timeSlot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.formSubmit} onPress={handleSubmit}>
        <Text style={styles.formSubmitTest}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateTimeAppointment;

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
  },
  doctDetail: {
    backgroundColor: '#ebe8e8',
  },
  innerCard: {
    flexDirection: 'row',
    gap: 16,
    marginHorizontal: 15,
  },
  cardItem2: {
    width: '75%',
    justifyContent: 'center',
  },
  img: {
    resizeMode: 'contain',
    width: 65,
    height: 100,
  },

  slotsD: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  dateSlots: {
    marginVertical: 14,
    height: 100,
  },
  datess: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: '#03b1fc',
    borderWidth: 2,
    marginRight: 10,
  },
  datess1: {
    height: 50,
    width: 95,
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: '#03b1fc',
    borderWidth: 2,
    marginBottom: 8,
  },
  dateText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#03b1fc',
  },
  timeSlot: {
    marginVertical: 14,
    marginHorizontal: 6,
  },
  timeHeading: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  timeBtn: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 18,
  },
  formSubmit: {
    backgroundColor: 'orange',
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 10,
    borderRadius: 6,
  },

  formSubmitTest: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
  },
});

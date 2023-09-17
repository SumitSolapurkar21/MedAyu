import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const DateTimeAppointment = () => {
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
          <TouchableOpacity
            style={[
              styles.datess,
              {backgroundColor: '#03b1fc', borderColor: 'white'},
            ]}>
            <Text style={[styles.dateText, {color: '#ffffff'}]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>Tomorrow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>01 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>02 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>03 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>04 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>05 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>06 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>07 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>08 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>09 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>10 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>11 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>12 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>13 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>14 Sep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess}>
            <Text style={styles.dateText}>15 Sep</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.timeSlot}>
          <Text style={styles.timeHeading}>
            9 AM - 9 PM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text>70 Slots Available</Text>
          </Text>
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity style={[styles.datess1]}>
            <Text style={[styles.dateText]}>09:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>09:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>10:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>10:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>11:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>11:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>12:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>12:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>01:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>01:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>02:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>02:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>03:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>03:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>04:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>04:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>05:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>05:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>06:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>06:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>07:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>07:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>08:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datess1}>
            <Text style={styles.dateText}>08:30</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderColor: '#aae2fa',
    borderWidth: 2,
    marginRight: 10,
  },
  datess1: {
    height: 50,
    width: 95,
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: '#aae2fa',
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
});

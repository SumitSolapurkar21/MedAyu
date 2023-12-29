import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';
import {Table, Row, Rows} from 'react-native-table-component';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  Button,
  Dialog,
  Portal,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';

const Eadtpatientadmitted = () => {
  const {userData} = useContext(UserContext);
  const {_id, hospital_id} = userData?.data[0];
  const [editText, setEditText] = useState('');

  const onClickHandler = (fieldname, e, bed_id) => {
    showDialog();
    setEditText({e: e, fieldname: fieldname, bed_id: bed_id});
  };

  useEffect(() => {
    admittedList();
  }, []);

  const admittedList = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchAdmittedList`, {
          reception_id: _id,
          hospital_id: hospital_id,
        })
        .then(res => {
          console.log(res.data.data);
          if (res.data.data.length > 0) {
            const keys = [
              'NAME',
              'UHID',
              'IP NO',
              'REG.DATE',
              'DEPARTMENT',
              'DOCTOR',
              'ROOM NO',
              'BED NO',
              'DURATION',
              'STATUS',
              'ACTION',
            ];
            setTableHead(keys);
            const values = res.data.data.map(item => [
              `${item.firstname}`, // Combine DATE and TIME
              item.patientuniqueno,
              item.ipno,
              item.registerdate,
              item.deptname,
              item.doctorname,
              item.room_no,
              item.bedno,
              item.valid_dayss,
              item.patient_status,
              <View style={styles.cardSelection}>
                <TouchableOpacity
                  onPress={() => {
                    onClickHandler('Discharge', item._id, item.bed_id);
                  }}>
                  <FontAwesome6
                    name="arrow-right-from-bracket"
                    size={22}
                    color="#127359"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    onClickHandler('Death', item._id, item.bed_id)
                  }>
                  <FontAwesome6 name="xmark" size={22} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onClickHandler('Dama', item._id, item.bed_id)}>
                  <FontAwesome6 name="cloud-arrow-up" size={22} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    onClickHandler('Transfer', item._id, item.bed_id)
                  }>
                  <FontAwesome6
                    name="cloud-arrow-up"
                    size={22}
                    color="#cc66ff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onClickHandler('Home', item._id, item.bed_id)}>
                  <FontAwesome6 name="house" size={22} color="green" />
                </TouchableOpacity>
              </View>,
              ...Object.values(item).filter(
                (_, index) =>
                  index !== keys.indexOf('firstname') &&
                  index !== keys.indexOf('patientuniqueno') &&
                  index !== keys.indexOf('ipno') &&
                  index !== keys.indexOf('registerdate') &&
                  index !== keys.indexOf('deptname') &&
                  index !== keys.indexOf('doctorname') &&
                  index !== keys.indexOf('room_no') &&
                  index !== keys.indexOf('bedno') &&
                  index !== keys.indexOf('valid_dayss') &&
                  index !== keys.indexOf('patient_status') &&
                  index !== keys.indexOf('action'),
              ),
            ]);

            setWidthArr(Array(keys.length).fill(170));
            setTableData(values);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [widthArr, setWidthArr] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [text, setText] = React.useState('');

  const onChangeText = text => setText(text);
  //for date and time :
  const [visibleTime, setVisibleTime] = React.useState(false);
  const [date, setDate] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [showIndicator, setShowIndicator] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setVisibleTime(false);
  }, [setVisibleTime]);

  const onConfirm = React.useCallback(
    ({hours, minutes}) => {
      setVisibleTime(false);
      console.log({hours, minutes});
      setSelectedTime({hours, minutes});
    },
    [setVisibleTime],
  );
  //date :
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // const onConfirmSingle = React.useCallback(
  //   params => {
  //     setOpen(false);
  //     setDate(params.date);
  //   },
  //   [setOpen, setDate],
  // );

  let today = new Date();
  let currentDate =
    today.getDate().toString().padStart(2, '0') +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getFullYear();
  const hours = today.getHours().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  //UpdateMobileDischargeDateTime handler :
  const UpdateMobileDischargeDateTime = async () => {
    try {
      await axios
        .post(`${api.baseurl}/UpdateMobileDischargeDateTime`, {
          reception_id: _id,
          hospital_id: hospital_id,
          actiondate: currentDate,
          actiontime:
            selectedTime === null
              ? currentTime
              : `${selectedTime?.hours}.${selectedTime?.minutes}`,
          actionsymptoms: text,
          patient_status: editText?.fieldname,
          bed_id: editText?.bed_id,
          patient_id: editText?.e,
        })
        .then(res => {
          console.log(res);
          if (res.data.status === true) {
            setShowIndicator(true);
            hideDialog();
            setText('');
            setTimeout(() => {
              setShowIndicator(false);
            }, 5000);
            admittedList();
          } else {
            ToastAndroid.show(
              `${res.data.message}`,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {showIndicator && (
        <View style={styles.active}>
          <ActivityIndicator animating={true} color={'red'} size={'large'} />
        </View>
      )}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{editText?.fieldname}</Dialog.Title>
          <Dialog.Content>
            <View style={styles.content}>
              <Text style={styles.contentTxt}>
                Date : <Text>{currentDate}</Text> &nbsp;
              </Text>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <FontAwesome6 name="calendar-days" size={20} color="red" />
              </TouchableOpacity>
              <Text style={styles.contentTxt}>
                Time :
                <Text>
                  {selectedTime === null
                    ? currentTime
                    : `${selectedTime?.hours}.${selectedTime?.minutes}`}
                </Text>
              </Text>
              <TouchableOpacity onPress={() => setVisibleTime(!visibleTime)}>
                <FontAwesome6 name="clock" size={20} color="red" />
              </TouchableOpacity>
            </View>
            <TextInput label="Notes" value={text} onChangeText={onChangeText} />
            <TimePickerModal
              visible={visibleTime}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={hours}
              minutes={minutes}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={UpdateMobileDischargeDateTime}>Update</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={[styles.legend, {marginBottom: 10}]}>
        <View style={styles.legend}>
          <FontAwesome6
            name="arrow-right-from-bracket"
            size={18}
            color="#127359"
          />
          <Text>DISCHARGE</Text>
        </View>
        <View style={styles.legend}>
          <FontAwesome6 name="xmark" size={18} color="red" />
          <Text>DEATH</Text>
        </View>
        <View style={styles.legend}>
          <FontAwesome6 name="cloud-arrow-up" size={18} color="blue" />
          <Text>DAMA</Text>
        </View>
        <View style={styles.legend}>
          <FontAwesome6 name="cloud-arrow-up" size={18} color="#cc66ff" />
          <Text>TRANSFER</Text>
        </View>
        <View style={styles.legend}>
          <FontAwesome6 name="house" size={16} color="#127359" />
          <Text>WENT HOME</Text>
        </View>
      </View>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Rows
                data={tableData}
                widthArr={widthArr}
                style={styles.row}
                textStyle={styles.text}
              />
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Eadtpatientadmitted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'center', color: 'black'},
  dataWrapper: {marginTop: -1},
  row: {height: 50},
  cardSelection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignContent: 'center',
  },
  contentTxt: {
    fontWeight: '600',
    color: 'black',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  active: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
  },
});

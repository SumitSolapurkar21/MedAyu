import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Appbar, Button, Card, TextInput } from 'react-native-paper';
import { OpdpageNavigation } from './OpdpageNavigation';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../../api.json';
import { Dropdown } from 'react-native-element-dropdown';

const OpdAdvice = () => {
  const navigation = useNavigation();
  const {
    waitingListData,
    setWaitingListData,
    userData,
    patientsData,
    scannedPatientsData,
    selectedFlow,
  } = useContext(UserContext);
  const { patient_id, uhid } = patientsData;
  const { appoint_id, mobilenumber } = scannedPatientsData;
  const [adviceArray, setAdviceArray] = useState([]);
  const [advice, setAdvice] = useState('');
  const [selectedAdvice, setSelectedAdvice] = useState('');
  const [selectedAdviceLabel, setSelectedAdviceLabel] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [opdAssessment, setOpdAssessment] = useState([]);

  const inputHandler = text => {
    setSelectedAdvice(text);
  };

  //menu handler .....
  const _handleMore = () => {
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('OpdProcedure');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    GetMobileOpdTemplate();
  }, [userData]);

  const GetMobileOpdTemplate = async () => {
    const body = {
      hospital_id: userData.hospital_id,
      reception_id: userData._id,
      role: userData.role,
    };
    try {
      await axios
        .post(`${api.baseurl}/GetMobileOpdTemplate`, body)
        .then(response => {
          const { data, status, message } = response.data;
          if (status === true) {
            setAdviceArray(data);
          } else {
            Alert.alert('Info !!', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Info !!', `${error}`);
    }
  };

  //submit handler ....
  const submitTreatmenthandler = async () => {
    const temp = [
      {
        template_id: advice,
        opdtemplate_text: selectedAdvice,
        opdtemplate: selectedAdviceLabel,
      },
    ];
    const _body = {
      hospital_id: userData?.hospital_id,
      patient_id: patient_id,
      reception_id: userData?._id,
      appoint_id: waitingListData?.appoint_id || appoint_id,
      uhid: uhid,
      api_type: 'OPD-ADVICE',
      opdadvicehistoryarray: temp,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const { status, message } = res.data;
          if (status === true) {
            Alert.alert('Success !!', `${message}`);
            setAdviceArray([]);
            setSelectedAdvice('');
            FetchMobileOpdAssessment();
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  // navigate handler .....
  const navigateHandler = () => {
    if (waitingListData?.assessmenttype === 'NewAssessment') {
      setWaitingListData([]);
      navigation.replace('Listofpatients');
    } else if (selectedFlow === 'scanned') {
      navigation.replace('EpatientDetails');
    }
  };

  useEffect(() => {
    FetchMobileOpdAssessment();
  }, [patient_id]);

  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: userData?.hospital_id,
          reception_id: userData?._id,
          patient_id: patient_id,
          appoint_id: waitingListData?.appoint_id || appoint_id,
          api_type: 'OPD-ADVICE',
          uhid: uhid,
          mobilenumber: waitingListData?.mobilenumber || mobilenumber,
        })
        .then(res => {
          setOpdAssessment(res.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('OpdProcedure');
          }}
        />
        <Appbar.Content title="Advice" />
        <Appbar.Action
          icon="account-details"
          size={30}
          onPress={() => openMenu()}
        />
      </Appbar.Header>

      <OpdpageNavigation
        closeMenu={closeMenu}
        openMenu={openMenu}
        _handleMore={_handleMore}
        visible={visible}
      />

      <ScrollView style={styles.container}>
        <View style={styles.dropdownCategory}>
          <Text style={styles.heading}>Advice</Text>
          <View style={{ width: '100%' }}>
            <Dropdown
              mode={'outlined'}
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={adviceArray}
              search
              maxHeight={300}
              labelField="opdtemplate"
              valueField="template_id"
              placeholder={!isFocus ? 'Select' : '...'}
              searchPlaceholder="Search..."
              value={advice}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setAdvice(item.template_id);
                setSelectedAdvice(item.opdtemplate);
                setSelectedAdviceLabel(item.opdtemplate);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View style={styles.inputGrp}>
          <TextInput
            mode="flat"
            multiline
            numberOfLines={10}
            style={styles.input2}
            value={selectedAdvice}
            onChangeText={text => inputHandler(text)}
            editable={true}
          />
        </View>

        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdProcedure')}>
            Previous
          </Button>
          <Button mode="contained" onPress={() => submitTreatmenthandler()}>
            Submit
          </Button>
          <Button mode="contained" onPress={() => navigateHandler()}>
            Home
          </Button>
        </View>

        {/* fetch data .... */}
        {opdAssessment.length > 0 &&
          opdAssessment?.map((row, index) => {
            return (
              <Card style={styles.card2} key={index + 1}>
                <Card.Content>
                  <View style={styles.cardBodyHead}>
                    <View style={[styles.cardBody, { gap: 10, width: 'auto' }]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Date / Time :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row.opd_date} / {row.opd_time}
                      </Text>
                    </View>
                    <View style={[styles.cardBody, { gap: 8 }]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Advice :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.opdtemplate_text}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            );
          })}
      </ScrollView>
    </>
  );
};

export default OpdAdvice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
    backgroundColor: '#ffffff',
  },
  dropdownCategory: {
    marginBottom: 14,
  },
  heading: {
    color: 'black',
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 16,
  },
  submitbutton: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginVertical: 10,
  },
  card2: {
    // marginHorizontal: 12,
    marginVertical: 10,
  },
  cardBodyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardtext: {
    fontWeight: '600',
    color: 'black',
    width: 90,
  },
  cardtext2: {
    fontWeight: '600',
    flexWrap: 'wrap',
    width: 200,
  },
});

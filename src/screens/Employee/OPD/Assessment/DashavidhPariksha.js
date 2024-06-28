import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { OpdAyurvedicNavigation } from './OpdpageNavigation';
import { Appbar, Checkbox, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';

const DashavidhPariksha = () => {
  //
  //
  const { scannedPatientsData, waitingListData, userData } =
    useContext(UserContext);
  const { appoint_id } = scannedPatientsData;
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };
  const navigation = useNavigation();

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [checkedValues, setCheckedValues] = useState({
    prakriti: '',
    satmyata: '',
    sarha: '',
    vayas: '',
    desham: '',
    kalatha: '',
    satwa: '',
    sahanan: '',
    pramanata: '',
    shareerbalam: '',
    manasaprakrit: '',
    satmyata_abhyavaharan: '',
    satmyata_jarana: '',
  });

  const [collapsedSections, setCollapsedSections] = useState({
    prakriti: true,
    satmyata: true,
    sarha: true,
    vayas: true,
    desham: true,
    kalatha: true,
    satwa: true,
    sahanan: true,
    pramanata: true,
    shareerbalam: true,
    manasaprakrit: true,
  });

  const toggleSection = section => {
    setCollapsedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const handleCheckboxToggle = (key, value) => {
    setCheckedValues(prevState => {
      const newValue = prevState[key].includes(value)
        ? prevState[key].filter(item => item !== value) // Remove value if already selected
        : [...prevState[key], value]; // Add value if not selected
      return {
        ...prevState,
        [key]: newValue,
      };
    });
  };
  const icon_up = (
    <FontAwesome6
      name="caret-up"
      color="#ffffff"
      size={24}
      style={styles.searchIcon}
    />
  );
  const icon_down = (
    <FontAwesome6
      name="caret-down"
      color="#ffffff"
      size={24}
      style={styles.searchIcon}
    />
  );

  // reset handler ...
  const _resetHandler = () => {
    setCheckedValues({
      prakriti: '',
      satmyata: '',
      sarha: '',
      vayas: '',
      desham: '',
      kalatha: '',
      satwa: '',
      sahanan: '',
      pramanata: '',
      shareerbalam: '',
      manasaprakrit: '',
      satmyata_abhyavaharan: '',
      satmyata_jarana: '',
    });
  };
  // submit handler .....

  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: userData?.hospital_id,
      patient_id: waitingListData?.newpatient_id,
      mobilenumber: waitingListData?.mobilenumber,
      reception_id: userData?._id,
      appoint_id: waitingListData?.appoint_id || appoint_id,
      uhid: waitingListData?.uhid,
      api_type: 'DashavidhPariksha',
      opddashavidhparikshahistoryarray: [checkedValues],
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const { status, message } = res.data;
          if (status === true) {
            _resetHandler();
            Alert.alert('Success', `${message}`);
          } else {
            Alert.alert('Error', `${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('AshtvidhPariksha');
            return true;
          }}
        />
        <Appbar.Content
          title="Dashavidh Pariksha"
          titleStyle={{ fontSize: 20 }}
        />
        <Appbar.Action
          icon="account-details"
          size={30}
          onPress={() => openMenu()}
        />
      </Appbar.Header>

      <OpdAyurvedicNavigation
        closeMenu={closeMenu}
        openMenu={openMenu}
        _handleMore={_handleMore}
        visible={visible}
      />
      {/* section */}
      <ScrollView vertical style={styles.container}>
        {/* Prakriti */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('prakriti')}>
            <Text style={styles.text}>Prakriti</Text>
            <Text style={styles.text}>
              {!collapsedSections.prakriti ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.prakriti && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vata"
                    status={
                      checkedValues.prakriti.includes('vata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('prakriti', 'vata')}
                  />
                  <Text style={styles.text3}>Vata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pitta"
                    status={
                      checkedValues.prakriti.includes('pitta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('prakriti', 'pitta')}
                  />
                  <Text style={styles.text3}>Pitta</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kapha"
                    status={
                      checkedValues.prakriti.includes('kapha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('prakriti', 'kapha')}
                  />
                  <Text style={styles.text3}>Kapha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vatapitta"
                    status={
                      checkedValues.prakriti.includes('vatapitta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('prakriti', 'vatapitta')
                    }
                  />
                  <Text style={styles.text3}>Vatapitta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vatakapha"
                    status={
                      checkedValues.prakriti.includes('vatakapha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('prakriti', 'vatakapha')
                    }
                  />
                  <Text style={styles.text3}>Vatakapha</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pittakapha"
                    status={
                      checkedValues.prakriti.includes('pittakapha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('prakriti', 'pittakapha')
                    }
                  />
                  <Text style={styles.text3}>Pittakapha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="tridosha"
                    status={
                      checkedValues.prakriti.includes('tridosha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('prakriti', 'tridosha')}
                  />
                  <Text style={styles.text3}>Tridosha</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Satmyata */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('satmyata')}>
            <Text style={styles.text}>Satmyata</Text>
            <Text style={styles.text}>
              {!collapsedSections.satmyata ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.satmyata && (
            <>
              <Text style={styles.label}>Abhyavaharan</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="uttam"
                    status={
                      checkedValues.satmyata_abhyavaharan.includes('uttam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('satmyata_abhyavaharan', 'uttam')
                    }
                  />
                  <Text style={styles.text3}>Uttam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhyam"
                    status={
                      checkedValues.satmyata_abhyavaharan.includes('madhyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('satmyata_abhyavaharan', 'madhyam')
                    }
                  />
                  <Text style={styles.text3}>Madhyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="heena"
                    status={
                      checkedValues.satmyata_abhyavaharan.includes('heena')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('satmyata_abhyavaharan', 'heena')
                    }
                  />
                  <Text style={styles.text3}>Heena</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Jarana</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="manda"
                    status={
                      checkedValues.satmyata_jarana.includes('manda')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('satmyata_jarana', 'manda')
                    }
                  />
                  <Text style={styles.text3}>Manda</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="visham"
                    status={
                      checkedValues.satmyata_jarana.includes('visham')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('satmyata_jarana', 'visham')
                    }
                  />
                  <Text style={styles.text3}>Visham</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sama"
                    status={
                      checkedValues.satmyata_jarana.includes('sama')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('satmyata_jarana', 'sama')
                    }
                  />
                  <Text style={styles.text3}>Sama</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Sarha */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('sarha')}>
            <Text style={styles.text}>Sarha</Text>
            <Text style={styles.text}>
              {!collapsedSections.sarha ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.sarha && (
            <>
              <Text style={styles.label}>Twak</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="twak"
                    status={
                      checkedValues.sarha.includes('twak')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sarha', 'twak')}
                  />
                  <Text style={styles.text3}>Twak</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="mansa"
                    status={
                      checkedValues.sarha.includes('mansa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sarha', 'mansa')}
                  />
                  <Text style={styles.text3}>Mansa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="meda"
                    status={
                      checkedValues.sarha.includes('meda')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sarha', 'meda')}
                  />
                  <Text style={styles.text3}>Meda</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="asthi"
                    status={
                      checkedValues.sarha.includes('asthi')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sarha', 'asthi')}
                  />
                  <Text style={styles.text3}>Asthi</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="majja"
                    status={
                      checkedValues.sarha.includes('majja')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sarha', 'majja')}
                  />
                  <Text style={styles.text3}>Majja</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shukra"
                    status={
                      checkedValues.sarha.includes('shukra')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sarha', 'shukra')}
                  />
                  <Text style={styles.text3}>Shukra</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ojha"
                    status={
                      checkedValues.sarha.includes('ojha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sarha', 'ojha')}
                  />
                  <Text style={styles.text3}>Ojha</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Jivha */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('vayas')}>
            <Text style={styles.text}>Vayas</Text>
            <Text style={styles.text}>
              {!collapsedSections.vayas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.vayas && (
            <>
              <Text style={styles.label}>Shaishav</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shaishav"
                    status={
                      checkedValues.vayas.includes('shaishav')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('vayas', 'shaishav')}
                  />
                  <Text style={styles.text3}>Shaishav</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="balya"
                    status={
                      checkedValues.vayas.includes('balya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('vayas', 'balya')}
                  />
                  <Text style={styles.text3}>Balya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kaumar"
                    status={
                      checkedValues.vayas.includes('kaumar')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('vayas', 'kaumar')}
                  />
                  <Text style={styles.text3}>Kaumar</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="yuva"
                    status={
                      checkedValues.vayas.includes('yuva')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('vayas', 'yuva')}
                  />
                  <Text style={styles.text3}>Yuva</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhaya"
                    status={
                      checkedValues.vayas.includes('madhaya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('vayas', 'madhaya')}
                  />
                  <Text style={styles.text3}>Madhaya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vardhakya"
                    status={
                      checkedValues.vayas.includes('vardhakya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('vayas', 'vardhakya')}
                  />
                  <Text style={styles.text3}>Vardhakya</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Desham */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('desham')}>
            <Text style={styles.text}>Desham</Text>
            <Text style={styles.text}>
              {!collapsedSections.desham ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.desham && (
            <>
              <Text style={styles.label}>Jangal</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="jangal"
                    status={
                      checkedValues.desham.includes('jangal')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('desham', 'jangal')}
                  />
                  <Text style={styles.text3}>Jangal</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="anoop"
                    status={
                      checkedValues.desham.includes('anoop')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('desham', 'anoop')}
                  />
                  <Text style={styles.text3}>Anoop</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sadharan"
                    status={
                      checkedValues.desham.includes('sadharan')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('desham', 'sadharan')}
                  />
                  <Text style={styles.text3}>Sadharan</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Kalatha */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('kalatha')}>
            <Text style={styles.text}>Kalatha</Text>
            <Text style={styles.text}>
              {!collapsedSections.kalatha ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.kalatha && (
            <>
              <Text style={styles.label}>Shishir</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shishir"
                    status={
                      checkedValues.kalatha.includes('shishir')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('kalatha', 'shishir')}
                  />
                  <Text style={styles.text3}>Jangal</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vasant"
                    status={
                      checkedValues.kalatha.includes('vasant')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('kalatha', 'vasant')}
                  />
                  <Text style={styles.text3}>Vasant</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="greeshma"
                    status={
                      checkedValues.kalatha.includes('greeshma')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('kalatha', 'greeshma')}
                  />
                  <Text style={styles.text3}>Greeshma</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="varsha"
                    status={
                      checkedValues.kalatha.includes('varsha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('kalatha', 'varsha')}
                  />
                  <Text style={styles.text3}>Varsha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sharad"
                    status={
                      checkedValues.kalatha.includes('sharad')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('kalatha', 'sharad')}
                  />
                  <Text style={styles.text3}>Sharad</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="hemant"
                    status={
                      checkedValues.kalatha.includes('hemant')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('kalatha', 'hemant')}
                  />
                  <Text style={styles.text3}>Hemant</Text>
                </View>
              </View>
            </>
          )}
        </View>
        {/* Satwa */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('satwa')}>
            <Text style={styles.text}>Satwa</Text>
            <Text style={styles.text}>
              {!collapsedSections.satwa ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.satwa && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="uttam"
                    status={
                      checkedValues.satwa.includes('uttam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('satwa', 'uttam')}
                  />
                  <Text style={styles.text3}>Uttam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhyam"
                    status={
                      checkedValues.satwa.includes('madhyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('satwa', 'madhyam')}
                  />
                  <Text style={styles.text3}>Madhyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="heena"
                    status={
                      checkedValues.satwa.includes('heena')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('satwa', 'heena')}
                  />
                  <Text style={styles.text3}>Heena</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* sahanan */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('sahanan')}>
            <Text style={styles.text}>Sahanan</Text>
            <Text style={styles.text}>
              {!collapsedSections.sahanan ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.sahanan && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="uttam"
                    status={
                      checkedValues.sahanan.includes('uttam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sahanan', 'uttam')}
                  />
                  <Text style={styles.text3}>Uttam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhyam"
                    status={
                      checkedValues.sahanan.includes('madhyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sahanan', 'madhyam')}
                  />
                  <Text style={styles.text3}>Madhyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="heena"
                    status={
                      checkedValues.sahanan.includes('heena')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sahanan', 'heena')}
                  />
                  <Text style={styles.text3}>Heena</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* pramanata */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('pramanata')}>
            <Text style={styles.text}>Pramanata</Text>
            <Text style={styles.text}>
              {!collapsedSections.pramanata ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.pramanata && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="uttam"
                    status={
                      checkedValues.pramanata.includes('uttam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('pramanata', 'uttam')}
                  />
                  <Text style={styles.text3}>Uttam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhyam"
                    status={
                      checkedValues.pramanata.includes('madhyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('pramanata', 'madhyam')}
                  />
                  <Text style={styles.text3}>Madhyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="heena"
                    status={
                      checkedValues.pramanata.includes('heena')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('pramanata', 'heena')}
                  />
                  <Text style={styles.text3}>Heena</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* shareerbalam */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('shareerbalam')}>
            <Text style={styles.text}>Shareerbalam</Text>
            <Text style={styles.text}>
              {!collapsedSections.shareerbalam ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.shareerbalam && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="uttam"
                    status={
                      checkedValues.shareerbalam.includes('uttam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('shareerbalam', 'uttam')
                    }
                  />
                  <Text style={styles.text3}>Uttam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhyam"
                    status={
                      checkedValues.shareerbalam.includes('madhyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('shareerbalam', 'madhyam')
                    }
                  />
                  <Text style={styles.text3}>Madhyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="heena"
                    status={
                      checkedValues.shareerbalam.includes('heena')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('shareerbalam', 'heena')
                    }
                  />
                  <Text style={styles.text3}>Heena</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* manasaprakrit */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('manasaprakrit')}>
            <Text style={styles.text}>Manasa Prakrit</Text>
            <Text style={styles.text}>
              {!collapsedSections.manasaprakrit ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.manasaprakrit && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="satwik"
                    status={
                      checkedValues.manasaprakrit.includes('satwik')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('manasaprakrit', 'satwik')
                    }
                  />
                  <Text style={styles.text3}>Satwik</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="rajas"
                    status={
                      checkedValues.manasaprakrit.includes('rajas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('manasaprakrit', 'rajas')
                    }
                  />
                  <Text style={styles.text3}>Rajas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="tamas"
                    status={
                      checkedValues.manasaprakrit.includes('tamas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('manasaprakrit', 'tamas')
                    }
                  />
                  <Text style={styles.text3}>Tamas</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.divbutton}>
        <Button
          title="Previous"
          color="#841584"
          style={styles.button}
          onPress={() => navigation.navigate('AshtvidhPariksha')}
        />
        <Button
          title="Submit"
          color="#841584"
          style={styles.button}
          onPress={() => submitTreatmenthandler()}
        />
        <Button
          title="Skip / Next"
          color="#841584"
          style={styles.button}
          onPress={() => navigation.navigate('SrotasPariksha')}
        />
      </View>
    </>
  );
};

export default DashavidhPariksha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerDiv: {
    borderColor: '#c4c4c4',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    backgroundColor: '#80aaff',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  text: { textAlign: 'left', color: '#ffffff', fontSize: 18 },
  checkboxDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    padding: 8,
    color: 'red',
    fontSize: 18,
  },
  divbutton: {
    marginVertical: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
    minWidth: 100,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  inputDiv: {
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text2: {
    fontSize: 18,
    color: 'black',
  },
  text3: {
    flexWrap: "wrap",
    width: '80%'
  }
});

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
import React, {useContext, useEffect, useState} from 'react';
import {OpdAyurvedicNavigation} from './OpdpageNavigation';
import {Appbar, Checkbox, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';

const AshtvidhPariksha = () => {
  //
  const {scannedPatientsData, waitingListData, userData} =
    useContext(UserContext);
  const {appoint_id} = scannedPatientsData;

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };
  const navigation = useNavigation();

  //

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('Prakruti');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //
  const [checkedValues, setCheckedValues] = useState({
    nadi_vega: '',
    character: '',
    bala: '',
    gati: '',
    mutra_vega: '',
    varna: '',
    sparsha: '',
    matra: '',
    gandha: '',
    mala_vega: '',
    samhanan: '',
    mala_varna: '',
    jivha_varna: '',
    jivha_sparsh: '',
    jivha_mukhaswada: '',
    prakashsangya: '',
    netra_drishtimandala: '',
    netra_mukhaswada: '',
    shabda: '',
    drishtimandala: '',
    mukhaswada: '',
  });

  const [collapsedSections, setCollapsedSections] = useState({
    nadi: true,
    mutra: true,
    mala: true,
    jivha: true,
    netra: true,
    character: true,
    bala: true,
    gati: true,
    shabda: true,
  });

  const toggleSection = section => {
    setCollapsedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleCheckboxToggle = (key, value) => {
    setCheckedValues(prevState => {
      if (typeof prevState[key] === 'string') {
        // For text input updates
        return {
          ...prevState,
          [key]: value,
        };
      } else {
        // For checkbox toggling
        const newValue = prevState[key].includes(value)
          ? prevState[key].filter(item => item !== value) // Remove value if already selected
          : [...prevState[key], value]; // Add value if not selected
        return {
          ...prevState,
          [key]: newValue,
        };
      }
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
      nadi_vega: '',
      character: '',
      bala: '',
      gati: '',
      mutra_vega: '',
      varna: '',
      sparsha: '',
      matra: '',
      gandha: '',
      mala_vega: '',
      samhanan: '',
      mala_varna: '',
      jivha_varna: '',
      jivha_sparsh: '',
      jivha_mukhaswada: '',
      prakashsangya: '',
      netra_drishtimandala: '',
      netra_mukhaswada: '',
      shabda: '',
      drishtimandala: '',
      mukhaswada: '',
    });
  };
  // submit handler .....

  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: userData?.hospital_id,
      patient_id: waitingListData?.newpatient_id,
      mobilenumber: waitingListData?.mobilenumber,
      reception_id: userData?._id,
      appoint_id: appoint_id || waitingListData?.appoint_id,
      uhid: waitingListData?.uhid,
      api_type: 'AshtvidhPariksha',
      opdashtvidhparikshahistoryarray: [checkedValues],
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            _resetHandler();
            Alert.alert('Success', `${message}`);
          } else {
            console.error(`${message}`);
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
            navigation.replace('Prakruti');
            return true;
          }}
        />
        <Appbar.Content title="Ashtvidh Pariksha" titleStyle={{fontSize: 20}} />
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
      <ScrollView vertical style={styles.container}>
        {/* nadi */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('nadi')}>
            <Text style={styles.text}>Nadit</Text>
            <Text style={styles.text}>
              {!collapsedSections.nadi ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.nadi && (
            <>
              <View>
                <Text style={styles.label}>Vega</Text>
                <View style={styles.body}>
                  <View style={styles.inputDiv}>
                    <TextInput
                      style={styles.input}
                      onChangeText={text =>
                        handleCheckboxToggle('nadi_vega', text)
                      }
                      value={checkedValues.nadi_vega}
                    />
                    <Text style={styles.text2}>/min</Text>
                  </View>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <Text style={styles.label}>Character</Text>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="regular"
                    status={
                      checkedValues.character.includes('regular')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('character', 'regular')}
                  />
                  <Text>Regular</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="irregular"
                    status={
                      checkedValues.character.includes('irregular')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('character', 'irregular')
                    }
                  />
                  <Text>Irregular</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Bala</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pravaram"
                    status={
                      checkedValues.bala.includes('pravaram')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('bala', 'pravaram')}
                  />
                  <Text>Pravaram</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhyam"
                    status={
                      checkedValues.bala.includes('madhyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('bala', 'madhyam')}
                  />
                  <Text>Madhyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="heenam"
                    status={
                      checkedValues.bala.includes('heenam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('bala', 'heenam')}
                  />
                  <Text>Heenam</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Gati</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sarpa"
                    status={
                      checkedValues.gati.includes('sarpa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('gati', 'sarpa')}
                  />
                  <Text>Sarpa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="manduka"
                    status={
                      checkedValues.gati.includes('manduka')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('gati', 'manduka')}
                  />
                  <Text>Manduka</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="hamsa"
                    status={
                      checkedValues.gati.includes('hamsa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('gati', 'hamsa')}
                  />
                  <Text>Hamsa</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Mutra */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('mutra')}>
            <Text style={styles.text}>Mutra</Text>
            <Text style={styles.text}>
              {!collapsedSections.mutra ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.mutra && (
            <>
              <Text style={styles.label}>Vega</Text>
              <View style={styles.body}>
                <View style={styles.inputDiv}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text =>
                      handleCheckboxToggle('mutra_vega', text)
                    }
                    value={checkedValues.mutra_vega}
                  />
                  <Text style={styles.text2}>/day</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Varna</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pandu"
                    status={
                      checkedValues.varna.includes('pandu')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('varna', 'pandu')}
                  />
                  <Text>Pandu</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="rakta"
                    status={
                      checkedValues.varna.includes('rakta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('varna', 'rakta')}
                  />
                  <Text>Rakta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pita"
                    status={
                      checkedValues.varna.includes('pita')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('varna', 'pita')}
                  />
                  <Text>Pita</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="aruna"
                    status={
                      checkedValues.varna.includes('aruna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('varna', 'aruna')}
                  />
                  <Text>Aruna</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Sparsha</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ruksha"
                    status={
                      checkedValues.sparsha.includes('ruksha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sparsha', 'ruksha')}
                  />
                  <Text>Ruksha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="phenil"
                    status={
                      checkedValues.sparsha.includes('phenil')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sparsha', 'phenil')}
                  />
                  <Text>Phenil</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pichhila"
                    status={
                      checkedValues.sparsha.includes('pichhila')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sparsha', 'pichhila')}
                  />
                  <Text>Pichhila</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="tailasam"
                    status={
                      checkedValues.sparsha.includes('tailasam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sparsha', 'tailasam')}
                  />
                  <Text>Tailasam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="achha"
                    status={
                      checkedValues.sparsha.includes('achha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sparsha', 'achha')}
                  />
                  <Text>Achha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sandra"
                    status={
                      checkedValues.sparsha.includes('sandra')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sparsha', 'sandra')}
                  />
                  <Text>Sandra</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ushna"
                    status={
                      checkedValues.sparsha.includes('ushna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sparsha', 'ushna')}
                  />
                  <Text>Ushna</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Shita"
                    status={
                      checkedValues.sparsha.includes('Shita')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('sparsha', 'Shita')}
                  />
                  <Text>Shita</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Matra</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="bahu"
                    status={
                      checkedValues.matra.includes('bahu')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('matra', 'bahu')}
                  />
                  <Text>Bahu</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="alpa"
                    status={
                      checkedValues.matra.includes('alpa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('matra', 'alpa')}
                  />
                  <Text>Alpa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="samayak"
                    status={
                      checkedValues.matra.includes('samayak')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('matra', 'samayak')}
                  />
                  <Text>Samayak</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Gandha</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="daurgandhya"
                    status={
                      checkedValues.gandha.includes('daurgandhya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('gandha', 'daurgandhya')
                    }
                  />
                  <Text>Daurgandhya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="visragandha"
                    status={
                      checkedValues.gandha.includes('visragandha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('gandha', 'visragandha')
                    }
                  />
                  <Text>Visragandha</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Mala */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('mala')}>
            <Text style={styles.text}>Mala</Text>
            <Text style={styles.text}>
              {!collapsedSections.mala ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.mala && (
            <>
              <Text style={styles.label}>Vega</Text>
              <View style={styles.body}>
                <View style={styles.inputDiv}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text =>
                      handleCheckboxToggle('mala_vega', text)
                    }
                    value={checkedValues.mala_vega}
                  />
                  <Text style={styles.text2}>/day</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Samhanan</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="prakrit"
                    status={
                      checkedValues.samhanan.includes('prakrit')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'prakrit')}
                  />
                  <Text>Prakrit</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ghadha"
                    status={
                      checkedValues.samhanan.includes('ghadha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'ghadha')}
                  />
                  <Text>Ghadha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shushka"
                    status={
                      checkedValues.varna.includes('shushka')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('varna', 'shushka')}
                  />
                  <Text>Shushka</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="trutitam"
                    status={
                      checkedValues.samhanan.includes('trutitam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'trutitam')}
                  />
                  <Text>Trutitam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="drava"
                    status={
                      checkedValues.samhanan.includes('drava')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'drava')}
                  />
                  <Text>Drava</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="phenil"
                    status={
                      checkedValues.samhanan.includes('phenil')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'phenil')}
                  />
                  <Text>Phenil</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pichhila"
                    status={
                      checkedValues.samhanan.includes('pichhila')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'pichhila')}
                  />
                  <Text>Pichhila</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sandra"
                    status={
                      checkedValues.samhanan.includes('sandra')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'sandra')}
                  />
                  <Text>Sandra</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="apakwa"
                    status={
                      checkedValues.samhanan.includes('apakwa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'apakwa')}
                  />
                  <Text>Apakwa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sheetal"
                    status={
                      checkedValues.samhanan.includes('sheetal')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('samhanan', 'sheetal')}
                  />
                  <Text>Sheetal</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="puyayukta"
                    status={
                      checkedValues.samhanan.includes('puyayukta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('samhanan', 'puyayukta')
                    }
                  />
                  <Text>Puyayukta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="daurgandhya"
                    status={
                      checkedValues.samhanan.includes('daurgandhya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('samhanan', 'daurgandhya')
                    }
                  />
                  <Text>Daurgandhya</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Varna</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pita"
                    status={
                      checkedValues.mala_varna.includes('pita')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala_varna', 'pita')}
                  />
                  <Text>Pita</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pitabhkrishna"
                    status={
                      checkedValues.mala_varna.includes('pitabhkrishna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mala_varna', 'pitabhkrishna')
                    }
                  />
                  <Text>Pitabhkrishna</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="krishna"
                    status={
                      checkedValues.mala_varna.includes('krishna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mala_varna', 'krishna')
                    }
                  />
                  <Text>Krishna</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="haritabpita"
                    status={
                      checkedValues.mala_varna.includes('haritabpita')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mala_varna', 'haritabpita')
                    }
                  />
                  <Text>Haritabpita</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shweta"
                    status={
                      checkedValues.mala_varna.includes('shweta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala_varna', 'shweta')}
                  />
                  <Text>Shweta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kapish"
                    status={
                      checkedValues.mala_varna.includes('kapish')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala_varna', 'kapish')}
                  />
                  <Text>Kapish</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shyam"
                    status={
                      checkedValues.mala_varna.includes('shyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala_varna', 'shyam')}
                  />
                  <Text>Shyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sama"
                    status={
                      checkedValues.mala_varna.includes('sama')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala_varna', 'sama')}
                  />
                  <Text>Sama</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="nirama"
                    status={
                      checkedValues.mala_varna.includes('nirama')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala_varna', 'nirama')}
                  />
                  <Text>Nirama</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Jivha */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('jivha')}>
            <Text style={styles.text}>Jivha</Text>
            <Text style={styles.text}>
              {!collapsedSections.jivha ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.jivha && (
            <>
              <Text style={styles.label}>Varna</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="rakta"
                    status={
                      checkedValues.jivha_varna.includes('rakta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('jivha_varna', 'rakta')}
                  />
                  <Text>Rakta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pitabhkrishna"
                    status={
                      checkedValues.jivha_varna.includes('pitabhkrishna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_varna', 'pitabhkrishna')
                    }
                  />
                  <Text>Pitabhkrishna</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="krishna"
                    status={
                      checkedValues.jivha_varna.includes('krishna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_varna', 'krishna')
                    }
                  />
                  <Text>Krishna</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="jivhaliptata"
                    status={
                      checkedValues.jivha_varna.includes('jivhaliptata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_varna', 'jivhaliptata')
                    }
                  />
                  <Text>Jivhaliptata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shweta"
                    status={
                      checkedValues.jivha_varna.includes('shweta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_varna', 'shweta')
                    }
                  />
                  <Text>Shweta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shyam"
                    status={
                      checkedValues.jivha_varna.includes('shyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('jivha_varna', 'shyam')}
                  />
                  <Text>Shyam</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Sparsh</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="khara"
                    status={
                      checkedValues.jivha_sparsh.includes('khara')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_sparsh', 'khara')
                    }
                  />
                  <Text>Khara</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="suptata"
                    status={
                      checkedValues.jivha_sparsh.includes('suptata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_sparsh', 'suptata')
                    }
                  />
                  <Text>Suptata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pichhil"
                    status={
                      checkedValues.jivha_sparsh.includes('pichhil')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_sparsh', 'pichhil')
                    }
                  />
                  <Text>Pichhil</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sakantaka"
                    status={
                      checkedValues.jivha_sparsh.includes('sakantaka')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_sparsh', 'sakantaka')
                    }
                  />
                  <Text>Sakantaka</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shushka"
                    status={
                      checkedValues.jivha_sparsh.includes('shushka')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_sparsh', 'shushka')
                    }
                  />
                  <Text>Shushka</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Mukhaswada</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhur"
                    status={
                      checkedValues.jivha_mukhaswada.includes('madhur')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_mukhaswada', 'madhur')
                    }
                  />
                  <Text>Madhur</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="katu"
                    status={
                      checkedValues.jivha_mukhaswada.includes('katu')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_mukhaswada', 'katu')
                    }
                  />
                  <Text>Katu</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kashay"
                    status={
                      checkedValues.jivha_mukhaswada.includes('kashay')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_mukhaswada', 'kashay')
                    }
                  />
                  <Text>Kashay</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhuramla"
                    status={
                      checkedValues.jivha_mukhaswada.includes('madhuramla')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('jivha_mukhaswada', 'madhuramla')
                    }
                  />
                  <Text>Madhuramla</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ghrutpurna_asyata"
                    status={
                      checkedValues.jivha_mukhaswada.includes(
                        'ghrutpurna_asyata',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'jivha_mukhaswada',
                        'ghrutpurna_asyata',
                      )
                    }
                  />
                  <Text>Ghrutpurna-Asyata</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Netra */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('netra')}>
            <Text style={styles.text}>Netra</Text>
            <Text style={styles.text}>
              {!collapsedSections.netra ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.netra && (
            <>
              <Text style={styles.label}>Prakashsangya</Text>
              <View style={styles.body}></View>
              <Divider />
              <Text style={styles.label}>Drishtimandala</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="prakrit"
                    status={
                      checkedValues.netra_drishtimandala.includes('prakrit')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('netra_drishtimandala', 'prakrit')
                    }
                  />
                  <Text>Prakrit</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sankuchit"
                    status={
                      checkedValues.netra_drishtimandala.includes('sankuchit')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('netra_drishtimandala', 'sankuchit')
                    }
                  />
                  <Text>Sankuchit</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vispharit"
                    status={
                      checkedValues.netra_drishtimandala.includes('vispharit')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('netra_drishtimandala', 'vispharit')
                    }
                  />
                  <Text>Vispharit</Text>
                </View>
              </View>
              <Text style={styles.label}>Mukhaswada</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="prakrit"
                    status={
                      checkedValues.netra_mukhaswada.includes('prakrit')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('netra_mukhaswada', 'prakrit')
                    }
                  />
                  <Text>Prakrit</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shweta"
                    status={
                      checkedValues.netra_mukhaswada.includes('shweta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('netra_mukhaswada', 'shweta')
                    }
                  />
                  <Text>Shweta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shhyava"
                    status={
                      checkedValues.netra_mukhaswada.includes('shhyava')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('netra_mukhaswada', 'shhyava')
                    }
                  />
                  <Text>Shhyava</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="aruna"
                    status={
                      checkedValues.netra_mukhaswada.includes('aruna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('netra_mukhaswada', 'aruna')
                    }
                  />
                  <Text>Aruna</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pita"
                    status={
                      checkedValues.netra_mukhaswada.includes('pita')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('netra_mukhaswada', 'pita')
                    }
                  />
                  <Text>Pita</Text>
                </View>
              </View>
            </>
          )}
        </View>
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('shabda')}>
            <Text style={styles.text}>Shabda</Text>
            <Text style={styles.text}>
              {!collapsedSections.shabda ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.shabda && (
            <>
              <Text style={styles.label}>Shabda</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ksheen"
                    status={
                      checkedValues.shabda.includes('ksheen')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('shabda', 'ksheen')}
                  />
                  <Text>Ksheen</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="gambhir"
                    status={
                      checkedValues.shabda.includes('gambhir')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('shabda', 'gambhir')}
                  />
                  <Text>Gambhir</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="snigdha"
                    status={
                      checkedValues.shabda.includes('snigdha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('shabda', 'snigdha')}
                  />
                  <Text>Snigdha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="gadgad"
                    status={
                      checkedValues.shabda.includes('gadgad')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('shabda', 'gadgad')}
                  />
                  <Text>Gadgad</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ruksha"
                    status={
                      checkedValues.shabda.includes('ruksha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('shabda', 'ruksha')}
                  />
                  <Text>Ruksha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="minmin"
                    status={
                      checkedValues.shabda.includes('minmin')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('shabda', 'minmin')}
                  />
                  <Text>Minmin</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Drishtimandala</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="snigdha"
                    status={
                      checkedValues.drishtimandala.includes('snigdha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('drishtimandala', 'snigdha')
                    }
                  />
                  <Text>Snigdha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sheetal"
                    status={
                      checkedValues.drishtimandala.includes('sheetal')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('drishtimandala', 'sheetal')
                    }
                  />
                  <Text>Sheetal</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="anushnasheeta"
                    status={
                      checkedValues.drishtimandala.includes('anushnasheeta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('drishtimandala', 'anushnasheeta')
                    }
                  />
                  <Text>Anushnasheeta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ruksha"
                    status={
                      checkedValues.drishtimandala.includes('ruksha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('drishtimandala', 'ruksha')
                    }
                  />
                  <Text>Ruksha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="ushna"
                    status={
                      checkedValues.drishtimandala.includes('ushna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('drishtimandala', 'ushna')
                    }
                  />
                  <Text>Ushna</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shushka"
                    status={
                      checkedValues.drishtimandala.includes('shushka')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('drishtimandala', 'shushka')
                    }
                  />
                  <Text>Shushka</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Mukhaswada</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sthoola"
                    status={
                      checkedValues.mukhaswada.includes('sthoola')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mukhaswada', 'sthoola')
                    }
                  />
                  <Text>Sthoola</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhyam"
                    status={
                      checkedValues.mukhaswada.includes('madhyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mukhaswada', 'madhyam')
                    }
                  />
                  <Text>Madhyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="krisha"
                    status={
                      checkedValues.bala.includes('krisha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('bala', 'krisha')}
                  />
                  <Text>Krisha</Text>
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
          onPress={() => navigation.navigate('Prakruti')}
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
          onPress={() => navigation.navigate('DashavidhPariksha')}
        />
      </View>
    </>
  );
};

export default AshtvidhPariksha;

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
  text: {textAlign: 'left', color: '#ffffff', fontSize: 18},
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
});

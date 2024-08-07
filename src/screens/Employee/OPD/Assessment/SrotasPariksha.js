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

const SrotasPariksha = () => {
  //
  const { scannedPatientsData, waitingListData, userData } =
    useContext(UserContext);
  const { appoint_id, mobilenumber } = scannedPatientsData;

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
    pranavahasrotas: '',
    udakvahasrotas: '',
    annavahasrotas: '',
    rasavahasrotas: '',
    raktavahasrotas: '',
    mansavahasrotas: '',
    medovahasrotas: '',
    asthivahasrotas: '',
    majjavahasrotas: '',
    shukravahasrotas: '',
    artavavahasrotas: '',
    mutravahasrotas: '',
    purishvahasrotas: '',
    swedavahasrotas: '',
  });

  const [collapsedSections, setCollapsedSections] = useState({
    pranavahasrotas: true,
    asthivahasrotas: true,
    majjavahasrotas: true,
    shukravahasrotas: true,
    artavavahasrotas: true,
    mutravahasrotas: true,
    purishvahasrotas: true,
    udakvahasrotas: true,
    annavahasrotas: true,
    rasavahasrotas: true,
    raktavahasrotas: true,
    mansavahasrotas: true,
    medovahasrotas: true,
    swedavahasrotas: true,
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
  const _resetHandler = () => {
    setCheckedValues({
      pranavahasrotas: '',
      udakvahasrotas: '',
      annavahasrotas: '',
      rasavahasrotas: '',
      raktavahasrotas: '',
      mansavahasrotas: '',
      medovahasrotas: '',
      asthivahasrotas: '',
      majjavahasrotas: '',
      shukravahasrotas: '',
      artavavahasrotas: '',
      mutravahasrotas: '',
      purishvahasrotas: '',
      swedavahasrotas: '',
    });
  };
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: userData?.hospital_id,
      patient_id: waitingListData?.newpatient_id,
      mobilenumber: waitingListData?.mobilenumber || mobilenumber,
      reception_id: userData?._id,
      appoint_id: waitingListData?.appoint_id || appoint_id,
      uhid: waitingListData?.uhid,
      api_type: 'SrotasPariksha',
      opdsrotasparikshahistoryarray: [checkedValues],
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
            navigation.goBack();
            return true;
          }}
        />
        <Appbar.Content title="Srotas Pariksha" titleStyle={{ fontSize: 20 }} />
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
        {/* pranavahasrotas  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('pranavahasrotas')}>
            <Text style={styles.text}>Pranavahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.pranavahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.pranavahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="alpaswasa"
                    status={
                      checkedValues.pranavahasrotas.includes('alpaswasa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('pranavahasrotas', 'alpaswasa')
                    }
                  />
                  <Text style={styles.text3}>Alpaswasa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kupitswasa"
                    status={
                      checkedValues.pranavahasrotas.includes('kupitswasa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('pranavahasrotas', 'kupitswasa')
                    }
                  />
                  <Text style={styles.text3}>Kupitswasa</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="atisaranaswasa"
                    status={
                      checkedValues.pranavahasrotas.includes('atisaranaswasa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('pranavahasrotas', 'atisaranaswasa')
                    }
                  />
                  <Text style={styles.text3}>Atisaranaswasa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sashulswasa"
                    status={
                      checkedValues.pranavahasrotas.includes('sashulswasa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('pranavahasrotas', 'sashulswasa')
                    }
                  />
                  <Text style={styles.text3}>Sashulswasa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="abhikshnaswasa"
                    status={
                      checkedValues.pranavahasrotas.includes('abhikshnaswasa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('pranavahasrotas', 'abhikshnaswasa')
                    }
                  />
                  <Text style={styles.text3}>Abhikshnaswasa</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Udakvahasrotas  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('udakvahasrotas')}>
            <Text style={styles.text}>Udakvahasrotas </Text>
            <Text style={styles.text}>
              {!collapsedSections.udakvahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.udakvahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="jivhashosha"
                    status={
                      checkedValues.udakvahasrotas.includes('jivhashosha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('udakvahasrotas', 'jivhashosha')
                    }
                  />
                  <Text style={styles.text3}>Jivhashosha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kanthashosha"
                    status={
                      checkedValues.udakvahasrotas.includes('kanthashosha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('udakvahasrotas', 'kanthashosha')
                    }
                  />
                  <Text style={styles.text3}>Kanthashosha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="aushtashosha"
                    status={
                      checkedValues.udakvahasrotas.includes('aushtashosha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('udakvahasrotas', 'aushtashosha')
                    }
                  />
                  <Text style={styles.text3}>Aushtashosha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="trishna"
                    status={
                      checkedValues.udakvahasrotas.includes('trishna')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('udakvahasrotas', 'trishna')
                    }
                  />
                  <Text style={styles.text3}>Trishna</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="talushosha"
                    status={
                      checkedValues.udakvahasrotas.includes('talushosha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('udakvahasrotas', 'talushosha')
                    }
                  />
                  <Text style={styles.text3}>Talushosha</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Annavahasrotas  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('annavahasrotas')}>
            <Text style={styles.text}>Annavahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.annavahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.annavahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="anannabhilasha"
                    status={
                      checkedValues.annavahasrotas.includes('anannabhilasha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('annavahasrotas', 'anannabhilasha')
                    }
                  />
                  <Text style={styles.text3}>Anannabhilasha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="avipaka"
                    status={
                      checkedValues.annavahasrotas.includes('avipaka')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('annavahasrotas', 'avipaka')
                    }
                  />
                  <Text style={styles.text3}>Avipaka</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="aruchi"
                    status={
                      checkedValues.annavahasrotas.includes('aruchi')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('annavahasrotas', 'aruchi')
                    }
                  />
                  <Text style={styles.text3}>Aruchi</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="chhardi"
                    status={
                      checkedValues.annavahasrotas.includes('chhardi')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('annavahasrotas', 'chhardi')
                    }
                  />
                  <Text style={styles.text3}>Chhardi</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Rasavahasrotas   */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('rasavahasrotas')}>
            <Text style={styles.text}>Rasavahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.rasavahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.rasavahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="mukhvairasya"
                    status={
                      checkedValues.rasavahasrotas.includes('mukhvairasya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'mukhvairasya')
                    }
                  />
                  <Text style={styles.text3}>Mukhvairasya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="jwara"
                    status={
                      checkedValues.rasavahasrotas.includes('jwara')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'jwara')
                    }
                  />
                  <Text style={styles.text3}>Jwara</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="arasyata"
                    status={
                      checkedValues.rasavahasrotas.includes('arasyata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'arasyata')
                    }
                  />
                  <Text style={styles.text3}>Arasyata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pandu"
                    status={
                      checkedValues.rasavahasrotas.includes('pandu')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'pandu')
                    }
                  />
                  <Text style={styles.text3}>Pandu</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="hrillhas"
                    status={
                      checkedValues.rasavahasrotas.includes('hrillhas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'hrillhas')
                    }
                  />
                  <Text style={styles.text3}>Hrillhas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="avasada"
                    status={
                      checkedValues.rasavahasrotas.includes('avasada')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'avasada')
                    }
                  />
                  <Text style={styles.text3}>Avasada</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="klaibya"
                    status={
                      checkedValues.rasavahasrotas.includes('klaibya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'klaibya')
                    }
                  />
                  <Text style={styles.text3}>Klaibya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="tandra"
                    status={
                      checkedValues.rasavahasrotas.includes('tandra')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'tandra')
                    }
                  />
                  <Text style={styles.text3}>Tandra</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="angamarda"
                    status={
                      checkedValues.rasavahasrotas.includes('angamarda')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'angamarda')
                    }
                  />
                  <Text style={styles.text3}>Angamarda</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="agnimandya"
                    status={
                      checkedValues.rasavahasrotas.includes('agnimandya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'agnimandya')
                    }
                  />
                  <Text style={styles.text3}>Agnimandya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="valaya"
                    status={
                      checkedValues.rasavahasrotas.includes('valaya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'valaya')
                    }
                  />
                  <Text style={styles.text3}>Valaya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="palitya"
                    status={
                      checkedValues.rasavahasrotas.includes('palitya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('rasavahasrotas', 'palitya')
                    }
                  />
                  <Text style={styles.text3}>Palitya</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* raktavahasrotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('raktavahasrotas')}>
            <Text style={styles.text}>raktavahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.raktavahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.raktavahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pidika"
                    status={
                      checkedValues.raktavahasrotas.includes('pidika')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('raktavahasrotas', 'pidika')
                    }
                  />
                  <Text style={styles.text3}>Pidika</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vidradhi"
                    status={
                      checkedValues.raktavahasrotas.includes('vidradhi')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('raktavahasrotas', 'vidradhi')
                    }
                  />
                  <Text style={styles.text3}>Vidradhi</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="raktapitta"
                    status={
                      checkedValues.raktavahasrotas.includes('raktapitta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('raktavahasrotas', 'raktapitta')
                    }
                  />
                  <Text style={styles.text3}>Raktapitta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="charmaroga"
                    status={
                      checkedValues.raktavahasrotas.includes('charmaroga')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('raktavahasrotas', 'charmaroga')
                    }
                  />
                  <Text style={styles.text3}>Charmaroga</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="mukhapaka"
                    status={
                      checkedValues.raktavahasrotas.includes('mukhapaka')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('raktavahasrotas', 'mukhapaka')
                    }
                  />
                  <Text style={styles.text3}>Mukhapaka</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kamala"
                    status={
                      checkedValues.raktavahasrotas.includes('kamala')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('raktavahasrotas', 'kamala')
                    }
                  />
                  <Text style={styles.text3}>Kamala</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* mansavahasrotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('mansavahasrotas')}>
            <Text style={styles.text}>Mansavahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.mansavahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.mansavahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="arbuda"
                    status={
                      checkedValues.mansavahasrotas.includes('arbuda')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mansavahasrotas', 'arbuda')
                    }
                  />
                  <Text style={styles.text3}>Arbuda</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="upajivhika"
                    status={
                      checkedValues.mansavahasrotas.includes('upajivhika')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mansavahasrotas', 'upajivhika')
                    }
                  />
                  <Text style={styles.text3}>Upajivhika</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="alaji"
                    status={
                      checkedValues.mansavahasrotas.includes('alaji')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mansavahasrotas', 'alaji')
                    }
                  />
                  <Text style={styles.text3}>Alaji</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="putimansa"
                    status={
                      checkedValues.mansavahasrotas.includes('putimansa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mansavahasrotas', 'putimansa')
                    }
                  />
                  <Text style={styles.text3}>Putimansa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="adhimansa"
                    status={
                      checkedValues.mansavahasrotas.includes('adhimansa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mansavahasrotas', 'adhimansa')
                    }
                  />
                  <Text style={styles.text3}>Adhimansa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="gandamala"
                    status={
                      checkedValues.mansavahasrotas.includes('gandamala')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mansavahasrotas', 'gandamala')
                    }
                  />
                  <Text style={styles.text3}>Gandamala</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* medovahasrotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('medovahasrotas')}>
            <Text style={styles.text}>Medovahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.medovahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.medovahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="maladhikya"
                    status={
                      checkedValues.medovahasrotas.includes('maladhikya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('medovahasrotas', 'maladhikya')
                    }
                  />
                  <Text style={styles.text3}>Maladhikya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Hastapadadaha"
                    status={
                      checkedValues.medovahasrotas.includes('Hastapadadaha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('medovahasrotas', 'Hastapadadaha')
                    }
                  />
                  <Text style={styles.text3}>Hastapadadaha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Hastapadadaha"
                    status={
                      checkedValues.medovahasrotas.includes('Hastapadadaha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('medovahasrotas', 'Hastapadadaha')
                    }
                  />
                  <Text style={styles.text3}>Hastapadadaha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Alasya"
                    status={
                      checkedValues.medovahasrotas.includes('Alasya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('medovahasrotas', 'Alasya')
                    }
                  />
                  <Text style={styles.text3}>Alasya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Hastapadasuptata"
                    status={
                      checkedValues.medovahasrotas.includes('Hastapadasuptata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('medovahasrotas', 'Hastapadasuptata')
                    }
                  />
                  <Text style={styles.text3}>Hastapadasuptata</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Purishvahasrotas  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('purishvahasrotas')}>
            <Text style={styles.text}>Purishvahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.purishvahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.purishvahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Alpalpa"
                    status={
                      checkedValues.purishvahasrotas.includes('Alpalpa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('purishvahasrotas', 'Alpalpa')
                    }
                  />
                  <Text style={styles.text3}>Alpalpa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Atidrava"
                    status={
                      checkedValues.purishvahasrotas.includes('Atidrava')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('purishvahasrotas', 'Atidrava')
                    }
                  />
                  <Text style={styles.text3}>Atidrava</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Sashula"
                    status={
                      checkedValues.purishvahasrotas.includes('Sashula')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('purishvahasrotas', 'Sashula')
                    }
                  />
                  <Text style={styles.text3}>Sashula</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Grathita"
                    status={
                      checkedValues.purishvahasrotas.includes('Grathita')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('purishvahasrotas', 'Grathita')
                    }
                  />
                  <Text style={styles.text3}>Grathita</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* mutravahasrotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('mutravahasrotas')}>
            <Text style={styles.text}>Mutravahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.mutravahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.mutravahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Bahumutrata"
                    status={
                      checkedValues.mutravahasrotas.includes('Bahumutrata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mutravahasrotas', 'Bahumutrata')
                    }
                  />
                  <Text style={styles.text3}>Bahumutrata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Abhikshana"
                    status={
                      checkedValues.mutravahasrotas.includes('Abhikshana')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mutravahasrotas', 'Abhikshana')
                    }
                  />
                  <Text style={styles.text3}>Abhikshana</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Atibandhata"
                    status={
                      checkedValues.mutravahasrotas.includes('Atibandhata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mutravahasrotas', 'Atibandhata')
                    }
                  />
                  <Text style={styles.text3}>Atibandhata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Bahulamutrata"
                    status={
                      checkedValues.mutravahasrotas.includes('Bahulamutrata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mutravahasrotas', 'Bahulamutrata')
                    }
                  />
                  <Text style={styles.text3}>Bahulamutrata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Alpalpamutra"
                    status={
                      checkedValues.mutravahasrotas.includes('Alpalpamutra')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mutravahasrotas', 'Alpalpamutra')
                    }
                  />
                  <Text style={styles.text3}>Alpalpamutra</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Sashulamutra"
                    status={
                      checkedValues.mutravahasrotas.includes('Sashulamutra')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mutravahasrotas', 'Sashulamutra')
                    }
                  />
                  <Text style={styles.text3}>Sashulamutra</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* artavavahasrotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('artavavahasrotas')}>
            <Text style={styles.text}>Artavavahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.artavavahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.artavavahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Alpartava"
                    status={
                      checkedValues.artavavahasrotas.includes('Alpartava')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('artavavahasrotas', 'Alpartava')
                    }
                  />
                  <Text style={styles.text3}>Alpartava</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Atyartava"
                    status={
                      checkedValues.artavavahasrotas.includes('Atyartava')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('artavavahasrotas', 'Atyartava')
                    }
                  />
                  <Text style={styles.text3}>Atyartava</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Anartava"
                    status={
                      checkedValues.artavavahasrotas.includes('Anartava')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('artavavahasrotas', 'Anartava')
                    }
                  />
                  <Text style={styles.text3}>Anartava</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Vandhyatwa"
                    status={
                      checkedValues.artavavahasrotas.includes('Vandhyatwa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('artavavahasrotas', 'Vandhyatwa')
                    }
                  />
                  <Text style={styles.text3}>Vandhyatwa</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* shukravahasrotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('shukravahasrotas')}>
            <Text style={styles.text}>Shukravahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.shukravahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.shukravahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Klaibya"
                    status={
                      checkedValues.shukravahasrotas.includes('Klaibya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('shukravahasrotas', 'Klaibya')
                    }
                  />
                  <Text style={styles.text3}>Klaibya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Garbhapata"
                    status={
                      checkedValues.shukravahasrotas.includes('Garbhapata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('shukravahasrotas', 'Garbhapata')
                    }
                  />
                  <Text style={styles.text3}>Garbhapata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Aharshanam"
                    status={
                      checkedValues.shukravahasrotas.includes('Aharshanam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('shukravahasrotas', 'Aharshanam')
                    }
                  />
                  <Text style={styles.text3}>Aharshanam</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* majjavahasrotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('majjavahasrotas')}>
            <Text style={styles.text}>Majjavahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.majjavahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.majjavahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Parvashula"
                    status={
                      checkedValues.majjavahasrotas.includes('Parvashula')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('majjavahasrotas', 'Parvashula')
                    }
                  />
                  <Text style={styles.text3}>Parvashula</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Murchha"
                    status={
                      checkedValues.majjavahasrotas.includes('Murchha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('majjavahasrotas', 'Murchha')
                    }
                  />
                  <Text style={styles.text3}>Murchha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Bhrama"
                    status={
                      checkedValues.majjavahasrotas.includes('Bhrama')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('majjavahasrotas', 'Bhrama')
                    }
                  />
                  <Text style={styles.text3}>Bhrama</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Mithhyagyan"
                    status={
                      checkedValues.majjavahasrotas.includes('Mithhyagyan')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('majjavahasrotas', 'Mithhyagyan')
                    }
                  />
                  <Text style={styles.text3}>Mithhyagyan</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Timir"
                    status={
                      checkedValues.majjavahasrotas.includes('Timir')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('majjavahasrotas', 'Timir')
                    }
                  />
                  <Text style={styles.text3}>Timir</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* asthivahasrotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('asthivahasrotas')}>
            <Text style={styles.text}>Asthivahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.asthivahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.asthivahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Adhyasthi"
                    status={
                      checkedValues.asthivahasrotas.includes('Adhyasthi')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('asthivahasrotas', 'Adhyasthi')
                    }
                  />
                  <Text style={styles.text3}>Adhyasthi</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Asthishula"
                    status={
                      checkedValues.asthivahasrotas.includes('Asthishula')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('asthivahasrotas', 'Asthishula')
                    }
                  />
                  <Text style={styles.text3}>Asthishula</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Adhidanta"
                    status={
                      checkedValues.asthivahasrotas.includes('Adhidanta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('asthivahasrotas', 'Adhidanta')
                    }
                  />
                  <Text style={styles.text3}>Adhidanta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Dantashula"
                    status={
                      checkedValues.asthivahasrotas.includes('Dantashula')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('asthivahasrotas', 'Dantashula')
                    }
                  />
                  <Text style={styles.text3}>Dantashula</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Khalitya"
                    status={
                      checkedValues.asthivahasrotas.includes('Khalitya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('asthivahasrotas', 'Khalitya')
                    }
                  />
                  <Text style={styles.text3}>Khalitya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Palitya"
                    status={
                      checkedValues.asthivahasrotas.includes('Palitya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('asthivahasrotas', 'Palitya')
                    }
                  />
                  <Text style={styles.text3}>Palitya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Nakhau"
                    status={
                      checkedValues.asthivahasrotas.includes('Nakhau')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('asthivahasrotas', 'Nakhau')
                    }
                  />
                  <Text style={styles.text3}>Nakhau</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vicar"
                    status={
                      checkedValues.asthivahasrotas.includes('vicar')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('asthivahasrotas', 'vicar')
                    }
                  />
                  <Text style={styles.text3}>Vicar</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Swedavahasrotas  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('swedavahasrotas')}>
            <Text style={styles.text}>Swedavahasrotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.swedavahasrotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.swedavahasrotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Asweda"
                    status={
                      checkedValues.swedavahasrotas.includes('Asweda')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('swedavahasrotas', 'Asweda')
                    }
                  />
                  <Text style={styles.text3}>Asweda</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Lomaharsha"
                    status={
                      checkedValues.swedavahasrotas.includes('Lomaharsha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('swedavahasrotas', 'Lomaharsha')
                    }
                  />
                  <Text style={styles.text3}>Lomaharsha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Atisweda"
                    status={
                      checkedValues.swedavahasrotas.includes('Atisweda')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('swedavahasrotas', 'Atisweda')
                    }
                  />
                  <Text style={styles.text3}>Atisweda</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Angaparidaha"
                    status={
                      checkedValues.swedavahasrotas.includes('Angaparidaha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('swedavahasrotas', 'Angaparidaha')
                    }
                  />
                  <Text style={styles.text3}>Angaparidaha</Text>
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
          onPress={() => navigation.navigate('DashavidhPariksha')}
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
          onPress={() => navigation.navigate('Samprapti')}
        />
      </View>
    </>
  );
};

export default SrotasPariksha;

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

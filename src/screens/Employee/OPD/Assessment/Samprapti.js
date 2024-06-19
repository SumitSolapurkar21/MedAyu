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
import {Appbar, Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';

const Samprapti = () => {
  //
  const {scannedPatientsData, waitingListData, userData, selectedFlow} =
    useContext(UserContext);
  const {appoint_id} = scannedPatientsData;

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
    dosha: '',
    dusya: '',
    srotas: '',
    mala: '',
    adhistana: '',
    srotodusthi: '',
    sadhyasadhyatwa: '',
  });

  const [collapsedSections, setCollapsedSections] = useState({
    dosha: true,
    dusya: true,
    srotas: true,
    mala: true,
    adhistana: true,
    srotodusthi: true,
    sadhyasadhyatwa: true,
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
      dosha: '',
      dusya: '',
      srotas: '',
      mala: '',
      adhistana: '',
      srotodusthi: '',
      sadhyasadhyatwa: '',
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
      api_type: 'Samprapti',
      opdsampraptihistoryarray: [checkedValues],
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            _resetHandler();
            Alert.alert('Success', `${message}`, [
              {
                text: 'OK',
                onPress: () => {
                  if (selectedFlow === 'scanned') {
                    navigation.replace('OpdHomePage');
                  } else {
                    navigation.replace('Listofpatients');
                  }
                },
              },
            ]);
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
        <Appbar.Content title="Samprapti" titleStyle={{fontSize: 20}} />
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
        {/* Dosha */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('dosha')}>
            <Text style={styles.text}>Dosha</Text>
            <Text style={styles.text}>
              {!collapsedSections.dosha ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.dosha && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vata"
                    status={
                      checkedValues.dosha.includes('vata')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dosha', 'vata')}
                  />
                  <Text>Vata</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pitta"
                    status={
                      checkedValues.dosha.includes('pitta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dosha', 'pitta')}
                  />
                  <Text>Pitta</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kapha"
                    status={
                      checkedValues.dosha.includes('kapha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dosha', 'kapha')}
                  />
                  <Text>Kapha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vatapitta"
                    status={
                      checkedValues.dosha.includes('vatapitta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dosha', 'vatapitta')}
                  />
                  <Text>Vatapitta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vatakapha"
                    status={
                      checkedValues.dosha.includes('vatakapha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dosha', 'vatakapha')}
                  />
                  <Text>Vatakapha</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pittakapha"
                    status={
                      checkedValues.dosha.includes('pittakapha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dosha', 'pittakapha')}
                  />
                  <Text>Pittakapha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="tridosha"
                    status={
                      checkedValues.dosha.includes('tridosha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dosha', 'tridosha')}
                  />
                  <Text>Tridosha</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* dusya */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('dusya')}>
            <Text style={styles.text}>Dusya</Text>
            <Text style={styles.text}>
              {!collapsedSections.dusya ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.dusya && (
            <>
              <Text style={styles.label}>Rasa</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="rasa"
                    status={
                      checkedValues.dusya.includes('rasa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dusya', 'rasa')}
                  />
                  <Text>Rasa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="rakta"
                    status={
                      checkedValues.dusya.includes('rakta')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dusya', 'rakta')}
                  />
                  <Text>Rakta</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="mansa"
                    status={
                      checkedValues.dusya.includes('mansa')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dusya', 'mansa')}
                  />
                  <Text>Mansa</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="meda"
                    status={
                      checkedValues.dusya.includes('meda')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dusya', 'meda')}
                  />
                  <Text>Meda</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="asthi"
                    status={
                      checkedValues.dusya.includes('asthi')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dusya', 'asthi')}
                  />
                  <Text>Asthi</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="majja"
                    status={
                      checkedValues.dusya.includes('majja')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dusya', 'majja')}
                  />
                  <Text>Majja</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="shukra"
                    status={
                      checkedValues.dusya.includes('shukra')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('dusya', 'shukra')}
                  />
                  <Text>Shukra</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Srotas */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('srotas')}>
            <Text style={styles.text}>Srotas</Text>
            <Text style={styles.text}>
              {!collapsedSections.srotas ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.srotas && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pranavahasrotas"
                    status={
                      checkedValues.srotas.includes('pranavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'pranavahasrotas')
                    }
                  />
                  <Text>Pranavahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="udakavahasrotas"
                    status={
                      checkedValues.srotas.includes('udakavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'udakavahasrotas')
                    }
                  />
                  <Text>Udakavahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="annavahasrotas"
                    status={
                      checkedValues.srotas.includes('annavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'annavahasrotas')
                    }
                  />
                  <Text>Annavahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="rasavahasrotas"
                    status={
                      checkedValues.srotas.includes('rasavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'rasavahasrotas')
                    }
                  />
                  <Text>Rasavahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="raktavahasrotas"
                    status={
                      checkedValues.srotas.includes('raktavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'raktavahasrotas')
                    }
                  />
                  <Text>Raktavahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="mansavahasrotas"
                    status={
                      checkedValues.srotas.includes('mansavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'mansavahasrotas')
                    }
                  />
                  <Text>Mansavahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medovahasrotas"
                    status={
                      checkedValues.srotas.includes('medovahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'medovahasrotas')
                    }
                  />
                  <Text>Medovahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="asthivahasrotas"
                    status={
                      checkedValues.srotas.includes('asthivahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'asthivahasrotas')
                    }
                  />
                  <Text>Asthivahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="majjavahasrotas"
                    status={
                      checkedValues.srotas.includes('majjavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'majjavahasrotas')
                    }
                  />
                  <Text>Majjavahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sukravahasrotas"
                    status={
                      checkedValues.srotas.includes('sukravahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'sukravahasrotas')
                    }
                  />
                  <Text>Sukravahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="artavavahasrotas"
                    status={
                      checkedValues.srotas.includes('artavavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'artavavahasrotas')
                    }
                  />
                  <Text>Artavavahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="mutravahasrotas"
                    status={
                      checkedValues.srotas.includes('mutravahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'mutravahasrotas')
                    }
                  />
                  <Text>Mutravahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="purishavahasrotas mutravahasrotas"
                    status={
                      checkedValues.srotas.includes(
                        'purishavahasrotas mutravahasrotas',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'srotas',
                        'purishavahasrotas mutravahasrotas',
                      )
                    }
                  />
                  <Text>Purishavahasrotas Mutravahasrotas</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="swedavahasrotas"
                    status={
                      checkedValues.srotas.includes('swedavahasrotas')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotas', 'swedavahasrotas')
                    }
                  />
                  <Text>Swedavahasrotas</Text>
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
              <Text style={styles.label}>Purisha</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="purisha"
                    status={
                      checkedValues.mala.includes('purisha')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala', 'purisha')}
                  />
                  <Text>Purisha</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="mutra"
                    status={
                      checkedValues.mala.includes('mutra')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala', 'mutra')}
                  />
                  <Text>Mutra</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sweda"
                    status={
                      checkedValues.mala.includes('sweda')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('mala', 'sweda')}
                  />
                  <Text>Sweda</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* adhistana */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('adhistana')}>
            <Text style={styles.text}>Adhistana</Text>
            <Text style={styles.text}>
              {!collapsedSections.adhistana ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.adhistana && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="abhyantar"
                    status={
                      checkedValues.adhistana.includes('abhyantar')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('adhistana', 'abhyantar')
                    }
                  />
                  <Text>Abhyantar</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="madhyam"
                    status={
                      checkedValues.adhistana.includes('madhyam')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('adhistana', 'madhyam')}
                  />
                  <Text>Madhyam</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="bahya"
                    status={
                      checkedValues.adhistana.includes('bahya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('adhistana', 'bahya')}
                  />
                  <Text>Bahya</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Srotodusthi */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('srotodusthi')}>
            <Text style={styles.text}>srotodusthi</Text>
            <Text style={styles.text}>
              {!collapsedSections.srotodusthi ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.srotodusthi && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sanga"
                    status={
                      checkedValues.srotodusthi.includes('sanga')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('srotodusthi', 'sanga')}
                  />
                  <Text>Sanga</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="granthi"
                    status={
                      checkedValues.srotodusthi.includes('granthi')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotodusthi', 'granthi')
                    }
                  />
                  <Text>Granthi</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="vimargagaman"
                    status={
                      checkedValues.srotodusthi.includes('vimargagaman')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotodusthi', 'vimargagaman')
                    }
                  />
                  <Text>Vimargagaman</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="atipravritti"
                    status={
                      checkedValues.srotodusthi.includes('atipravritti')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('srotodusthi', 'atipravritti')
                    }
                  />
                  <Text>Atipravritti</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Sadhyasadhyatwa */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('sadhyasadhyatwa')}>
            <Text style={styles.text}>Sadhyasadhyatwa</Text>
            <Text style={styles.text}>
              {!collapsedSections.sadhyasadhyatwa ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.sadhyasadhyatwa && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sukhasadhya"
                    status={
                      checkedValues.sadhyasadhyatwa.includes('sukhasadhya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('sadhyasadhyatwa', 'sukhasadhya')
                    }
                  />
                  <Text>Sukhasadhya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="kastasadhya"
                    status={
                      checkedValues.sadhyasadhyatwa.includes('kastasadhya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('sadhyasadhyatwa', 'kastasadhya')
                    }
                  />
                  <Text>Kastasadhya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="yappya"
                    status={
                      checkedValues.sadhyasadhyatwa.includes('yappya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('sadhyasadhyatwa', 'yappya')
                    }
                  />
                  <Text>Yappya</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="asadhya"
                    status={
                      checkedValues.sadhyasadhyatwa.includes('asadhya')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('sadhyasadhyatwa', 'asadhya')
                    }
                  />
                  <Text>Asadhya</Text>
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
          onPress={() => navigation.navigate('SrotasPariksha')}
        />
        <Button
          title="Submit"
          color="#841584"
          style={styles.button}
          onPress={() => submitTreatmenthandler()}
        />
      </View>
    </>
  );
};

export default Samprapti;

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

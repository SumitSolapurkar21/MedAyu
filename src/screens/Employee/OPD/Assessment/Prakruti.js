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

const Prakruti = () => {
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
    body_weight_and_frame: [],
    skin: [],
    fingernails: [],
    hair: [],
    forehead: [],
    eyes: [],
    lips: [],
    thirst: [],
    excretions: [],
    voice_and_speech: [],
    working_style: [],
    mental_makeup: [],
    temperament: [],
    relationships: [],
    weather_preferences: [],
    money_matters: [],
    memory: [],
    sleep: [],
    vatta_pitta_kapha: [],
    dreams: [],
  });

  const [collapsedSections, setCollapsedSections] = useState({
    body_weight_and_frame: true,
    thirst: true,
    excretions: true,
    voice_and_speech: true,
    working_style: true,
    mental_makeup: true,
    temperament: true,
    skin: true,
    fingernails: true,
    hair: true,
    forehead: true,
    eyes: true,
    lips: true,
    relationships: true,
    weather_preferences: true,
    money_matters: true,
    memory: true,
    sleep: true,

    dreams: true,
  });

  //
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

  //
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
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: userData?.hospital_id,
      patient_id: waitingListData?.newpatient_id,
      mobilenumber: waitingListData?.mobilenumber,
      reception_id: userData?._id,
      appoint_id: waitingListData?.appoint_id || appoint_id,
      uhid: waitingListData?.uhid,
      api_type: 'Prakruti',
      opdprakrutihistoryarray: [checkedValues],
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            Alert.alert('Success', `${message}`);
            setCheckedValues({
              body_weight_and_frame: '',
              skin: '',
              fingernails: '',
              hair: '',
              forehead: '',
              eyes: '',
              lips: '',
              thirst: '',
              excretions: '',
              voice_and_speech: '',
              working_style: '',
              mental_makeup: '',
              temperament: '',
              relationships: '',
              weather_preferences: '',
              money_matters: '',
              memory: '',
              sleep: '',
              vatta_pitta_kapha: '',
              dreams: '',
            });
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
        <Appbar.Content title="Prakruti" titleStyle={{fontSize: 20}} />
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
        {/* body_weight_and_frame  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('body_weight_and_frame')}>
            <Text style={styles.text}>Body Weight and Frame</Text>
            <Text style={styles.text}>
              {!collapsedSections.body_weight_and_frame ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.body_weight_and_frame && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="lean"
                    status={
                      checkedValues.body_weight_and_frame.includes('lean')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('body_weight_and_frame', 'lean')
                    }
                  />
                  <Text>Lean</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="light weight"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        'light weight',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'light weight',
                      )
                    }
                  />
                  <Text>light weight</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value=" can not gain weight easily but can shed it rapidly"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        ' can not gain weight easily but can shed it rapidly',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        ' can not gain weight easily but can shed it rapidly',
                      )
                    }
                  />
                  <Text>
                    {' '}
                    can not gain weight easily but can shed it rapidly
                  </Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="VATA PRAKRUTI"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        'VATA PRAKRUTI',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'VATA PRAKRUTI',
                      )
                    }
                  />
                  <Text>VATA PRAKRUTI</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value=" well proportioned frame"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        ' well proportioned frame',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        ' well proportioned frame',
                      )
                    }
                  />
                  <Text> well proportioned frame</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="average weight"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        'average weight',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'average weight',
                      )
                    }
                  />
                  <Text>average weight</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value=" can gain as well as shed weight easily"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        ' can gain as well as shed weight easily',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        ' can gain as well as shed weight easily',
                      )
                    }
                  />
                  <Text> can gain as well as shed weight easily</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="PITTA PRAKRUTI"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        'PITTA PRAKRUTI',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'PITTA PRAKRUTI',
                      )
                    }
                  />
                  <Text>PITTA PRAKRUTI</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="board and robust frame"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        'board and robust frame',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'board and robust frame',
                      )
                    }
                  />
                  <Text>board and robust frame</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="heavy bodied"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        'heavy bodied',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'heavy bodied',
                      )
                    }
                  />
                  <Text>heavy bodied</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="can gain weight easily but can not shed it as fast"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        'can gain weight easily but can not shed it as fast',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'can gain weight easily but can not shed it as fast',
                      )
                    }
                  />
                  <Text>
                    can gain weight easily but can not shed it as fast
                  </Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="KAPHA PRAKRUTI"
                    status={
                      checkedValues.body_weight_and_frame.includes(
                        'KAPHA PRAKRUTI',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'KAPHA PRAKRUTI',
                      )
                    }
                  />
                  <Text>KAPHA PRAKRUTI</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* skin */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('skin')}>
            <Text style={styles.text}>Skin</Text>
            <Text style={styles.text}>
              {!collapsedSections.skin ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.skin && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dry,rough to touch"
                    status={
                      checkedValues.skin.includes('dry,rough to touch')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('skin', 'dry,rough to touch')
                    }
                  />
                  <Text>dry,rough to touch</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dull,darkish skin"
                    status={
                      checkedValues.skin.includes('dull,darkish skin')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('skin', 'dull,darkish skin')
                    }
                  />
                  <Text>dull,darkish skin</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="soft,oily,warm to touch"
                    status={
                      checkedValues.skin.includes('soft,oily,warm to touch')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('skin', 'soft,oily,warm to touch')
                    }
                  />
                  <Text>soft,oily,warm to touch</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="golwing skin ,wether fair or dark"
                    status={
                      checkedValues.skin.includes(
                        'golwing skin ,wether fair or dark',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'skin',
                        'golwing skin ,wether fair or dark',
                      )
                    }
                  />
                  <Text>golwing skin ,wether fair or dark</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="thick,supple,cool to touch"
                    status={
                      checkedValues.skin.includes('thick,supple,cool to touch')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('skin', 'thick,supple,cool to touch')
                    }
                  />
                  <Text>thick,supple,cool to touch</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pale skin, whitish complexion"
                    status={
                      checkedValues.skin.includes(
                        'pale skin, whitish complexion',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'skin',
                        'pale skin, whitish complexion',
                      )
                    }
                  />
                  <Text>pale skin, whitish complexion</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* fingernails  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('fingernails')}>
            <Text style={styles.text}>Fingernails</Text>
            <Text style={styles.text}>
              {!collapsedSections.fingernails ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.fingernails && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="rough and brittle"
                    status={
                      checkedValues.fingernails.includes('rough and brittle')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'rough and brittle')
                    }
                  />
                  <Text>rough and brittle</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="small"
                    status={
                      checkedValues.fingernails.includes('small')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('fingernails', 'small')}
                  />
                  <Text>small</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dull in colour"
                    status={
                      checkedValues.fingernails.includes('dull in colour')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'dull in colour')
                    }
                  />
                  <Text>dull in colour</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="tough"
                    status={
                      checkedValues.fingernails.includes('tough')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('fingernails', 'tough')}
                  />
                  <Text>tough</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium"
                    status={
                      checkedValues.fingernails.includes('medium')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'medium')
                    }
                  />
                  <Text>medium</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pinkish in colour"
                    status={
                      checkedValues.fingernails.includes('pinkish in colour')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'pinkish in colour')
                    }
                  />
                  <Text>pinkish in colour</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="smooth"
                    status={
                      checkedValues.fingernails.includes('smooth')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'smooth')
                    }
                  />
                  <Text>smooth</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="large and wide"
                    status={
                      checkedValues.fingernails.includes('large and wide')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'large and wide')
                    }
                  />
                  <Text>large and wide</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Whitish in color"
                    status={
                      checkedValues.fingernails.includes('Whitish in color')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'Whitish in color')
                    }
                  />
                  <Text>Whitish in color</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* hair   */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('hair')}>
            <Text style={styles.text}>Hair</Text>
            <Text style={styles.text}>
              {!collapsedSections.hair ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.hair && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dry and coarse"
                    status={
                      checkedValues.hair.includes('dry and coarse')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'dry and coarse')
                    }
                  />
                  <Text>dry and coarse</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="jwara"
                    status={
                      checkedValues.hair.includes('jwara')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('hair', 'jwara')}
                  />
                  <Text>Jwara</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="curly or difficult to manage , prone to split ends"
                    status={
                      checkedValues.hair.includes(
                        'curly or difficult to manage , prone to split ends',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hair',
                        'curly or difficult to manage , prone to split ends',
                      )
                    }
                  />
                  <Text>
                    curly or difficult to manage , prone to split ends
                  </Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dark brown to black"
                    status={
                      checkedValues.hair.includes('dark brown to black')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'dark brown to black')
                    }
                  />
                  <Text>dark brown to black</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="smooth and fine"
                    status={
                      checkedValues.hair.includes('smooth and fine')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'smooth and fine')
                    }
                  />
                  <Text>smooth and fine</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="spare,lending towards early greying or balding"
                    status={
                      checkedValues.hair.includes(
                        'spare,lending towards early greying or balding',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hair',
                        'spare,lending towards early greying or balding',
                      )
                    }
                  />
                  <Text>spare,lending towards early greying or balding</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="light to auburn"
                    status={
                      checkedValues.hair.includes('light to auburn')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'light to auburn')
                    }
                  />
                  <Text>light to auburn</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dark brown to black"
                    status={
                      checkedValues.hair.includes('dark brown to black')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'dark brown to black')
                    }
                  />
                  <Text>dark brown to black</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="silky and lustrous"
                    status={
                      checkedValues.hair.includes('silky and lustrous')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'silky and lustrous')
                    }
                  />
                  <Text>silky and lustrous</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="thick"
                    status={
                      checkedValues.hair.includes('thick')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('hair', 'thick')}
                  />
                  <Text>thick</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium to brown"
                    status={
                      checkedValues.hair.includes('medium to brown')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'medium to brown')
                    }
                  />
                  <Text>medium to brown</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* forehead */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('forehead')}>
            <Text style={styles.text}>Forehead</Text>
            <Text style={styles.text}>
              {!collapsedSections.forehead ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.forehead && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="small"
                    status={
                      checkedValues.forehead.includes('small')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('forehead', 'small')}
                  />
                  <Text>small</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium"
                    status={
                      checkedValues.forehead.includes('medium')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('forehead', 'medium')}
                  />
                  <Text>medium</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="large"
                    status={
                      checkedValues.forehead.includes('large')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('forehead', 'large')}
                  />
                  <Text>large</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* eyes */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('eyes')}>
            <Text style={styles.text}>Eyes</Text>
            <Text style={styles.text}>
              {!collapsedSections.eyes ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.eyes && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="small and active"
                    status={
                      checkedValues.eyes.includes('small and active')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'small and active')
                    }
                  />
                  <Text>small and active</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="brown to dark brown pupils"
                    status={
                      checkedValues.eyes.includes('brown to dark brown pupils')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'brown to dark brown pupils')
                    }
                  />
                  <Text>brown to dark brown pupils</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dull sclerae"
                    status={
                      checkedValues.eyes.includes('dull sclerae')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('eyes', 'dull sclerae')}
                  />
                  <Text>dull sclerae</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dry"
                    status={
                      checkedValues.eyes.includes('dry')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('eyes', 'dry')}
                  />
                  <Text>dry</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sharp and penetrating"
                    status={
                      checkedValues.eyes.includes('sharp and penetrating')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'sharp and penetrating')
                    }
                  />
                  <Text>sharp and penetrating</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="light pupils could be brown,green or gray"
                    status={
                      checkedValues.eyes.includes(
                        'light pupils could be brown,green or gray',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'light pupils could be brown,green or gray',
                      )
                    }
                  />
                  <Text>light pupils could be brown,green or gray</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="yellowish sclerae"
                    status={
                      checkedValues.eyes.includes('yellowish sclerae')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'yellowish sclerae')
                    }
                  />
                  <Text>yellowish sclerae</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium in size"
                    status={
                      checkedValues.eyes.includes('medium in size')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'medium in size')
                    }
                  />
                  <Text>medium in size</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="moist"
                    status={
                      checkedValues.eyes.includes('moist')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('eyes', 'moist')}
                  />
                  <Text>moist</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="large and attractive with thick lashes"
                    status={
                      checkedValues.eyes.includes(
                        'large and attractive with thick lashes',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'large and attractive with thick lashes',
                      )
                    }
                  />
                  <Text>large and attractive with thick lashes</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="bright blue or black pupils"
                    status={
                      checkedValues.eyes.includes('bright blue or black pupils')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'bright blue or black pupils',
                      )
                    }
                  />
                  <Text>bright blue or black pupils</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="clear white sclerae"
                    status={
                      checkedValues.eyes.includes('clear white sclerae')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'clear white sclerae')
                    }
                  />
                  <Text>dry</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* lips */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('lips')}>
            <Text style={styles.text}>Lips</Text>
            <Text style={styles.text}>
              {!collapsedSections.lips ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.lips && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="thin"
                    status={
                      checkedValues.lips.includes('thin')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('lips', 'thin')}
                  />
                  <Text>thin</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="darkish in colour"
                    status={
                      checkedValues.lips.includes('darkish in colour')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'darkish in colour')
                    }
                  />
                  <Text>darkish in colour</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium"
                    status={
                      checkedValues.lips.includes('medium')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('lips', 'medium')}
                  />
                  <Text>medium</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pinkish in colour"
                    status={
                      checkedValues.lips.includes('pinkish in colour')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'pinkish in colour')
                    }
                  />
                  <Text>pinkish in colour</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="large"
                    status={
                      checkedValues.lips.includes('large')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('lips', 'large')}
                  />
                  <Text>large</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pale in colur"
                    status={
                      checkedValues.lips.includes('pale in colur')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'pale in colur')
                    }
                  />
                  <Text>pale in colur</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* temperament  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('temperament')}>
            <Text style={styles.text}>Temperament</Text>
            <Text style={styles.text}>
              {!collapsedSections.temperament ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.temperament && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Insecure and impatient"
                    status={
                      checkedValues.temperament.includes(
                        'Insecure and impatient',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'Insecure and impatient',
                      )
                    }
                  />
                  <Text>Insecure and impatient</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="hardly ever content,always searching"
                    status={
                      checkedValues.temperament.includes(
                        'hardly ever content,always searching',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'hardly ever content,always searching',
                      )
                    }
                  />
                  <Text>hardly ever content,always searching</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="quick in emotional reactions and outbursts"
                    status={
                      checkedValues.temperament.includes(
                        'quick in emotional reactions and outbursts',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'quick in emotional reactions and outbursts',
                      )
                    }
                  />
                  <Text>quick in emotional reactions and outbursts</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="aggressive and impatient"
                    status={
                      checkedValues.temperament.includes(
                        'aggressive and impatient',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'aggressive and impatient',
                      )
                    }
                  />
                  <Text>aggressive and impatient</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dominating and cynical"
                    status={
                      checkedValues.temperament.includes(
                        'dominating and cynical',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'dominating and cynical',
                      )
                    }
                  />
                  <Text>dominating and cynical</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="intense emotions of like or dislike,love or hate"
                    status={
                      checkedValues.temperament.includes(
                        'intense emotions of like or dislike,love or hate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'intense emotions of like or dislike,love or hate',
                      )
                    }
                  />
                  <Text>intense emotions of like or dislike,love or hate</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="comfortable and patient"
                    status={
                      checkedValues.temperament.includes(
                        'comfortable and patient',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'comfortable and patient',
                      )
                    }
                  />
                  <Text>comfortable and patient</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="laid back"
                    status={
                      checkedValues.temperament.includes('laid back')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('temperament', 'laid back')
                    }
                  />
                  <Text>laid back</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="show to change"
                    status={
                      checkedValues.temperament.includes('show to change')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('temperament', 'show to change')
                    }
                  />
                  <Text>show to change</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="do not get angry,have calm endurence"
                    status={
                      checkedValues.temperament.includes(
                        'do not get angry,have calm endurence',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'do not get angry,have calm endurence',
                      )
                    }
                  />
                  <Text>do not get angry,have calm endurence</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* mental_makeup */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('mental_makeup')}>
            <Text style={styles.text}>Mental Makeup</Text>
            <Text style={styles.text}>
              {!collapsedSections.mental_makeup ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.mental_makeup && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="restless and easily distracted"
                    status={
                      checkedValues.mental_makeup.includes(
                        'restless and easily distracted',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'mental_makeup',
                        'restless and easily distracted',
                      )
                    }
                  />
                  <Text>restless and easily distracted</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="curious mind"
                    status={
                      checkedValues.mental_makeup.includes('curious mind')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mental_makeup', 'curious mind')
                    }
                  />
                  <Text>curious mind</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="passionate and generative"
                    status={
                      checkedValues.mental_makeup.includes(
                        'passionate and generative',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'mental_makeup',
                        'passionate and generative',
                      )
                    }
                  />
                  <Text>passionate and generative</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="assertive mind"
                    status={
                      checkedValues.mental_makeup.includes('assertive mind')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mental_makeup', 'assertive mind')
                    }
                  />
                  <Text>assertive mind</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="calm and stable"
                    status={
                      checkedValues.mental_makeup.includes('calm and stable')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mental_makeup', 'calm and stable')
                    }
                  />
                  <Text>calm and stable</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="logical mind"
                    status={
                      checkedValues.mental_makeup.includes('logical mind')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('mental_makeup', 'logical mind')
                    }
                  />
                  <Text>logical mind</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* working_style */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('working_style')}>
            <Text style={styles.text}>Working Style</Text>
            <Text style={styles.text}>
              {!collapsedSections.working_style ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.working_style && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="fast work"
                    status={
                      checkedValues.working_style.includes('fast work')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('working_style', 'fast work')
                    }
                  />
                  <Text>fast work</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="starts impulsively, but do not necessarily complete"
                    status={
                      checkedValues.working_style.includes(
                        'starts impulsively, but do not necessarily complete',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'starts impulsively, but do not necessarily complete',
                      )
                    }
                  />
                  <Text>
                    starts impulsively, but do not necessarily complet e
                  </Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Determined worker"
                    status={
                      checkedValues.working_style.includes('Determined worker')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('working_style', 'Determined worker')
                    }
                  />
                  <Text> Determined Worker</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="highly task and goal oriented"
                    status={
                      checkedValues.working_style.includes(
                        'highly task and goal oriented',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'highly task and goal oriented',
                      )
                    }
                  />
                  <Text>highly task and goal oriented</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="methodical worker"
                    status={
                      checkedValues.working_style.includes('methodical worker')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('working_style', 'methodical worker')
                    }
                  />
                  <Text>methodical worker</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="slow to being,but always see a task to completion"
                    status={
                      checkedValues.working_style.includes(
                        'slow to being,but always see a task to completion',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'slow to being,but always see a task to completion',
                      )
                    }
                  />
                  <Text>slow to being,but always see a task to completion</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* voice_and_speech */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('voice_and_speech')}>
            <Text style={styles.text}>Voice and Speech</Text>
            <Text style={styles.text}>
              {!collapsedSections.voice_and_speech ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.voice_and_speech && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="weak, hoarse or shrill voice"
                    status={
                      checkedValues.voice_and_speech.includes(
                        'weak, hoarse or shrill voice',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'voice_and_speech',
                        'weak, hoarse or shrill voice',
                      )
                    }
                  />
                  <Text>weak, hoarse or shrill voice</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="talk rapidly rather than clearly"
                    status={
                      checkedValues.voice_and_speech.includes(
                        'talk rapidly rather than clearly',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'voice_and_speech',
                        'talk rapidly rather than clearly',
                      )
                    }
                  />
                  <Text>talk rapidly rather than clearly</Text>
                </View>
                <Divider />
                <Text style={styles.label}>Pitta (fire and water)</Text>
                <View style={styles.body}>
                  <View style={styles.checkboxDiv}>
                    <Checkbox
                      value="commanding and sharp voice"
                      status={
                        checkedValues.voice_and_speech.includes(
                          'commanding and sharp voice',
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxToggle(
                          'voice_and_speech',
                          'commanding and sharp voice',
                        )
                      }
                    />
                    <Text>commanding and sharp voice</Text>
                  </View>
                  <View style={styles.checkboxDiv}>
                    <Checkbox
                      value="persuasive and motivating"
                      status={
                        checkedValues.voice_and_speech.includes(
                          'persuasive and motivating',
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxToggle(
                          'voice_and_speech',
                          'persuasive and motivating',
                        )
                      }
                    />
                    <Text>persuasive and motivating</Text>
                  </View>
                </View>
                <Divider />
                <Text style={styles.label}>Kapha (water and earth)</Text>
                <View style={styles.body}>
                  <View style={styles.checkboxDiv}>
                    <Checkbox
                      value="gentle and pleasing voice"
                      status={
                        checkedValues.voice_and_speech.includes(
                          'gentle and pleasing voice',
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxToggle(
                          'voice_and_speech',
                          'gentle and pleasing voice',
                        )
                      }
                    />
                    <Text>gentle and pleasing voice</Text>
                  </View>
                  <View style={styles.checkboxDiv}>
                    <Checkbox
                      value="talk less keep secrets within"
                      status={
                        checkedValues.voice_and_speech.includes(
                          'talk less keep secrets within',
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxToggle(
                          'voice_and_speech',
                          'talk less keep secrets within',
                        )
                      }
                    />
                    <Text>talk less keep secrets within</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        {/* excretions */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('excretions')}>
            <Text style={styles.text}>Excretions</Text>
            <Text style={styles.text}>
              {!collapsedSections.excretions ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.excretions && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="frequently constipated hard and gaseous stools"
                    status={
                      checkedValues.excretions.includes(
                        'frequently constipated hard and gaseous stools',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'frequently constipated hard and gaseous stools',
                      )
                    }
                  />
                  <Text>frequently constipated hard and gaseous stools</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="less sweating and arination"
                    status={
                      checkedValues.excretions.includes(
                        'less sweating and arination',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'less sweating and arination',
                      )
                    }
                  />
                  <Text>less sweating and arination</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="regular ,soft and loose often buring stools"
                    status={
                      checkedValues.excretions.includes(
                        'regular ,soft and loose often buring stools',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'regular ,soft and loose often buring stools',
                      )
                    }
                  />
                  <Text>regular ,soft and loose often buring stools</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="profuse sweating and urination,strong body odour"
                    status={
                      checkedValues.excretions.includes(
                        'profuse sweating and urination,strong body odour',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'profuse sweating and urination,strong body odour',
                      )
                    }
                  />
                  <Text>profuse sweating and urination,strong body odour</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="regular ,thick and oily stools"
                    status={
                      checkedValues.excretions.includes(
                        'regular ,thick and oily stools',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'regular ,thick and oily stools',
                      )
                    }
                  />
                  <Text>regular ,thick and oily stools</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="moderate sweating and urination"
                    status={
                      checkedValues.excretions.includes(
                        'moderate sweating and urination',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'moderate sweating and urination',
                      )
                    }
                  />
                  <Text>moderate sweating and urination</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* thirst */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('thirst')}>
            <Text style={styles.text}>Thirst</Text>
            <Text style={styles.text}>
              {!collapsedSections.thirst ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.thirst && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="variables"
                    status={
                      checkedValues.thirst.includes('variables')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('thirst', 'variables')}
                  />
                  <Text>variables</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="excessive"
                    status={
                      checkedValues.thirst.includes('excessive')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('thirst', 'excessive')}
                  />
                  <Text>excessive</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="scanty"
                    status={
                      checkedValues.thirst.includes('scanty')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleCheckboxToggle('thirst', 'scanty')}
                  />
                  <Text>scanty</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* relationships  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('relationships')}>
            <Text style={styles.text}>Relationships</Text>
            <Text style={styles.text}>
              {!collapsedSections.relationships ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.relationships && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="forgive and forget easily"
                    status={
                      checkedValues.relationships.includes(
                        'forgive and forget easily',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'forgive and forget easily',
                      )
                    }
                  />
                  <Text>forgive and forget easily</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="frequently in and out of love"
                    status={
                      checkedValues.relationships.includes(
                        'frequently in and out of love',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'frequently in and out of love',
                      )
                    }
                  />
                  <Text>frequently in and out of love</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="hold grudges for long"
                    status={
                      checkedValues.relationships.includes(
                        'hold grudges for long',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'hold grudges for long',
                      )
                    }
                  />
                  <Text>hold grudges for long</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="enter into intense relationship"
                    status={
                      checkedValues.relationships.includes(
                        'enter into intense relationship',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'enter into intense relationship',
                      )
                    }
                  />
                  <Text>enter into intense relationship</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="forgive,but never forget"
                    status={
                      checkedValues.relationships.includes(
                        'forgive,but never forget',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'forgive,but never forget',
                      )
                    }
                  />
                  <Text>forgive,but never forget</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="deeply attached in love and grounded in family tip"
                    status={
                      checkedValues.relationships.includes(
                        'deeply attached in love and grounded in family tip',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'deeply attached in love and grounded in family tip',
                      )
                    }
                  />
                  <Text>
                    deeply attached in love and grounded in family tip
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* weather_preferences */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('weather_preferences')}>
            <Text style={styles.text}>Weather Preferences</Text>
            <Text style={styles.text}>
              {!collapsedSections.weather_preferences ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.weather_preferences && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sunny, warm and rainy climate"
                    status={
                      checkedValues.weather_preferences.includes(
                        'sunny, warm and rainy climate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'weather_preferences',
                        'sunny, warm and rainy climate',
                      )
                    }
                  />
                  <Text>sunny, warm and rainy climate</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="cool, pleasant climate"
                    status={
                      checkedValues.weather_preferences.includes(
                        'cool, pleasant climate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'weather_preferences',
                        'cool, pleasant climate',
                      )
                    }
                  />
                  <Text>cool, pleasant climate</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="comfortable anywhere except in humid climate"
                    status={
                      checkedValues.weather_preferences.includes(
                        'comfortable anywhere except in humid climate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'weather_preferences',
                        'comfortable anywhere except in humid climate',
                      )
                    }
                  />
                  <Text>comfortable anywhere except in humid climate</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* money_matters */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('money_matters')}>
            <Text style={styles.text}>Money Matters</Text>
            <Text style={styles.text}>
              {!collapsedSections.money_matters ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.money_matters && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="spend easily,don#39;t care to earn or save much"
                    status={
                      checkedValues.money_matters.includes(
                        'spend easily,don#39;t care to earn or save much',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'money_matters',
                        'spend easily,don#39;t care to earn or save much',
                      )
                    }
                  />
                  <Text>spend easily,don#39;t care to earn or save much</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="plan well before spending"
                    status={
                      checkedValues.money_matters.includes(
                        'plan well before spending',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'money_matters',
                        'plan well before spending',
                      )
                    }
                  />
                  <Text>plan well before spending</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="do not spend easily ,like to accumulate"
                    status={
                      checkedValues.money_matters.includes(
                        'do not spend easily ,like to accumulate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'money_matters',
                        'do not spend easily ,like to accumulate',
                      )
                    }
                  />
                  <Text>do not spend easily ,like to accumulate</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* memory */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('memory')}>
            <Text style={styles.text}>Memory</Text>
            <Text style={styles.text}>
              {!collapsedSections.memory ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.memory && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="quick grasp hut poor retention"
                    status={
                      checkedValues.memory.includes(
                        'quick grasp hut poor retention',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'memory',
                        'quick grasp hut poor retention',
                      )
                    }
                  />
                  <Text>quick grasp hut poor retention</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="quick grasp and strong retention"
                    status={
                      checkedValues.memory.includes(
                        'quick grasp and strong retention',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'memory',
                        'quick grasp and strong retention',
                      )
                    }
                  />
                  <Text>quick grasp and strong retention</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="slow grap but strong retention"
                    status={
                      checkedValues.memory.includes(
                        'slow grap but strong retention',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'memory',
                        'slow grap but strong retention',
                      )
                    }
                  />
                  <Text>slow grap but strong retention</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* dreams */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('dreams')}>
            <Text style={styles.text}>Dreams</Text>
            <Text style={styles.text}>
              {!collapsedSections.dreams ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.dreams && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="anxious and many"
                    status={
                      checkedValues.dreams.includes('anxious and many')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('dreams', 'anxious and many')
                    }
                  />
                  <Text>anxious and many</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dreams relate to flying jumping climbing,runing an"
                    status={
                      checkedValues.dreams.includes(
                        'dreams relate to flying jumping climbing,runing an',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'dreams',
                        'dreams relate to flying jumping climbing,runing an',
                      )
                    }
                  />
                  <Text>
                    dreams relate to flying jumping climbing,runing an
                  </Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="moderate in number"
                    status={
                      checkedValues.dreams.includes('moderate in number')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('dreams', 'moderate in number')
                    }
                  />
                  <Text>moderate in number</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dreams relate to anger, conflict"
                    status={
                      checkedValues.dreams.includes(
                        'dreams relate to anger, conflict',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'dreams',
                        'dreams relate to anger, conflict',
                      )
                    }
                  />
                  <Text>dreams relate to anger, conflict</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="fewer in number"
                    status={
                      checkedValues.dreams.includes('fewer in number')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('dreams', 'fewer in number')
                    }
                  />
                  <Text>fewer in number</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dreams relate to romance,water pathos or empathy"
                    status={
                      checkedValues.dreams.includes(
                        'dreams relate to romance,water pathos or empathy',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'dreams',
                        'dreams relate to romance,water pathos or empathy',
                      )
                    }
                  />
                  <Text>dreams relate to romance,water pathos or empathy</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* sleep */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('sleep')}>
            <Text style={styles.text}>Sleep</Text>
            <Text style={styles.text}>
              {!collapsedSections.sleep ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.sleep && (
            <>
              <Text style={styles.label}>Vata (ether and air)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="less and disturbed"
                    status={
                      checkedValues.sleep.includes('less and disturbed')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('sleep', 'less and disturbed')
                    }
                  />
                  <Text>less and disturbed</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Pitta (fire and water)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="less but sound"
                    status={
                      checkedValues.sleep.includes('less but sound')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('sleep', 'less but sound')
                    }
                  />
                  <Text>less but sound</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Kapha (water and earth)</Text>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="deep and prolonged"
                    status={
                      checkedValues.sleep.includes('deep and prolonged')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('sleep', 'deep and prolonged')
                    }
                  />
                  <Text>deep and prolonged</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.containerDiv}>
          <Text style={styles.label}>Vatta Pitta Kapha</Text>
          <View style={styles.body}>
            <View style={styles.inputDiv}>
              <TextInput
                style={styles.input}
                onChangeText={text =>
                  handleCheckboxToggle('vatta_pitta_kapha', text)
                }
                value={checkedValues.vatta_pitta_kapha}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.divbutton}>
        <Button
          title="Submit"
          color="#841584"
          style={styles.button}
          onPress={() => submitTreatmenthandler()}
        />
        <Button
          title="Next / Skip"
          color="#841584"
          style={styles.button}
          onPress={() => navigation.navigate('AshtvidhPariksha')}
        />
      </View>
    </>
  );
};

export default Prakruti;

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
    marginBottom: 10,
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

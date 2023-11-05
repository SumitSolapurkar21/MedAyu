import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';
import api from '../../../api.json';
import axios from 'axios';
import medayuLogo from '../../images/medayu.jpeg';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome';
import ayu from '../../images/ayurveda.png';

const Edepartment = ({route}) => {
  const {userData} = useContext(UserContext);
  const {patient_id} = route.params;
  const navigation = useNavigation();
  const [departmentData, setDepartmentData] = useState([]);

  //   Get Department Data ...
  let reception_id = userData.data[0]._id;
  useEffect(() => {
    const departmentData = async () => {
      try {
        await axios
          .post(`${api.baseurl}/FetchReceptionDepartmentDeopdown`, {
            reception_id: userData.data[0]._id,
          })
          .then(res => {
            const dpt_data = res.data.data;
            //   console.log('dpt_data :', dpt_data);
            setDepartmentData(dpt_data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (reception_id !== '') departmentData();
  }, [reception_id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerHeader}>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>{userData.data[0].name}</Text>
        </View>
        <View style={styles.hrcontent}>
          <TouchableOpacity>
            <FontAwesome6 name="bell" size={22} color="#127359" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <FontAwesome6 name="user" size={22} color="#127359" />
          </TouchableOpacity>
        </View>
      </View>
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
            Select Department
          </Text>
        </View>
        <View style={styles.selection}>
          {/* Departments ... */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}>
            <View style={styles.contentItem}>
              {departmentData?.map(res => (
                <TouchableOpacity
                  key={res.depart_id}
                  style={styles.innercontentItem}
                  onPress={() =>
                    navigation.navigate('Edoctors', {
                      department_id: res.depart_id,
                      patient_id: patient_id,
                    })
                  }>
                  <Image
                    source={ayu}
                    alt="DepartImg"
                    style={[
                      styles.img,
                      {resizeMode: 'contain', width: 30, height: 30},
                    ]}
                  />
                  <Text style={styles.itemText}>{res.deptname}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Edepartment;

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
  content: {
    //     marginHorizontal: 6,
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
    alignContent: 'center',
  },
  innercontentItem: {
    borderColor: '#127359',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 8,
    width: '30%',
    height: 'auto',
    padding: 5,
  },
  itemText: {
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
});

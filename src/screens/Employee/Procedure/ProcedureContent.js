import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProcedureContent = () => {
  const navigation = useNavigation();
  const {opdServices, setSelectedCategory} = useContext(UserContext);
  const [_serviceCategoryArray, _setServiceCategoryArray] = useState([]);

  const _filterData = opdServices.filter(
    item => item.servicetype === 'PROCEDURE',
  );
  let procedure_id = _filterData[0]._id;
  let hospital_id = _filterData[0].hospital_id;

  useEffect(() => {
    const _fetchservicecategory = async () => {
      try {
        await axios
          .post(`${api.baseurl}/getservicecategoryacctype`, {
            hospital_id: hospital_id,
            servicetype_id: procedure_id,
          })
          .then(res => {
            console.log(res.data.data);
            _setServiceCategoryArray(res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (procedure_id !== '' || undefined || null) _fetchservicecategory();
  }, [procedure_id]);

  return (
    <View style={styles.container}>
      <View style={styles.cardSelection}>
        {_serviceCategoryArray.map(res => {
          return (
            <TouchableOpacity
              style={styles.selectDiv}
              key={res._id}
              onPress={() => {
                navigation.navigate('ProcedureServiceType', {
                  category_id: res._id,
                  categoryname: res.servicecategory,
                  servicetype_id: res.servicetype_id,
                });
                setSelectedCategory(res.servicecategory);
              }}>
              <Text style={styles.uName}>{res.servicecategory}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ProcedureContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cardSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 20,
  },
  selectDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
    borderRadius: 6,
    padding: 10,
    //     width: '47%',
  },
  uName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#127359',
    flexWrap: 'wrap',
  },
});

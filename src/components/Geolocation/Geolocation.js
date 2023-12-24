import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GeolocationData = () => {
  Geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords;
    //     21.136111846964404, 79.06050894386658
    axios
      //  .get(
      //    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBxa6ohOUNDbMfnuMlSgvkCyhwzAfmVuPE`,
      //  )
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=21.136111846964404,79.06050894386658 &key=AIzaSyBxa6ohOUNDbMfnuMlSgvkCyhwzAfmVuPE`,
      )
      .then(response => {
        const results = response.data.results;
        if (results.length > 0) {
          const address = results[0].formatted_address;
        }
      })
      .catch(error => {
        console.error('Error fetching location name:', error);
      });
  });

  return (
    <View>
      <Text>Geolocation</Text>
    </View>
  );
};

export default GeolocationData;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GeolocationData = () => {
  Geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords;
    // console.log(`lat : ${latitude} , lng : ${longitude}`);
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
        // console.log('place result : ', results);
        if (results.length > 0) {
          const address = results[0].formatted_address;
          // console.log('address : ', address);
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

// export default GeolocationData;

// const styles = StyleSheet.create({});
// // var apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBxa6ohOUNDbMfnuMlSgvkCyhwzAfmVuPE`;
// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';

// const GeolocationData = () => {
//   const [locationName, setLocationName] = useState(null);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   Geolocation.getCurrentPosition(position => {
//     const {latitude, longitude} = position.coords;
//     console.log(`lat : ${latitude} , lng : ${longitude}`);
//   });
//   //   useEffect(() => {
//   //     Geolocation.getCurrentPosition(
//   //       position => {
//   //         const {latitude, longitude} = position.coords;
//   //         setLatitude(latitude);
//   //         setLongitude(longitude);

//   //         // Fetch location name using Google Geocoding API
//   //         axios
//   //           .get(
//   //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBxa6ohOUNDbMfnuMlSgvkCyhwzAfmVuPE`,
//   //           )
//   //           .then(response => {
//   //             const results = response.data.results;
//   //             if (results.length > 0) {
//   //               const address = results[0].formatted_address;
//   //               setLocationName(address);
//   //             }
//   //           })
//   //           .catch(error => {
//   //             console.error('Error fetching location name:', error);
//   //           });
//   //       },
//   //       error => {
//   //         console.error('Error getting location:', error);
//   //       },
//   //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//   //     );
//   //   }, []);

//   return (
//     <View>
//       <Text>Geolocation</Text>
//       {/* {locationName && <Text>Location Name: {locationName}</Text>} */}
//     </View>
//   );
// };

export default GeolocationData;

import {View, Text, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import componentStyle from '../../css/GlobalCss';

const OnboardingItems = ({item}) => {
  const {width} = useWindowDimensions;
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item.image}
        style={{height: '75%', width, resizeMode: 'contain'}}
      />
      <View style={{flex: 0.3}}>
        <Text style={componentStyle.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItems;

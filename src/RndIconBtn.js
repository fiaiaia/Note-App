import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      name = {antIconName}
      size = {size || 30}
      color = {color || '#FFF8EA'}
      style = {[
        styles.icon, { ...style }
      ]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#815B5B',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});

export default RoundIconBtn;

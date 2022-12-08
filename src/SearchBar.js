import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View 
      style = {[
        styles.container, { ...containerStyle }
      ]}
    >
      <TextInput
        value = {value}
        onChangeText = {onChangeText}
        style = {styles.searchBar}
        placeholder = 'search here...'
      />
      {value ? (
        <AntDesign
          name = 'close'
          size = {20}
          color = {'#815B5B'}
          onPress = {onClear}
          style = {styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: '#9E7676',
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 16,
    color: '#9E7676',
    fontStyle: 'italic'
  },
  container: {
    justifyContent: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default SearchBar;

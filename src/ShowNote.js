import React from 'react';
import {StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';

const ShowNote = ({ item, onPress }) => {
  const { title, content } = item;

  return (
    <TouchableOpacity 
      onPress = {onPress} 
      style = {styles.container}
    >

      <Text 
        style = {
          styles.title
        } 
        numberOfLines = {2}
      >
        {title}
      </Text>
      <Text 
        style = {
          styles.content
        }
        numberOfLines = {3}
      >
        {content}
      </Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE8DA',
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color:'#815B5B',
    padding: 3
  },
  content: {
    padding: 5,
    fontSize: 12,
    color:'#9E7676',
  },
});

export default ShowNote;

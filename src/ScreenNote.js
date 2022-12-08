import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {View, FlatList, Text, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { useNotes } from './NoteProvider';
import InputNote from './InputNote';
import NotFound from './NotFound';
import SearchBar from './SearchBar';
import RndIconBtn from './RndIconBtn';
import ShowNote from './ShowNote'

const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const ScreenNote = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const { notes, setNotes, findNotes } = useNotes();  

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, content) => {
    const note = { id: Date.now(), title, content, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  
    const openNote = note => {
    navigation.navigate('DetailNote', { note });
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };

  const logOut = () => {
    navigation.navigate('Logout');
  };

  return (
    <>
      <StatusBar 
        barStyle = 'dark-content' 
        backgroundColor = {'#FFF8EA'} 
      />
      <TouchableWithoutFeedback 
        onPress={Keyboard.dismiss}
      >
        <View 
          style = {
            styles.container
          }
        >
          <Text 
            style = {
              styles.header
            }
          >
          Note List
          </Text>
            {notes.length ? (
              <SearchBar
                value = {searchQuery}
                onChangeText = {handleOnSearchInput}
                containerStyle = {{ 
                  marginVertical: 15 
                }}
                onClear = {handleOnClear}
              />
            ) : null}

            {resultNotFound ? (
              <NotFound />
            ) : (
              <FlatList
                data = {reverseNotes}
                numColumns = {2}
                columnWrapperStyle = {{
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}
                keyExtractor = {item => item.id.toString()}
                renderItem = {({ item }) => (
                  <ShowNote 
                  onPress = {() => openNote(item)} 
                  item = {item} 
                />
                )}
              />
            )}

            {!notes.length ? (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.emptyHeaderContainer,
                ]}
              >
                <Text style={styles.emptyHeader}>Add Notes</Text>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      <RndIconBtn
        onPress={() => setModalVisible(true)}
        antIconName = 'plus'
        style = {styles.addBtn}
      />
      <RndIconBtn
        onPress={() => logOut(true)}
        antIconName = 'logout'
        size = {15}
        style = {styles.lgtBtn}
      />
      <InputNote
        visible = {modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit = {handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#815B5B',
    marginTop: 20,
    marginLeft: 10
  },
  container: {
    backgroundColor: '#FFFFF7',
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    zIndex: 1,
  },
  lgtBtn: {
    position: 'absolute',
    right: 20,
    top: 15,
    zIndex: 1,
    backgroundColor: '#FFE8DA',
    color: '#815B5B'
  },
});

export default ScreenNote;

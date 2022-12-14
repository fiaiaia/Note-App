import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from './NoteProvider';
import RndIconBtn from './RndIconBtn';
import InputNote from './InputNote';

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const DetailNote = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure?',
      'Your note will deleted permanently!',
      [
        {
          text: 'DELETE',
          onPress: deleteNote,
        },
        {
          text: 'NO',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, content, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.content = content;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 20 }]}>
        <Text 
          style={styles.time}
        >
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
        <Text 
          style={styles.title}
        >
          {note.title}
        </Text>
        <Text 
          style={styles.content}
        >
          {note.content}
        </Text>
      </ScrollView>
      <View 
        style={styles.btnContainer}
      >
        <RndIconBtn
          antIconName="delete"
          style={{
            backgroundColor: 'red',
            marginBottom: 15,
          }}
          onPress={displayDeleteAlert}
        />
        <RndIconBtn 
          antIconName="edit" 
          onPress={openEditModal} 
        />
      </View>
      <InputNote
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFF7',
  },
  title: {
    fontSize: 30,
    color: '#815B5B',
    fontWeight: 'bold',
    padding: 10,
  },
  content: {
    fontSize: 20,
    opacity: 0.6,
    padding: 10,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
    padding: 5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default DetailNote;

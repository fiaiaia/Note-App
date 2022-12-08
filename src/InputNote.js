import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';

import RndIconBtn from './RndIconBtn';

const InputNote = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'content') setContent(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !content.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, content, Date.now());
    } else {
      onSubmit(title, content);
      setTitle('');
      setContent('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setContent('');
    }
    onClose();
  };

  return (
    <>
      <StatusBar 
        hidden 
      />
      <Modal 
        visible={visible} 
        animationType="fade"
      >
        <View 
          style={styles.container}
        >
          <TextInput
            value={title}
            onChangeText={(text) => handleOnChangeText(text, 'title')}
            placeholder="Title"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={content}
            multiline
            placeholder="Isi Catatan"
            style={[styles.input, styles.content]}
            onChangeText={(text) => handleOnChangeText(text, 'content')}
          />
          <View 
            style={styles.btnContainer}
          >
            <RndIconBtn 
              size={15} 
              antIconName="check" 
              onPress={handleSubmit} 
            />

            {title.trim() || content.trim() ? (
              <RndIconBtn
                size={15}
                style={{
                  marginLeft: 15,
                }}
                antIconName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback 
          onPress={handleModalClose}
        >
          <View 
            style={[styles.modalBG, StyleSheet.absoluteFillObject]} 
          />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginTop: 50,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#9E7676',
    fontSize: 20,
    color: '#9E7676',
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 20,
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
});

export default InputNote;

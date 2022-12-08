import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PropsType = {
  navigation: StackNavigationProp<NavigationType, 'Login'>,
};

export default (props: PropsType) => {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (email.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        var user = {
          Email: 'any_key_here',
          Password: 'any_key_here',
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        navigation.navigate('ScreenNote');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View 
      style={styles.container}
    >
      <Image 
        style={styles.image} 
        source={require('../assets/logoku.png')} 
      />
      <StatusBar 
        style="auto" 
      />
      <View 
        style={styles.inputView}
      >
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#9E7676"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View 
        style={styles.inputView}
      >
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#9E7676"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity 
        style={styles.loginBtn} 
        onPress={login}
      >
        <Text 
          style={styles.loginText}
        >
          LOGIN
      </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text 
          style={styles.forgotBtn}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: '25%',
  },

  inputView: {
    backgroundColor: '#FFF8EA',
    borderRadius: 10,
    width: 250,
    height: 45,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9E7676',
  },

  TextInput: {
    height: 45,
    width: 200,
    flex: 1,
    padding: 10,
  },

  loginBtn: {
    width: 120,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 70,
    backgroundColor: '#815B5B',
  },

  loginText: {
    color: '#FFF8EA',
    fontWeight: 'bold',
  },

  forgotBtn: {
    height: 30,
    marginTop: 20,
    color: '#815B5B',
    fontStyle: 'italic',
  },
});

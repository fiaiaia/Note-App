import React from "react";
import {Text, View, TouchableOpacity} from "react-native";


const Logout = ({ navigation }) => {
  return (
    <View
      style = {{
        flex: 1,
        backgroundColor: '#FFFFF7',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style = {{
          height: 150,
          width: 250,
          backgroundColor: '#FFF8EA',
          borderRadius: 10,
          padding: 10,
          flexDirection: 'column'
        }}
      >
        <Text
          style = {{
            marginTop: 20,
            textAlign: 'center'
          }}
        >
          Apakah anda yakin ingin keluar?
        </Text>

        <View
        style = {{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 50,
        }}
      > 
        <TouchableOpacity
          onPress = {() => navigation.navigate('ScreenNote')}
        >
          <Text
            style = {{
              fontWeight: 'bold',
              color: '#815B5B',
            }}
          >
          NO
          </Text>
        </TouchableOpacity> 
        <TouchableOpacity
          onPress = {() => navigation.navigate('Login')}
        >
          <Text
            style = {{
              fontWeight: 'bold',
              color: '#815B5B',
            }}
          >
          YES
          </Text>
        </TouchableOpacity> 
      </View>
      </View>
    </View>
  );
}

export default Logout;

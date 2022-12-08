import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Click Here"
          onPress={() => {
            this.popupDialog.show();
          }}
        />

        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}

          dialogStyle={{
            backgroundColor: '#F0ECE3',
            height: 400,
            width: 300,
            border: 10,
            padding: 10,
          }}

          overlayBackgroundColor="#fff"
          dismissOnTouchOutside={true}>

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
          onPress = {() => navigation.navigate('Home')}
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
        </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});



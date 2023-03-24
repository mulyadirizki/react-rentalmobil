import React, { Component } from 'react';
import { StyleSheet, AppRegistry, View } from 'react-native';
import { WebView } from 'react-native-webview';
class App extends Component {
   render() {
      return (
         <View style = {styles.container}>
          <WebView
          source = {{ uri:
          'http://192.168.125.16:8000/' }}
          />
       </View>
      )
   }
}
export default App
AppRegistry.registerComponent('App', () => App)

const styles = StyleSheet.create({
   container: {
      height: 900,
   }
})
import react, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewExample = () => {
    return (
       <View style = {styles.container}>
          <WebView
          source = {{ uri:
          'http://192.168.125.16:8000/' }}
          />
       </View>
    )
 }
 export default WebViewExample;
 
 const styles = StyleSheet.create({
    container: {
       height: 800,
    }
 })
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    saveToken =  async(value) => {
        try{
            await AsyncStorage.setItem('@tokenLogin', value)
        }catch(err) {
            console.log(err)
        }
    }

    login = async() => {
        fetch('http://192.168.130.16:8000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        }).then((response) => response.json())
        .then((response) => {
            if(response.success === false) {
                alert(response.message);
            } else if(response.success === true) {
                alert(response.message)
                this.saveToken(response.token);
                navigation.replace('Home')
            } else {
                alert('Connection failed');
            }
        })
        .catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
    }
    return(
        <View style = {styles.container}>
            <Text style = {styles.loginText}>Login</Text>
            <View style = {styles.wrapperInput}>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.login()
                    }>
                    <Text style = {styles.submitButtonText}> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 20}} onPress={() => navigation.navigate('Register')}>
                    <Text>Belum punya akun ? Daftar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 24,
        fontWeight: 700
    },
    input: {
        margin: 15,
        height: 40,
        width: 300,
        borderColor: '#7a42f4',
        borderWidth: 1,
        borderRadius: 20
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        width: 300,
        height: 40,
        borderRadius: 20
    },
    submitButtonText:{
        color: 'white',
        textAlign: 'center'
    }
})
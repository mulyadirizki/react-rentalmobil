import react, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    login = (email, pass) => {
        fetch('http://192.168.125.16:8000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'password': pass
            })
        }).then((response) => response.json())
        .then((response) => {
            if(response.success === false) {
                alert(response.message);
            } else if(response.success === true) {
                alert(response.message);
                Actions.home();
            } else {
                alert('Connection failed');
            }
        })
        .catch((error)=>{
            console.log("Api call error");
            Alert.alert(error.message);
        });
    }
    render() {
        const goToRegister = () => {
            Actions.register()
        }
        return (
            <View style = {styles.container}>
                <Text style = {styles.login}>Login</Text>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword}/>

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.login(this.state.email, this.state.password)
                    }>
                    <Text style = {styles.submitButtonText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {goToRegister}>
                    <Text>Belum punya akun ? Daftar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    login: {
        textAlign: 'center',
        fontSize: 20
    },
    input: {
        margin: 15,
        height: 40,
        width: 250,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        width: 250,
        height: 40,
    },
    submitButtonText:{
        color: 'white',
        textAlign: 'center'
    }
})
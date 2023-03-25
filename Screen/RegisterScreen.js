import react, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'

export default function LoginScreen({navigation}) {
    state = {
        nik: '',
        nama: '',
        tgl_lahir: '',
        j_kel: '',
        no_hp: '',
        pekerjaan: '',
        alamat: '',
        email: '',
        password: ''
    }
    handleNik = (text) => {
        this.setState({ nik: text })
    }
    handleNama = (text) => {
        this.setState({ nama: text })
    }
    handleTglLahir = (text) => {
        this.setState({ tgl_lahir: text })
    }
    handleJkel = (text) => {
        this.setState({ j_kel: text })
    }
    handleNohp = (text) => {
        this.setState({ no_hp: text })
    }
    handlePekerjaan = (text) => {
        this.setState({ pekerjaan: text })
    }
    handleAlamat = (text) => {
        this.setState({ alamat: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    login = (nik, nama, tgl_lahir, j_kel, no_hp, pekerjaan, alamat, email, pass) => {
        fetch('http://192.168.125.16:8000/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'nik': nik,
                'nama': nama,
                'tgl_lahir': tgl_lahir,
                'j_kel': j_kel,
                'no_hp': no_hp,
                'pekerjaan': pekerjaan,
                'alamat': alamat,
                'email': email,
                'password': pass
            })
        }).then((response) => response.json())
        .then((response) => {
            if(response.success === false) {
                alert(response.message);
            } else if(response.success === true) {
                alert(response.message);
                Actions.login();
            } else {
                alert('Connection failed');
            }
        })
        .catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        })
    }
    return (
        <View style = {styles.container}>
            <ScrollView>
                <Text style = {styles.login}>Daftar</Text>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "NIK"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleNik}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Nama Lengkap"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleNama}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Tgl Lahir"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleTglLahir}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Jenis Kelamin"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleJkel}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "No HP"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleNohp}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Pekerjaan"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePekerjaan}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Alamat"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = {this.handleAlamat}/>

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
                        () => this.login(
                            this.state.nik,
                            this.state.nama,
                            this.state.tgl_lahir,
                            this.state.j_kel,
                            this.state.no_hp,
                            this.state.pekerjaan,
                            this.state.alamat,
                            this.state.email,
                            this.state.password
                        )
                    }>
                    <Text style = {styles.submitButtonText}> Daftar </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text>Sudah punya akun ? Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    login: {
        textAlign: 'center',
        fontSize: 20,
        alignItems:'center',
        justifyContent :'center'
    },
    input: {
        margin: 15,
        height: 40,
        width: 300,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'white',
        textAlign: 'center'
    }
})
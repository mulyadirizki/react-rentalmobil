import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Button, ThemeProvider, Text, Card, Input } from '@rneui/themed';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown'

export default function DetailMobil({route, navigation}) {
    const [open, setOpen] = useState(false)
    const [tgl_rental, setDate] = useState(new Date())
    const id_mobil = route.params.data.id_mobil;
    const [tgl_kembali, setTglKembali] = useState(new Date())
    const [cara_bayar, setCaraBayar] = useState();

    RentalHandle = async() => {
        const token_key = await AsyncStorage.getItem('@tokenLogin');
        Moment.locale('en')
        const tgl_rental1 = Moment(tgl_rental).format('yyyy-MM-DD')
        const tgl_kembali1 = Moment(tgl_kembali).format('yyyy-MM-DD')
        fetch('http://192.168.125.16:8000/api/rental/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token_key
            },
            body: JSON.stringify({
                'id_mobil': id_mobil,
                'tgl_rental': tgl_rental1,
                'tgl_kembali': tgl_kembali1,
                'cara_bayar': cara_bayar
            })
        }).then((response) => response.json())
        .then((response) => {
            if (response.success == true) {
                if (cara_bayar === '1'){
                    alert('Confirmasi rental berhasil dilakukan, silahkan selesaikan pembayaran')
                    navigation.navigate('ListRental')
                } else if (cara_bayar === '2') {
                    alert('Confirmasi rental berhasil dilakukan, silahkan melakukan pembayaran saat mengambil mobil')
                    navigation.navigate('ListRental')
                } else {
                    alert(response.message)
                }
            } else {
                alert(response.message)
            }
        })
        .catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        })
    }
    return (
        <ScrollView>
            <View style = {styles.container}>
                <ThemeProvider>
                    <Button title="Rental Mobil" />
                </ThemeProvider>

                <Card>
                <Card.Divider />
                <Card.Image
                    style={{padding: 0}}
                    source={{uri:'https://www.semisena.com/wp-content/uploads/2020/02/Toyota-Avanza-F.jpg'}}
                />
                <Text style = {styles.title}>{route.params.data.merk_mobil}  - {route.params.data.nama_mobil}</Text>
                <Text style = {styles.thMobil}>Tahun {route.params.data.th_mobil} | {route.params.data.no_pol}</Text>
                <Text style = {styles.hargaSewa}>Rp. {route.params.data.harga_sewa} /Hari</Text>
                <Text>Mobil {route.params.data.nama_mobil} Tahun {route.params.data.th_mobil} Warna {route.params.data.warna}. Harga sewa Rp.{route.params.data.harga_sewa}/Hari lepas kunci, untuk pengembalian lewat dari tanggal kembali yang telah disepakati akan dikenakan denda sebanya Rp. {route.params.data.denda_sewa}/Hari s </Text>
                <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold'}}>Tgl Rental :</Text>
                <Button title="Open Kalender" onPress={() => setOpen(true)} />
                <DatePicker
                    modal
                    open={open}
                    date={tgl_rental}
                    mode="date"
                    onConfirm={(tgl_rental) => {
                    setOpen(false)
                    setDate(tgl_rental)
                    }}
                    onCancel={() => {
                    setOpen(false)
                    }}
                />
                <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold'}}>Tgl Kembali :</Text>
                <Button title="Open Kalender" onPress={() => setOpen(true)} />
                <DatePicker
                    modal
                    open={open}
                    date={tgl_kembali}
                    mode="date"
                    onConfirm={(tgl_kembali) => {
                    setOpen(false)
                    setTglKembali(tgl_kembali)
                    }}
                    onCancel={() => {
                    setOpen(false)
                    }}
                />
                <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold'}}>Cara Pembayaran :</Text>
                <Input
                    placeholder='1. Transfer, 2. Tunai'
                    autoCapitalize = "none"
                    value={cara_bayar}
                    onChangeText={(value) => setCaraBayar(value)}
                />
                <Button onPress = {
                        () => this.RentalHandle()
                    }
                        buttonStyle={{
                        borderRadius: 20,
                        backgroundColor: '#D10024',
                        marginTop: 20,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title="Confirmasi Rental"
                />
                </Card>
            </View>
        </ScrollView>
        // <View style = {styles.container}>
        //     <ThemeProvider>
        //        <Button title="Rental Mobil" />
        //     </ThemeProvider>

        //     <View style = {styles.content}>
        //         <View style = {styles.cardContent}>
        //             <Image
        //             style={styles.image}
        //             resizeMode="cover"
        //             source={{uri:'https://img.cintamobil.com/2021/01/12/E7uYC7dI/mobil-toyota-bc15.png'}}
        //             />
        //             <Text style={styles.name}>{route.params.data.nama_mobil}</Text>
        //             <TouchableOpacity>
        //                 <Text>{route.params.data.nama_mobil}</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        color: '#2B2D42',
        fontWeight: 700,
        marginTop: 10,
        textTransform: 'uppercase',
        fontSize: 18
    },
    thMobil: {
        color: '#2B2D42',
        marginTop: 5,
        fontWeight: 500,
        fontFamily: 'Montserrat'
    },
    hargaSewa: {
        fontSize: 24,
        marginTop: 5,
        color: '#d10024',
        fontWeight: 700,
        marginBottom: 10
    }
})
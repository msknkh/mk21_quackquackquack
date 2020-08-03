import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Container, Text } from 'native-base';
import * as Speech from 'expo-speech';
import i18n from 'i18n-js';


class HomeScreen extends React.Component {
    render() {
        return (
            <Container>
                <View style={styles.content} >
                    <View style={{ flex: 1 }}>
                        <View style={[styles.row, { justifyContent: 'space-around' }]}>

                            <ImageBackground source={require('../assets/homeBG.png')} style={styles.imgBack}>
                              <Text style={styles.headText} onPress = {()=> {
                                Speech.speak(i18n.t("Welcome to the Jan Dhan Darshak App"));
                              }}>{i18n.t("Welcome to the Jan Dhan Darshak App")}</Text>
                            </ImageBackground>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: '5%' }}>
                        <TouchableOpacity onPress={() => {Speech.speak(i18n.t("Near Me")); this.props.navigation.navigate('NearbyPlaces')}} style={[styles.button, { backgroundColor: '#479689' }]}>
                          <Image style={styles.img} source={require('../assets/nearmeB1.png')} />
                          <Text style={styles.buttonText}>{i18n.t("Near Me")}</Text>
                          <Image style={styles.img} source={require('../assets/nearmeB2.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {Speech.speak(i18n.t("How it works?"));this.props.navigation.navigate('HowItWorks')}} style={[styles.button, { backgroundColor: '#9f50b0' }]}>
                          <Image style={styles.img} source={require('../assets/howItWorksB1.png')} />
                          <Text style={styles.buttonText}>{i18n.t("How it works?")}</Text>
                          <Image style={styles.img} source={require('../assets/howItWorksB2.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {Speech.speak(i18n.t("Policy Library"));this.props.navigation.navigate('MoneyMitra')}} style={[styles.button, { backgroundColor: '#2295f3' }]}>
                          <Image style={styles.img} source={require('../assets/policyLibraryB1.png')} />
                          <Text style={styles.buttonText}>{i18n.t("Policy Library")}</Text>
                          <Image style={styles.img} source={require('../assets/policyLibraryB2.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        borderRadius: 10
    },
    buttonText: {
        flex:2,
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headText: {
        width: '55%',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft:'42%',
        marginBottom: '45%'
    },
    img: {
        flex:1,
        marginLeft: 5,
        marginRight: 7,
        resizeMode: 'stretch',
        height: '80%',
        width: '80%'
    },
    imgBack: {
      flex:1,
      marginTop: 10,
      resizeMode: 'contain',
      justifyContent: 'center',
      height: '100%',
      width: '130%'
    }
})

export default HomeScreen;

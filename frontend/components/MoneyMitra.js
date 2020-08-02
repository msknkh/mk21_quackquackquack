import React from 'react';
import { StyleSheet, Icon, View, TouchableOpacity, Image, Modal, AppState } from 'react-native';
import { Container, Text } from 'native-base';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';

class MoneyMitra extends React.Component{

    getNearbyPlaces = async (ScreenName) => {
        this.props.navigation.navigate(ScreenName)
    }

    render() {
        return (
            <Container>

                <View style={styles.content} >
                    <View style={{ flex: 1 }}>
                        <View style={[styles.row, { justifyContent: 'space-around' }]}>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Image style={styles.img} source={require('../assets/moneyMitra.png')} />
                            </View>
                            <View style={{ flex: 7.4, justifyContent: 'center' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.headText, { color: '#000', marginBottom: '1%' }]}>What type of schemes are you be interested in?</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 4.5, marginBottom:'2%' }}>

                            <TouchableOpacity onPress={() => this.getNearbyPlaces('Loan')} style={[styles.button, { backgroundColor: '#479689' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                <Image style={{
                                    marginLeft: '3%',
                                    flex: 2,
                                    height: '100%',
                                    width: '100%',

                                }} source={require('../assets/nearbyATM.png')} />
                                <View style = {styles.buttonTextContainer}>
                                  <Text style={styles.buttonText}></Text>
                                  <Text style={styles.buttonText}>Loan Schemes</Text>
                                  <Text style={styles.buttonText}></Text>
                                </View>
                              </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.getNearbyPlaces('Insurance')} style={[styles.button, { backgroundColor: '#9f50b0' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',

                                  }} source={require('../assets/nearbyBanks.png')} />
                                  <View style = {styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>Insurance Schemes</Text>
                                    <Text style={styles.buttonText}></Text>
                                  </View>
                              </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.getNearbyPlaces('Pension')} style={[styles.button, { backgroundColor: '#2295f3' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',

                                  }} source={require('../assets/nearbyBankMitra.png')} />
                                  <View style = {styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>Pension Schemes</Text>
                                    <Text style={styles.buttonText}></Text>
                                  </View>
                              </View>
                            </TouchableOpacity>

                            <View style = {styles.bottomField}>
                              <Text style = {styles.bottomFieldText}> For more Policies please reach out to your nearest Bank or Post Office </Text>

                              <View style = {styles.bottomButtonField}>
                                <TouchableOpacity onPress={() => this.getNearbyPlaces('Banks')} style={[styles.button, { backgroundColor: '#302ea2ff' }]}>
                                  <View style={{flex:1}}>
                                      <Image style={{
                                          flex: 2.4,
                                          height: '100%',
                                          width: '100%',
                                          marginTop: '-5%',
                                          resizeMode: 'contain'
                                      }} source={require('../assets/nearbyBanks.png')} />
                                      <View style = {styles.buttonTextContainer, {flex: 1, marginTop: '0%'}}>
                                        <Text style={styles.buttonText}>Bank Branches</Text>
                                      </View>
                                  </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.getNearbyPlaces('PostOffices')} style={[styles.button, { backgroundColor: '#ffa726ff' }]}>
                                  <View style={{flex:1}}>
                                      <Image style={{
                                          flex: 2.4,
                                          height: '100%',
                                          width: '100%',
                                          marginTop: '-5%',
                                          resizeMode: 'contain'
                                      }} source={require('../assets/nearbyPO.png')} />
                                      <View style = {styles.buttonTextContainer, {flex: 1, marginTop: '0%'}}>
                                        <Text style={styles.buttonText}>Post Offices</Text>
                                      </View>
                                  </View>
                                </TouchableOpacity>

                              </View>
                            </View>


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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000aa'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        flex: 1,
        backgroundColor: '#302ea2',
        padding: 10,
        margin: '1.8%',
        borderRadius: 10,
    },buttonText: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonTextContainer: {
        justifyContent: 'center',
        flex: 5.23,
    },
    headText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    img: {
        marginLeft: '1.3%',
        resizeMode: 'stretch',
        height: '80%',
        width: '100%'
    },
    bottomField:{
        margin: '2.3%',
        padding: '2%',
        flex: 2,
        borderRadius: 10,
        justifyContent: 'center'
    },
    bottomFieldText:{
      flex: 1,
      color: "#000",
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    bottomButtonField:{
      flex: 2,
      flexDirection: 'row',
      borderRadius: 10,
      backgroundColor: 'white',
      justifyContent: 'center',
      margin: '-5%',
      height: '105%',
      width: '110%'
    }
})

export default MoneyMitra;

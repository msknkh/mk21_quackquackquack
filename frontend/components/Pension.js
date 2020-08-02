import React from 'react';
import { StyleSheet, Icon, View, TouchableOpacity, Image, Modal, AppState } from 'react-native';
import { Container, Text } from 'native-base';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';

class Loan extends React.Component{

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
                                    <Text style={[styles.headText, { color: '#000', marginBottom: '1%' }]}>Please have a look at these 2 policies by the GOI:</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 4.5, marginBottom:10 }}>

                            <TouchableOpacity onPress={() => this.getNearbyPlaces('Apy')} style={[styles.button, { backgroundColor: '#479689' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                <View style = {styles.buttonTextContainer, {
                                  flex:3.1,
                                  borderColor: 'white',
                                  borderWidth: 2,
                                  borderRadius: 10,
                                }}>
                                  <Text style={styles.buttonText}></Text>
                                  <Text style={styles.buttonText, {fontSize:30, color: 'white', textAlign:'center'}}>APY</Text>
                                  <Text style={styles.buttonText}></Text>
                                </View>

                                <View style = {styles.buttonTextContainer}>

                                  <Text style={styles.buttonText}>Atal Pension Yojana</Text>
                                  <Text style={styles.buttonText}>(APY)</Text>

                                </View>
                              </View>
                            </TouchableOpacity>



                            <TouchableOpacity onPress={() => this.getNearbyPlaces('Pmvvy')} style={[styles.button, { backgroundColor: '#2295f3' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                <View style = {styles.buttonTextContainer, {
                                  flex:3.1,
                                  borderColor: 'white',
                                  borderWidth: 2,
                                  borderRadius: 10,
                                }}>
                                  <Text style={styles.buttonText}></Text>
                                  <Text style={styles.buttonText, {fontSize:30, color: 'white', textAlign:'center'}}>PMVVY</Text>
                                  <Text style={styles.buttonText}></Text>
                                </View>

                                <View style = {styles.buttonTextContainer}>

                                  <Text style={styles.buttonText}>Pradhan Mantri Vaya</Text>
                                  <Text style={styles.buttonText}>Vandana Yojana</Text>
                                  <Text style={styles.buttonText}>(PMVVY)</Text>

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
        margin: '2%',
        borderRadius: 10,
        maxHeight: 118,

    },
    buttonText: {
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
        marginLeft: 5,
        resizeMode: 'stretch',
        height: '80%',
        width: '100%'
    },
    bottomField:{
        margin: 10,
        padding: 10,
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

export default Loan;

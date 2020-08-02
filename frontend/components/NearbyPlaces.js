import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Modal, AppState } from 'react-native';
import { Container, Text } from 'native-base';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Speech from 'expo-speech';


import i18n from 'i18n-js';

class NearbyPlaces extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: null,
            modalVisible: false,
            openSetting: false,
            appState: AppState.currentState
        };
    }

    componentDidMount() {
        AppState.addEventListener("change", this.handleAppStateChange);
        this.getPermision();
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.handleAppStateChange);
    }

    handleAppStateChange = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
            this.getPermision();
        }
        this.setState({
            appState: nextAppState
        });
    }

    getPermision = async () => {
        let locAccess = await Location.hasServicesEnabledAsync();
        if (!locAccess) {
            this.setState({
                modalVisible: true
            })
            return;
        }
        let { status } = await Location.requestPermissionsAsync();
        this.setState({
            status: status
        })
    }

    getNearbyPlaces = async (ScreenName) => {
        this.props.navigation.navigate(ScreenName)
    }

    openSetting = () => {
        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
        this.setState({
            openSetting: false
        })
    }

    render() {
        return (
            <Container>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{i18n.t("You Need to Enable Location Services")}</Text>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                    openSetting: true
                                });
                                this.openSetting();
                            }} style={{ backgroundColor: '#302ea2', padding: 10, margin: 10, borderRadius: 10 }}><Text style={{ color: 'white' }}>{i18n.t("Enable Location Services")}</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={styles.content} >
                    <View style={{ flex: 1 }}>
                        <View style={[styles.row, { justifyContent: 'space-around' }]}>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Image style={styles.img} source={require('../assets/moneyMitra.png')}/>
                            </View>
                            <View style={{ flex: 7.4, justifyContent: 'center' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={[styles.headText, { color: '#000', marginBottom: '1%' }]} onPress = {() => {
                                      Speech.speak(`Which financial touchpoint are you looking for?`);
                                    }}>{i18n.t("Which financial touchpoint are you looking for?")}</Text>
                                
                              </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 4.5, marginBottom: 10 }}>


                            <TouchableOpacity onPress={() => {Speech.speak(`You'll now get a list for the ATMs near you`); this.getNearbyPlaces('Atms')}} style={[styles.button, { backgroundColor: '#479689' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{
                                        marginLeft: '3%',
                                        flex: 2,
                                        height: '100%',
                                        width: '100%',

                                }} source={require('../assets/nearbyATM.png')} />
                                <View style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>{i18n.t("ATMs")}</Text>
                                    <Text style={styles.buttonText}></Text>
                                </View>
                            </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {Speech.speak(`You'll now get a list for the Banks near you`); this.getNearbyPlaces('Banks')}} style={[styles.button, { backgroundColor: '#9f50b0' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',


                                }} source={require('../assets/nearbyBanks.png')} />
                                <View style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>{i18n.t("Bank Branches")}</Text>
                                    <Text style={styles.buttonText}></Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                            <TouchableOpacity onPress={() => {Speech.speak(`You'll now get a list for the Bank Mitras near you`); this.getNearbyPlaces('BankMitras')}} style={[styles.button, { backgroundColor: '#2295f3' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',


                                }} source={require('../assets/nearbyBankMitra.png')} />
                                <View style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>{i18n.t("Bank Mitras")}</Text>
                                    <Text style={styles.buttonText}></Text>
                                </View>
                            </View>
                        </TouchableOpacity>



                            <TouchableOpacity onPress={() => {Speech.speak(`You'll now get a list for the Post Offices near you`); this.getNearbyPlaces('PostOffices')}} style={[styles.button, { backgroundColor: '#302ea2' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',


                                }} source={require('../assets/nearbyPO.png')} />
                                <View style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>{i18n.t("Post Offices")}</Text>
                                    <Text style={styles.buttonText}></Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                            <TouchableOpacity onPress={() => {Speech.speak(`You'll now get a list for the CSCs near you`); this.getNearbyPlaces('CSCs')}} style={[styles.button, { backgroundColor: '#ffa726', marginRight: 10 }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',


                                }} source={require('../assets/nearbyCSC.png')} />
                                <View style={styles.buttonTextContainer}>
                                    <Text style={[styles.buttonText, { fontSize: 10 }]}></Text>
                                    <Text style={styles.buttonText}>{i18n.t("Common Service")}</Text>
                                    <Text style={styles.buttonText}>{i18n.t("Centres")}</Text>
                                    <Text style={[styles.buttonText, { fontSize: 10 }]}></Text>
                                </View>
                            </View>
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
        margin: 10,
        borderRadius: 10,
    },
    buttonLeft: {
        flex: 1,
        backgroundColor: "#302ea2",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 5,
        borderRadius: 5
    },
    buttonRight: {
        flex: 1,
        backgroundColor: "#302ea2",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 5,
        borderRadius: 5
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
    }
})

export default NearbyPlaces;

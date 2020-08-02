import React from 'react';
import { StyleSheet, Icon, View, TouchableOpacity, Image, Modal, AppState } from 'react-native';
import { Container, Text } from 'native-base';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';

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
                            <Text style={styles.modalText}>You Need to Enable Location Services</Text>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                    openSetting: true
                                });
                                this.openSetting();
                            }} style={styles.button}><Text style={{ color: 'white' }}>Enable Location Services</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={styles.content} >
                    <View style={{ flex: 1 }}>
                        <View style={[styles.row, { justifyContent: 'space-around' }]}>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Image style={styles.img} source={require('../assets/moneyMitra.png')} />
                            </View>
                            <View style={{ flex: 7.4, justifyContent: 'center' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.headText, { color: '#000', marginBottom: '1%' }]}>Which action do you want to perform?</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 4.5, marginBottom:10 }}>

                            <TouchableOpacity onPress={() => this.getNearbyPlaces('WithdrawMoney')} style={[styles.button, { backgroundColor: '#479689' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{
                                        marginLeft: '3%',
                                        flex: 2,
                                        height: '100%',
                                        width: '100%',

                                    }} source={require('../assets/nearbyATM.png')} />
                                    <View style = {styles.buttonTextContainer}>
                                      <Text style={styles.buttonText}></Text>
                                      <Text style={styles.buttonText}>Withdraw Money</Text>
                                      <Text style={styles.buttonText}></Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getNearbyPlaces('DepositMoney')} style={[styles.button, { backgroundColor: '#9f50b0' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',

                                  }} source={require('../assets/nearbyBanks.png')} />
                                  <View style = {styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>Deposit Money</Text>
                                    <Text style={styles.buttonText}></Text>
                                  </View>
                              </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.getNearbyPlaces('WithdrawMoney')} style={[styles.button, { backgroundColor: '#2295f3' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',

                                  }} source={require('../assets/nearbyBankMitra.png')} />
                                  <View style = {styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>Open a new account</Text>
                                    <Text style={styles.buttonText}></Text>
                                  </View>
                              </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.getNearbyPlaces('DepositMoney')} style={[styles.button, { backgroundColor: '#302ea2' }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',

                                  }} source={require('../assets/nearbyPO.png')} />
                                  <View style = {styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}></Text>
                                    <Text style={styles.buttonText}>Know more about schemes</Text>
                                    <Text style={styles.buttonText}></Text>
                                  </View>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.getNearbyPlaces('Tutorial')} style={[styles.button, { backgroundColor: '#ffa726', marginRight: 10 }]}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Image style={{
                                      marginLeft: '3%',
                                      flex: 2,
                                      height: '100%',
                                      width: '100%',

                                  }} source={require('../assets/nearbyCSC.png')} />
                                  <View style = {styles.buttonTextContainer}>
                                    <Text style={styles.buttonText, {fontSize:10}}></Text>
                                    <Text style={styles.buttonText}>Tutorial videos</Text>
                                    <Text style={styles.buttonText}>for this app</Text>
                                    <Text style={styles.buttonText, {fontSize:10}}></Text>
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
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Modal, AppState } from 'react-native';
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
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Image style={styles.img} source={require('../assets/moneyMitra.png')} />
                            </View>
                            <View style={{ flex: 7, justifyContent: 'center' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ resizeMode: 'stretch', height: '40%', width: '40%' }} source={require('../assets/nearby1.png')} />
                                    <Text style={[styles.headText, { color: '#302ea2', marginTop: 10 }]}>Find Nearby Financial Touch Points</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this.getNearbyPlaces('Atms')} style={[styles.buttonLeft, { backgroundColor: 'red' }]}><Text style={styles.buttonText}>ATMs</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getNearbyPlaces('Banks')} style={[styles.buttonRight, { backgroundColor: 'red' }]}><Text style={styles.buttonText}>Banks</Text></TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this.getNearbyPlaces('BankMitras')} style={[styles.buttonLeft, { backgroundColor: '#00cc00' }]}><Text style={styles.buttonText}>Bank Mitra</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.getNearbyPlaces('PostOffices')} style={[styles.buttonRight, { backgroundColor: '#00cc00' }]}><Text style={styles.buttonText}>Post Offices</Text></TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this.getNearbyPlaces('CSCs')} style={[styles.buttonLeft, { backgroundColor: '#302ea2', marginRight: 10 }]}><Text style={styles.buttonText}>Common Service Centre</Text></TouchableOpacity>
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
    headText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    img: {
        marginLeft: 5,
        resizeMode: 'stretch',
        height: '80%',
        width: '100%'
    }
})

export default NearbyPlaces;

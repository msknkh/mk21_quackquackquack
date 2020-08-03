import React from 'react';
import { Container, Text, Accordion, Icon } from 'native-base';
import { ActivityIndicator, View, StyleSheet, AppState, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import { Foundation, AntDesign } from '@expo/vector-icons'
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import { SearchBar, Slider, Rating, CheckBox } from 'react-native-elements';
import escapeRegExp from 'escape-string-regexp';
import axios from 'axios';
import openMap from 'react-native-open-maps';

_navigateMap = (lat, long) => {
    let q = lat + ',' + long
    openMap({ latitude: lat, longitude: long, zoom: 40, query: q, travelType: 'drive', navigate_mode: 'navigate' });
}

class RenderAtms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            modalAskForFeedback: false,
            modalFeedback: false,
            atmId: null,
            feedback_rating: 0,
            feedback_text: '',
            feedback_check: false
        };
    }

    _renderContent = (atm) => {
        return (
            <Text style={{ color: 'black' }}>
                {atm.item.address}
            </Text>
        );
    }

    _renderHeader = (atm, expanded) => {
        let icon = '../assets/ICICI.png';
        return (
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', backgroundColor: '#479689ff' }}>
                <View style={{ flex: 4, height: 60 }}>
                    <View style={{ flexDirection: 'row', flex: 1, height: 60, marginTop: '10%' }}>
                        <Image style={{ flex: 3, height: '100%', width: '100%', resizeMode: 'contain', marginTop: '-5%' }} source={require(icon)} />
                        <View style={{ flex: 5, marginTop: -13 }}>
                            <Text style={{ flex: 2, color: 'white' }}> {atm.item.bank_name} </Text>
                            <Text style={{ flex: 1, fontSize: 10, marginTop: -45, color: 'white' }}>{atm.item.address}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1.5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}> {atm.item.user_distance} Km </Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        _navigateMap(atm.item.latitude, atm.item.longitude);
                        this.setState({ modalAskForFeedback: true, atmId: atm.item.id })
                    }}>
                        <Image style={{ height: 45, width: 45 }} source={require('../assets/googleMapsLogo.png')} />
                    </TouchableOpacity>
                </View>

                {
                    expanded
                        ? <Icon style={{ fontSize: 30, marginRight: 10, color: 'white' }} name="remove-circle" />
                        : <Icon style={{ fontSize: 30, marginRight: 10, color: 'white' }} name="add-circle" />
                }
            </View>
        );
    }

    renderatm = (atm) => {
        let data = []
        data.push(atm)
        return (
            <Accordion
                key={atm.item.id}
                dataArray={data}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent} />
        );
    }

    sendFeedback = () => {
        let rating = this.state.feedback_rating
        let nonfunctional = this.state.feedback_check
        let text = this.state.feedback_text
        let atmId = this.state.atmId
        let url = 'http://neo2207.pythonanywhere.com/update_rating'
        axios.post(url, {
            rating: rating,
            nonfunctional: nonfunctional,
            feedback: text,
            name: "Atm",
            id: atmId
        })
            .then(function (res) {
                console.log(res)
            })
            .catch(function (error) {
                console.log(error)
            })

        this.setState({
            feedback_rating: 0,
            feedback_check: false,
            feedback_text: null,
            atmID: null
        })

    }

    render() {
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalAskForFeedback}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}> Would you like to Rate </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        modalAskForFeedback: false
                                    });
                                }} style={{ backgroundColor: '#302ea2', padding: 10, margin: 10, borderRadius: 10 }}><Text style={{ color: 'white' }}>No</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        modalAskForFeedback: false,
                                        modalFeedback: true
                                    });
                                }} style={{ backgroundColor: '#302ea2', padding: 10, margin: 10, borderRadius: 10 }}><Text style={{ color: 'white' }}>Yes</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalFeedback}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Feedback</Text>
                            <Rating defaultRating={0} fractions={0} startingValue={0} onFinishRating={(rating) => {
                                this.setState({
                                    feedback_rating: rating
                                })
                            }} />

                            <CheckBox checked={this.state.feedback_check} onPress={() => {
                                this.setState({
                                    feedback_check: !this.state.feedback_check
                                })
                            }} title="Report Non Functional" />
                            <TextInput placeholder="Your Feedback"
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 5 }}
                                onChangeText={text => {
                                    this.setState({
                                        feedback_text: text
                                    })
                                }}
                                value={this.state.feedback_text}
                            />
                            <TouchableOpacity onPress={() => {
                                this.sendFeedback();
                                this.setState({
                                    modalFeedback: false
                                });
                            }} style={{ backgroundColor: '#302ea2', padding: 10, margin: 10, borderRadius: 10 }}><Text style={{ color: 'white' }}>Submit</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <FlatList data={this.props.atms} renderItem={this.renderatm} keyExtractor={item => String(item.id)} />
            </View>
        );
    }
}

class Atms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: null,
            status: null,
            appState: AppState.currentState,
            atms: null,
            search: '',
            sliderValue: 2,
            submitRequestModal: false
        }
    }

    componentDidMount() {
        AppState.addEventListener("change", this.handleAppStateChange);
        this.getLocation();
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.handleAppStateChange);
    }

    handleAppStateChange = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
            this.getLocation();
        }
        this.setState({
            appState: nextAppState
        });
    }

    getLocation = async () => {
        let { status } = await Location.getPermissionsAsync();
        this.setState({
            status: status
        })

        if (status !== 'granted') {
            return;
        }

        if (status === 'granted') {

            let location = await Location.getCurrentPositionAsync({});
            this.setState({
                location: location
            });
            let url1 = 'http://neo2207.pythonanywhere.com/show/atms?latitude=28.360953&longitude=77.330029'

            axios.get(url1)
                .then(res => {
                    let fecthedAtms = res.data
                    this.setState({ atms: fecthedAtms })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    openSetting = () => {
        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_SETTINGS);
    }

    updateSearch = (search) => {
        this.setState({
            search: search
        });
    }

    requestATM = () => {
        this.setState({
            submitRequestModal: true
        })
        let latitude = this.state.location.coords.latitude
        let longitude = this.state.location.coords.longitude
        let distance = this.state.sliderValue
        let url = 'http://neo2207.pythonanywhere.com/AtmRequest'
        axios.post(url, {
            latitude: latitude,
            longitude: longitude,
            distance: distance
        })
            .then(res => {
                console.log(res)
                this.setState({
                    submitRequestModal: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    submitRequestModal: false
                })
            })
    }

    render() {

        let status = this.state.status;
        let location = this.state.location;
        let atms = this.state.atms
        if (!status || (status === 'granted' && (!location || !atms))) {
            return (
                <Container>
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color='#302ea2' />
                    </View>
                </Container>
            );
        }

        if (this.state.status !== 'granted') {
            return (
                <Container>
                    <View style={styles.center}>
                        <Foundation name='alert' size={50} style={{ color: '#302ea2' }} />
                        <Text style={{ textAlign: 'center', color: '#302ea2' }}>
                            You denied your location. You can fix this by visiting your settings and enabling location permissions for this app.
                        </Text>
                        <TouchableOpacity onPress={() => this.openSetting()} style={styles.button}><Text style={{ color: 'white' }}>Open Settings</Text></TouchableOpacity>
                    </View>
                </Container>
            );
        }

        if (this.state.atms) {
            let atms = this.state.atms
            let showingAtms
            if (this.state.search) {
                const match = new RegExp(escapeRegExp(this.state.search), 'i')
                showingAtms = atms.filter((atm) => match.test(atm.bank_name) && (atm.user_distance <= this.state.sliderValue))
            }
            else {
                showingAtms = atms.filter(atm => (atm.user_distance <= this.state.sliderValue))
            }

            return (
                <Container>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.submitRequestModal}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <ActivityIndicator size='large' color='#302ea2' />
                                <Text>Submitting Your Request</Text>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <SearchBar platform='default' lightTheme round placeholder='Search ATM by name' value={this.state.search} onChangeText={this.updateSearch} />
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ flex: 5 }}>
                                    <Slider minimumValue={0} maximumValue={5} step={1} value={this.state.sliderValue} onValueChange={(value) => this.setState({ sliderValue: value })} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text>{this.state.sliderValue} Km</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 4 }}>
                            {
                                showingAtms.length > 0 ?
                                    <View>
                                        <RenderAtms atms={showingAtms} />
                                    </View>
                                    :
                                    <View style={styles.center}>
                                        <AntDesign name="frowno" size={50} color="#302ea2" />
                                        <Text style={{ textAlign: 'center', color: '#302ea2' }}>
                                            No Atms within given range</Text>
                                        <TouchableOpacity onPress={() => {
                                            this.requestATM();
                                        }} style={{ backgroundColor: '#302ea2', padding: 10, margin: 10, borderRadius: 10 }}><Text style={{ color: 'white' }}>Request ATM</Text></TouchableOpacity>
                                    </View>
                            }
                        </View>
                    </View>
                </Container>
            )
        }
    }
}


const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#302ea2',
        padding: 10,
        margin: 10,
        borderRadius: 10
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
});


export default Atms;

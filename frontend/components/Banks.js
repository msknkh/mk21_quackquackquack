import React from 'react';
import { Container, Text, Accordion, Icon } from 'native-base';
import { ActivityIndicator, View, StyleSheet, AppState, TouchableOpacity, FlatList, Image } from 'react-native';
import { Foundation, AntDesign, MaterialIcons } from '@expo/vector-icons'
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import { SearchBar, Slider } from 'react-native-elements';
import escapeRegExp from 'escape-string-regexp';
import Feedback from './Feedback';
import call from 'react-native-phone-call'
import openMap from 'react-native-open-maps';
// import { StackNavigator } from 'react-navigation';

_makeCall = (phone) => {
    const callObj = {
        number: phone,
        prompt: true
    }
    call(callObj).catch(console.error)
}

_navigateMap = (lat, long) => {
    // TODO Use start end
    openMap({ latitude: lat, longitude: long });
}

class Renderbanks extends React.Component {
    _renderContent = (bank) => {
        return (
            <Text style={{ color: 'black' }}>
                {bank.item.Address}
            </Text>
        );
    }

    _renderHeader = (bank, expanded) => {
        let icon = '../assets/ICICI.png';
        return (
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', backgroundColor: '#479689ff' }}>

                <View style={{ flex: 4, height: 60 }}>
                    <View style={{ flexDirection: 'row', flex: 1, height: 60, marginTop: '10%' }}>
                        <Image style={{ flex: 3, height: '100%', width: '100%', resizeMode: 'contain', marginTop: '-5%' }} source={require(icon)} />
                        <View style={{ flex: 5, marginTop: -13 }}>
                            <Text style={{ flex: 2, color: 'white' }}> {bank.item.bank_name} Bank </Text>
                            <Text style={{ flex: 1, fontSize: 10, marginTop: -45, color: 'white' }}>{bank.item.Address}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1.5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}> {bank.item.distance} Km </Text>
                </View>

                <View style={{ flex: 2.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={ () => {
                         this.props.self.props.navigation.navigate('Feedback', bank.item);
                         _navigateMap(bank.item.lat, bank.item.long);

                    }}>
                        <Image style={{ height: 45, width: 45 }} source={require('../assets/googleMapsLogo.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        _makeCall(bank.item.phone);
                    }}>
                        <Image style={{ height: 45, width: 45 }} source={require('../assets/callIcon.png')} />
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

    renderbank = (bank) => {
        let data = []
        data.push(bank)
        return (
            <Accordion
                key={bank.item.id}
                dataArray={data}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent} />
        );
    }

    render() {
        return (
            <FlatList data={this.props.banks} renderItem={this.renderbank} />
        );
    }
}

// Renderbanks = ({ banks }) => {
//     return (
//         <FlatList data={banks} renderItem={renderbank} />
//     );
// }

class Banks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: null,
            status: null,
            appState: AppState.currentState,
            banks: [],
            search: '',
            sliderValue: 2
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
            // here will make api call to back end with lat and long
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

    render() {

        let status = this.state.status;
        let location = this.state.location;
        if (!status || (status === 'granted' && !location)) { // convert to !banks later
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

        if (this.state.banks) {
            let banks = [{ id: 0, bank_name: "SBI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 2, img: 'sbi', phone: '9876511224', lat: 28.6078, long: 77.0406 },
            { id: 1, bank_name: "ICICI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 2, img: 'ICICI', phone: '9627311778', lat: 28.6078, long: 77.0406 },
            { id: 2, bank_name: "CANARA", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 3, img: 'canara', phone: '9253611995', lat: 28.6078, long: 77.0406 },
            { id: 3, bank_name: "AXIS", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 4, img: 'axis', phone: '9528311223', lat: 28.6078, long: 77.0406 },
            { id: 4, bank_name: "SBI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 4, img: 'sbi', phone: '9058977665', lat: 28.6078, long: 77.0406 }]

            let showingbanks
            if (this.state.search) {
                const match = new RegExp(escapeRegExp(this.state.search), 'i')
                showingbanks = banks.filter((bank) => match.test(bank.bank_name) && (bank.distance < this.state.sliderValue))
            }
            else {
                showingbanks = banks.filter(bank => (bank.distance <= this.state.sliderValue))
            }

            self = this;

            return (
                <Container>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <SearchBar platform='default' lightTheme round placeholder='Search bank by name' value={this.state.search} onChangeText={this.updateSearch} />
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
                                showingbanks.length > 0 ?
                                    <View>
                                        <Renderbanks banks={showingbanks} self = {self}/>
                                    </View>
                                    :
                                    <View style={styles.center}>
                                        <AntDesign name="frowno" size={50} color="#302ea2" />
                                        <Text style={{ textAlign: 'center', color: '#302ea2' }}>
                                            No banks within given range</Text>
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
    }
});

export default Banks;

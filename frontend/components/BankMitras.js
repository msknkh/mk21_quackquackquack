import React from 'react';
import { Container, Text, Accordion, Icon } from 'native-base';
import { ActivityIndicator, View, StyleSheet, AppState, TouchableOpacity, FlatList, Image } from 'react-native';
import { Foundation, AntDesign, MaterialIcons } from '@expo/vector-icons'
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import { SearchBar, Slider } from 'react-native-elements';
import escapeRegExp from 'escape-string-regexp';
import call from 'react-native-phone-call'

_makeCall = (phone) => {
    const callObj = {
        number: phone,
        prompt: true
    }
    call(callObj).catch(console.error)       
}
_renderContent = (bankmitra) => {
    return (
        <Text style={{ color: 'black' }}>
            {bankmitra.item.Address}
        </Text>
    );
}

_renderHeader = (bankmitra, expanded) => {
    let icon = '../assets/ICICI.png';
    return (
        <View style={{ flexDirection: 'row', padding: 10, justifyContent: "space-between", alignItems: 'center' }}>
            <Image style={{ height: 50, width: 50 }} source={require(icon)} />
            <Text> {bankmitra.item.bankmitra_name} | {bankmitra.item.distance} Km </Text>
            <MaterialIcons name="navigation" size={24} color="black" />
            <MaterialIcons name="call" size={24} color="black" onPress={ () => {
                _makeCall(bankmitra.item.phone);
            }} />
            {
                expanded
                    ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                    : <Icon style={{ fontSize: 18 }} name="add-circle" />
            }
        </View>
    );
}


renderbankmitra = (bankmitra) => {
    let data = []
    data.push(bankmitra)
    return (
        <Accordion key={bankmitra.item.id} dataArray={data} renderHeader={_renderHeader} renderContent={_renderContent} />
    );
}

Renderbankmitras = ({ bankmitras }) => {
    return (
        <FlatList data={bankmitras} renderItem={renderbankmitra} />
    );
}

class BankMitras extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: null,
            status: null,
            appState: AppState.currentState,
            bankmitras: [],
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
        if (!status || (status === 'granted' && !location)) { // convert to !bankmitras later
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

        if (this.state.bankmitras) {
            let bankmitras = [{ id: 0, bankmitra_name: "SBI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 2, img: 'sbi', phone: '9876511224' }, 
            { id: 1, bankmitra_name: "ICICI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 2, img: 'ICICI', phone: '9876511224'},
            { id: 2, bankmitra_name: "CANARA", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 3, img: 'canara', phone: '9876511224' },
            { id: 3, bankmitra_name: "AXIS", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 4, img: 'axis', phone: '9876511224' },
            { id: 4, bankmitra_name: "SBI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 4, img: 'sbi', phone: '9876511224' }]

            let showingbankmitras
            if (this.state.search) {
                const match = new RegExp(escapeRegExp(this.state.search), 'i')
                showingbankmitras = bankmitras.filter((bankmitra) => match.test(bankmitra.bankmitra_name) && (bankmitra.distance < this.state.sliderValue))
            }
            else {
                showingbankmitras = bankmitras.filter(bankmitra => (bankmitra.distance <= this.state.sliderValue))
            }

            return (
                <Container>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <SearchBar platform='default' lightTheme round placeholder='Search bankmitra by name' value={this.state.search} onChangeText={this.updateSearch} />
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
                                showingbankmitras.length > 0 ?
                                    <View>
                                        <Renderbankmitras bankmitras={showingbankmitras} />
                                    </View>
                                    :
                                    <View style={styles.center}>
                                        <AntDesign name="frowno" size={50} color="#302ea2" />
                                        <Text style={{ textAlign: 'center', color: '#302ea2' }}>
                                            No bankmitras within given range</Text>
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


export default BankMitras;

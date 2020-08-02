import React from 'react';
import { Container, Text, Accordion, Icon } from 'native-base';
import { ActivityIndicator, View, StyleSheet, AppState, TouchableOpacity, FlatList, Image } from 'react-native';
import { Foundation, AntDesign, MaterialIcons } from '@expo/vector-icons'
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import { SearchBar, Slider } from 'react-native-elements';
import escapeRegExp from 'escape-string-regexp';

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
        <View style={{ flexDirection: 'row', padding: 10, justifyContent: "space-between", alignItems: 'center' }}>
            <Image style={{ height: 50, width: 50 }} source={require(icon)} />
            <Text> {bank.item.bank_name} | {bank.item.distance} Km </Text>
            <MaterialIcons name="navigation" size={24} color="black" />
            <MaterialIcons name="call" size={24} color="black" />
            {
                expanded
                    ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                    : <Icon style={{ fontSize: 18 }} name="add-circle" />
            }
        </View>
    );
}


renderbank = (bank) => {
    let data = []
    data.push(bank)
    return (
        <Accordion key={bank.item.id} dataArray={data} renderHeader={_renderHeader} renderContent={_renderContent} />
    );
}

Renderbanks = ({ banks }) => {
    return (
        <FlatList data={banks} renderItem={renderbank} />
    );
}

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
            let banks = [{ id: 0, bank_name: "SBI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 2, img: 'sbi' }, { id: 1, bank_name: "ICICI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 2, img: 'ICICI' },
            { id: 2, bank_name: "CANARA", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 3, img: 'canara' },
            { id: 3, bank_name: "AXIS", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 4, img: 'axis' },
            { id: 4, bank_name: "SBI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 4, img: 'sbi' }]

            let showingbanks
            if (this.state.search) {
                const match = new RegExp(escapeRegExp(this.state.search), 'i')
                showingbanks = banks.filter((bank) => match.test(bank.bank_name) && (bank.distance < this.state.sliderValue))
            }
            else {
                showingbanks = banks.filter(bank => (bank.distance <= this.state.sliderValue))
            }

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
                                        <Renderbanks banks={showingbanks} />
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

import React from 'react';
import { Container, Text, Accordion, Icon } from 'native-base';
import { ActivityIndicator, View, StyleSheet, AppState, TouchableOpacity, FlatList, Image } from 'react-native';
import { Foundation, AntDesign, MaterialIcons } from '@expo/vector-icons'
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import { SearchBar, Slider } from 'react-native-elements';
import escapeRegExp from 'escape-string-regexp';
import call from 'react-native-phone-call'
import openMap from 'react-native-open-maps';

_makeCall = (phone) => {
    const callObj = {
        number: phone,
        prompt: true
    }
    call(callObj).catch(console.error)       
}

_navigateMap = (lat, long) => {
    openMap({ latitude: lat, longitude: long });
}

class RenderPostoffs extends React.Component {
    _renderContent = (postoff) => {
        return (
            <Text style={{ color: 'black' }}>
                {postoff.item.Address}
            </Text>
        );
    }
    
    _renderHeader = (postoff, expanded) => {
        let icon = '../assets/ICICI.png';
        return (
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', backgroundColor: '#479689ff' }}>
    
                <View style={{ flex: 4, height: 60 }}>
                    <View style={{ flexDirection: 'row', flex: 1, height: 60, marginTop: '10%' }}>
                        <Image style={{ flex: 3, height: '100%', width: '100%', resizeMode: 'contain', marginTop: '-5%' }} source={require(icon)} />
                        <View style={{ flex: 5, marginTop: -13 }}>
                            <Text style={{ flex: 2, color: 'white' }}> {postoff.item.postoff_name} PO </Text>
                            <Text style={{ flex: 1, fontSize: 10, marginTop: -45, color: 'white' }}>{postoff.item.Address}</Text>
                        </View>
                    </View>
                </View>
    
                <View style={{ flex: 1.5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}> {postoff.item.distance} Km </Text>
                </View>
    
                <View style={{ flex: 2.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={ () => {
                        alert('Would you like to rate the post office?');
                        _navigateMap(postoff.item.lat, postoff.item.long);   
                    }}>
                        <Image style={{ height: 45, width: 45 }} source={require('../assets/googleMapsLogo.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={ () => {
                        _makeCall(postoff.item.phone);
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

    renderpostoff = (postoff) => {
        let data = []
        data.push(postoff)
        return (
            <Accordion 
                key={postoff.item.id} 
                dataArray={data} 
                renderHeader={this._renderHeader} 
                renderContent={this._renderContent} />
        );
    }

    render() {
        return (
            <FlatList data={this.props.postoffs} renderItem={this.renderpostoff} />
        );
    }
}


class PostOffices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: null,
            status: null,
            appState: AppState.currentState,
            postoffs: [],
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
        if (!status || (status === 'granted' && !location)) { // convert to !postoffs later
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

        if (this.state.postoffs) {
            let postoffs = [{ id: 0, postoff_name: "SBI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 2, img: 'sbi', phone: '9253611995', lat: 28.6078, long: 77.0406 }, 
            { id: 1, postoff_name: "ICICI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 2, img: 'ICICI', phone: '9253611995', lat: 28.6078, long: 77.0406 },
            { id: 2, postoff_name: "CANARA", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 3, img: 'canara', phone: '9253611995', lat: 28.6078, long: 77.0406 },
            { id: 3, postoff_name: "AXIS", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 4, img: 'axis', phone: '9253611995', lat: 28.6078, long: 77.0406 },
            { id: 4, postoff_name: "SBI", Address: "Shop No 1, street 1, Lorem Ipsum", distance: 4, img: 'sbi', phone: '9253611995', lat: 28.6078, long: 77.0406 }]

            let showingpostoffs
            if (this.state.search) {
                const match = new RegExp(escapeRegExp(this.state.search), 'i')
                showingpostoffs = postoffs.filter((postoff) => match.test(postoff.postoff_name) && (postoff.distance < this.state.sliderValue))
            }
            else {
                showingpostoffs = postoffs.filter(postoff => (postoff.distance <= this.state.sliderValue))
            }

            return (
                <Container>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <SearchBar platform='default' lightTheme round placeholder='Search postoff by name' value={this.state.search} onChangeText={this.updateSearch} />
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
                                showingpostoffs.length > 0 ?
                                    <View>
                                        <RenderPostoffs postoffs={showingpostoffs} />
                                    </View>
                                    :
                                    <View style={styles.center}>
                                        <AntDesign name="frowno" size={50} color="#302ea2" />
                                        <Text style={{ textAlign: 'center', color: '#302ea2' }}>
                                            No postoffs within given range</Text>
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

export default PostOffices;

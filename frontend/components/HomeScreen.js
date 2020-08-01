import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, } from 'react-native';
import { Container, Text } from 'native-base';


class HomeScreen extends React.Component {
    render() {
        return (
            <Container>
                <View style={styles.content} >
                    <View style={{ flex: 2 }}>
                        <View style={[styles.row, { justifyContent: 'space-around' }]}>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Image style={styles.img} source={require('../assets/moneyMitra.png')} />
                            </View>
                            <View style={{ flex: 7, justifyContent: 'center', margin: 10 }}>
                                <Text style={[styles.headText, { color: 'red' }]}>Hi there!</Text>
                                <Text style={[styles.headText, { color: '#00cc00' }]}>I am Money Mitra.</Text>
                                <Text style={[styles.headText, { color: '#00cc00' }]}>I'll be your money genie!</Text>
                                <Text style={[styles.headText, { color: '#302ea2' }]}></Text>
                                <Text style={[styles.headText, { color: '#302ea2' }]}>What can I help you with today?</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NearbyPlaces')} style={[styles.button, { backgroundColor: 'red' }]}><Text style={styles.buttonText}>Find Nearby Places </Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MoneyMitra')} style={[styles.button, { backgroundColor: '#00cc00' }]}><Text style={styles.buttonText}>Say Hello to Money Mitra</Text></TouchableOpacity>
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
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    img: {
        marginLeft: 5,
        resizeMode: 'stretch',
        height: '70%',
        width: '100%'
    }
})

export default HomeScreen;

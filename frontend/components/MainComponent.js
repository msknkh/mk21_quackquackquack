import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Container } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button, Icon } from 'native-base';


import HomeScreen from './HomeScreen';
import Atms from './Atms';
import BankMitras from './BankMitras';
import Banks from './Banks';
import CommonServiceCenter from './CommonServiceCenter';
import PostOffices from './PostOffices';
import NearbyPlaces from './NearbyPlaces';
import HowItWorks from './HowItWorks';
import MoneyMitra from './MoneyMitra';
import WithdrawMoney from './WithdrawMoney';
import DepositMoney from './DepositMoney';
import Tutorial from './Tutorial';


const Stack = createStackNavigator();

function HeaderHomeButton({ navigation }) {
    return (
        <Button transparent onPress={() => navigation.navigate('Home')}><Icon style={{ color: '#fff' }} name='home' /></Button>
    );
}

export default class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
            <Container>
                <StatusBar style="light" backgroundColor="#000" />
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: {
                            backgroundColor: "#302ea2"
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Jan Dhan Darshak' }} />
                        <Stack.Screen name="NearbyPlaces" component={NearbyPlaces} options={({ navigation }) => ({
                            headerTitle: 'Financial Touch Points',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="HowItWorks" component={HowItWorks} options={({ navigation }) => ({
                            headerTitle: 'Financial Services',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="MoneyMitra" component={MoneyMitra} options={({ navigation }) => ({
                            headerTitle: 'Money Mitra',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="Atms" component={Atms} options={({ navigation }) => ({
                            headerTitle: 'ATMs',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="Banks" component={Banks} options={({ navigation }) => ({
                            headerTitle: 'Banks',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="BankMitras" component={BankMitras} options={({ navigation }) => ({
                            headerTitle: 'Bank Mitra',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="PostOffices" component={PostOffices} options={({ navigation }) => ({
                            headerTitle: 'Post Offices',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="CSCs" component={CommonServiceCenter} options={({ navigation }) => ({
                            headerTitle: 'Common Service Centres',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="WithdrawMoney" component={WithdrawMoney} options={({ navigation }) => ({
                            headerTitle: 'ATMs, Banks & Mitras',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="DepositMoney" component={DepositMoney} options={({ navigation }) => ({
                            headerTitle: 'Banks, Mitras & PO',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                        <Stack.Screen name="Tutorial" component={Tutorial} options={({ navigation }) => ({
                            headerTitle: 'Tutorial Videos',
                            headerRight: () => <HeaderHomeButton navigation={navigation} />
                        })} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Container>
        );
    }
}

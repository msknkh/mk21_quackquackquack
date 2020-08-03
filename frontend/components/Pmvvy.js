import React, {Component} from 'react';
import { StyleSheet, ScrollView, Icon, View, TouchableOpacity, Image, Modal, AppState} from 'react-native';
import Accordian from './Accordian'
import {Container, Text} from 'native-base';
import { WebView } from "react-native-webview";
import * as WebBrowser from 'expo-web-browser';


class Pmvvy extends React.Component{

    db = {
      'q1': 'What is the scheme?',
      'a1': `It is a guaranteed pension scheme. This scheme provides immediate pension. It means that if you deposit the money today, you will receive pension from next month onwards. Provides protection from future fall in their interest income due to the uncertain market conditions and social security during old age`,
      'q2': 'Who is the scheme for? Are you eligible for it?',
      'a2': `It is exclusively for senior citizens, i.e. people above the age of 60`,
      'q3': 'How much pension will you get?',
      'a3': `(Calculator)`,
      'q4': 'How much amount will you have to contribute?',
      'a4': `(Calculator)`,
      'q5': 'Who is implementing the scheme?',
      'a5': `It is being implemented by the Life Insurance Corporation of India (LIC)`,
      'q6': 'History of the policy',
      'a6': `In Budget 2018-19, extended up to 31st March, 2020\nThe limit of maximum purchase price of Rs. 15 lakh per family (/ per senior citizen)\nThe maximum pension admissible under the scheme is now Rs.10,000/- per month`,
    }

    constructor(props) {
      super(props);
      this.data = {
        menu :[
          {
            title: this.db.q1,
            data: this.db.a1,
          },{
            title: this.db.q2,
            data: this.db.a2,
          },{
            title: this.db.q3,
            data: this.db.a3,
          },{
            title: this.db.q4,
            data: this.db.a4,
          },{
            title: this.db.q5,
            data: this.db.a5,
          },{
            title: this.db.q6,
            data: this.db.a6,
          },
        ]
       }
    }

    render() {
      return (
        <View style={styles.content}>
            <View style={{ flex: 0.3, justifyContent:'center' }}>
                <View style={[styles.row, { justifyContent: 'space-around' }]}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/moneyMitra.png')} />
                    </View>
                    <View style={{ flex: 7.4, justifyContent: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.headText, { color: '#000', marginBottom: '1%' }]}>Here are some FAQs for the policy {'\n'}Click on below buttons to know more:</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={{ flex: 4, marginTop:'2%' }}>
            <TouchableOpacity style={styles.button} onPress={() => {this._handlePressButtonAsync('https://financialservices.gov.in/insurance-divisions/Government-Sponsored-Socially-Oriented-Insurance-Schemes/Pradhan-Mantri-Vaya-Vandana-Yojana(PMVVY)')}}><Text style={styles.buttonText}> More info: Official Website </Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {this._handlePressButtonAsync('https://onlinesales.licindia.in/eSales/liconline')}}><Text style={styles.buttonText}> More info: Apply Online </Text></TouchableOpacity>
            { this.renderAccordians() }
          </ScrollView>
      </View>
    );
  }

  _handlePressButtonAsync = async (link) => {
    let result = await WebBrowser.openBrowserAsync(link);
    this.setState({ result });
  };

  renderAccordians=()=> {
    const items = [];
    for (item of this.data.menu) {
        items.push(
            <Accordian
                title = {item.title}
                data = {item.data}
            />
        );
    }
    return items;
  }

}

const styles = StyleSheet.create({
container: {
 flex:1,
 paddingTop:100,
 backgroundColor: '#fff',

},
content: {
   flex: 1,
   backgroundColor: '#fff',
},
row: {
   flex: 1,
   flexDirection: 'row',
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
},
button: {
   flexDirection: 'row',
   justifyContent:'center',
   height:56,

   alignItems:'center',

   margin:'1%',
   marginBottom:'0%',
   borderRadius: 10,

   backgroundColor: '#302ea2',


},
buttonText: {
   color: "#fff",
   fontSize: 20,
   textAlign: 'center',
   fontWeight: 'bold',
},

});

export default Pmvvy;

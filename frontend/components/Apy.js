import React, {Component} from 'react';
import { StyleSheet, ScrollView, Icon, View, TouchableOpacity, Image, Modal, AppState} from 'react-native';
import Accordian from './Accordian'
import {Container, Text} from 'native-base';
import { WebView } from "react-native-webview";
import * as WebBrowser from 'expo-web-browser';


class Apy extends React.Component{

    db = {
      'q1': 'What is the scheme?',
      'a1': `APY is a retirement scheme for all Indian citizens. It was established by the Government of India to provide guaranteed monthly pension to all Indians after the age of 60 years.`,
      'q2': 'Who is the scheme for? Are you eligible for it?',
      'a2': `For all Indian citizens over the age of 18 years and under the age of 40 years who have a Savings Bank (SB) Account with a bank or a post office (A new account can be opened)`,
      'q3': 'How much pension will you get?',
      'a3': `Subscribers get a guaranteed minimum pension of:\nRs. 1,000 per month \nRs. 2,000 per month \nRs. 3,000 per month \nRs. 4,000 per month \nRs. 5,000 per month \nstarting at the age of 60 years\n\nWhen the subscriber dies, their spouse gets the pension and when they die too, the lumpsum is given to their nominee`,
      'q4': 'How much amount will you have to contribute?',
      'a4': `By the age of 60, the user should have lumpsum equal to:\nRs. 1,70,000 (for monthly pension of Rs. 1,000)\nRs. 3,40,000 (for monthly pension of Rs. 2,000)\nRs. 5,10,000 (for monthly pension of Rs. 3,000)\nRs. 6,80,000 (for monthly pension of Rs. 4,000)\nRs. 8,50,000 (for monthly pension of Rs. 5,000)\n\nIf the subscriber dies before age of 60, then their spouse can choose to continue or close the account`,
      'q5': 'Who is implementing the scheme?',
      'a5': `APY is being implemented by the Government of India. It is regulated by PFRDA (Pension Fund Regulatory and Development Authority) through NPS (National Pension System) architecture`,
      'q6': 'History of the policy',
      'a6': `As on 31st March, 2019, a total of 149.53 lakh subscribers have been enrolled under APY with a total pension wealth of Rs. 6,860.30 crore.`,
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
            <View style={{ flex: 0.2, justifyContent:'center' }}>
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
              <TouchableOpacity style={styles.button} onPress={() => {this._handlePressButtonAsync('https://www.npscra.nsdl.co.in/scheme-details.php')}}><Text style={styles.buttonText}> More info: Official Website </Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {}}><Text style={styles.buttonText}> More info: Nearby Banks & POs </Text></TouchableOpacity>
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

export default Apy;

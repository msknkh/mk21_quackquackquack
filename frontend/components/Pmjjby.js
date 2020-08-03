import React, {Component} from 'react';
import { StyleSheet, ScrollView, Icon, View, TouchableOpacity, Image, Modal, AppState} from 'react-native';
import Accordian from './Accordian'
import {Container, Text} from 'native-base';
import { WebView } from "react-native-webview";
import * as WebBrowser from 'expo-web-browser';


class Pmjjby extends React.Component{

    db = {
      'q1': 'What is the scheme?',
      'a1': `It is a Term Life Insurance scheme established by the Government of India to provide life insurance cover to Indians. It focuses on securing the under-privileged and workers in the unorganised sector. `,
      'q2': 'Who is the scheme for? Are you eligible for it?',
      'a2': `"People over the age of 18 years and under the age of 50 years\nShould have a bank account who give their consent to join/enable auto-debit"`,
      'q3': 'How much is the risk cover?',
      'a3': `"Risk cover for one year period (from 1st June to 31st May) and is renewable, \nRs. 2 Lakh in case of death of the insured due to any reason during the policy coverage period"`,
      'q4': 'What premiums will you have to pay?',
      'a4': `"An yearly premium of Rs. 330 Only. \nYou need to provide ""auto-debit"" instructions to the concerned Bank or Post Office"`,
      'q5': 'Who is implementing the scheme?',
      'a5': `As on 31st March, 2019, cumulative gross enrollment reported by banks subject to verification of eligibility, etc. is over 5.91 crore under PMJJBY. A total of 145763 claims were registered under PMJJBY of which 135212 have been disbursed.`,
      'q6': 'History of the policy',
      'a6': `Life Insurance Corporation and all other life insurers who are willing to offer the product on similar terms with necessary approvals and tie-up with banks for this purpose.`,
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
              <TouchableOpacity style={styles.button} onPress={() => {this._handlePressButtonAsync('https://financialservices.gov.in/insurance-divisions/Government-Sponsored-Socially-Oriented-Insurance-Schemes/Pradhan-Mantri-Jeevan-Jyoti-Bima-Yojana(PMJJBY)')}}><Text style={styles.buttonText}> More info: Official Website </Text></TouchableOpacity>
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

export default Pmjjby;

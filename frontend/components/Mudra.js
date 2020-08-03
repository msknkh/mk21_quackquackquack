import React, {Component} from 'react';
import { StyleSheet, ScrollView, Icon, View, TouchableOpacity, Image, Modal, AppState} from 'react-native';
import Accordian from './Accordian'
import {Container, Text} from 'native-base';
import { WebView } from "react-native-webview";
import * as WebBrowser from 'expo-web-browser';


class Mudra extends React.Component {

    db = {
      'a1': `The loan amounts can be:\n• Up to Rs. 50,000 (under ‘Shishu’)\n• Between Rs. 50,000 to 5.0 Lakhs (under ‘Kishore’)\n• Between 5.0 Lakhs to 10.0 Lakhs (under ‘Tarun’)\n\n(The interventions have been named 'Shishu', 'Kishore' and 'Tarun' to signify the stage of growth/development and funding needs of the beneficiary)`,
      'q1': 'What is the Loan amount?',
      'q2': 'Who are the beneficiaries?',
      'a2': `Micro business units & Entrepreneurs are the target audience for the scheme`,
      'q3': 'Is collateral needed?',
      'a3': `There is no need for a collateral while taking a loan`,
      'q4': 'Why was the scheme launched?',
      'a4': `These measures are aimed at increasing the confidence of young, educated or skilled workers who would now be able to aspire to become first-generation entrepreneurs; existing small businesses, too, will be able to expand their activities.`,
      'q5': 'Who launched the scheme?',
      'a5': `Pradhan Mantri MUDRA Yojana (PMMY) is a scheme launched by the Hon’ble Prime Minister on April 8, 2015.`,
      'q6': 'History of the policy',
      'a6': 'As on 31.03.2019, Rs. 3,21,722 crores sanctioned (Rs. 142,345 cr. - Shishu, Rs. 104,386 cr. Kishore and Rs. 74,991 cr. - Tarun category), in 5.99 crores accounts.',
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
              <TouchableOpacity style={styles.button} onPress={() => {this._handlePressButtonAsync('http://www.mudramitra.in/')}}><Text style={styles.buttonText}> More info: Official Website </Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {this._handlePressButtonAsync('http://www.udaymimitra.in/')}}><Text style={styles.buttonText}> More info: Apply Online </Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {}}><Text style={styles.buttonText}> More info: Nearby Banks </Text></TouchableOpacity>
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

export default Mudra;

import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Accordian from './Accordian'
import {Container, Text} from 'native-base';
import { WebView } from "react-native-webview";


class StandUp extends React.Component{

    db = {
      'q1': 'What is the Loan amount?',
      'a1': `The loan amount can be between Rs.10 lakh and Rs.1 crore`,
      'q2': 'Who are the beneficiaries?',
      'a2': `Women, SC & ST category i.e those sections of the population facing significant hurdles due to lack of advice/mentorship as well as inadequate and delayed credit - for setting up greenfield enterprises (manufacturing, services or the trading sector)`,
      'q3': 'Is collateral needed?',
      'a3': `There is no need for a collateral while taking a loan`,
      'q4': 'Why was the scheme launched?',
      'a4': `To promote entrepreneurship amongst beneficiaries. The scheme intends to leverage the institutional credit structure to reach out to these underserved sectors of the population in starting greenfield enterprises. It caters to both ready and trainee borrowers.`,
      'q5': 'Who launched the scheme?',
      'a5': 'Government of India launched the Stand Up India scheme on 5th April, 2016.',
      'q6': 'History of the policy',
      'a6': `As on 31.03.2019, Rs. 16,085 crore has been sanctioned in 72,983 accounts (59,429 – women, 3,103-ST and 10,451 – SC).`,
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
        <View style={styles.container}>
          { this.renderAccordians() }
        </View>
      );
    }

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

  }
});

export default StandUp;

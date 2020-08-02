import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Accordian from './Accordian'
import {Container, Text} from 'native-base';
import { WebView } from "react-native-webview";


class Pmsby extends React.Component{
    db = {
      'q1': '',
      'a1': <Text></Text>,
      'q2': '',
      'a2': <Text></Text>,
      'q3': '',
      'a3': <Text></Text>,
      'q4': '',
      'a4': <Text></Text>,
      'q5': '',
      'a5': <Text></Text>,
      'q6': '',
      'a6': <Text></Text>,
      'q7': '',
      'a7': <Text></Text>,
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
          },{
            title: this.db.q7,
            data: this.db.a7,
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

export default Pmsby;

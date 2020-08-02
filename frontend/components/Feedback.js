import React from 'react';
import { Text } from 'react-native';

class Feedback extends React.Component {
    render() {
        return (
            <View>
                <Text style={{ textAlign: 'center', color: '#302ea2' }}>
                    How was the experience? </Text>  
            </View>
        );
    }
}

export default Feedback;
import React, {useRef} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import YoutubePlayer from 'react-native-youtube-iframe';

const Tutorial = () => {
  const playerRef = useRef();
  return (
    <Container style={styles.container}>
    <YoutubePlayer height={230} width={350} ref={playerRef} videoId={'pv4WoKFONSs'} />
    <ScrollView style={{marginLeft: 15, marginRight: 15}}>
    <Text style={styles.textHead}> Step 1: Insert ATM Card </Text>
    <Text style={styles.textBody}>Insert your ATM Card in the ATM machine in the slot as marked in the above diagram.
    </Text>
    <Text style={styles.textHead}> Step 2: Select Language </Text>
    <Text style={styles.textBody}>Select your language from the language options appearing on the screen.
    </Text>
    <Text style={styles.textHead}> Step 3: Enter 4-Digit ATM Pin </Text>
    <Text style={styles.textBody}>Use the Keypad to enter your 4 digit ATM Pin Number.

Do not ever share your ATM Pin with anyone. Ensure that nobody is watching you, while you enter the Pin.

Be careful while entering the Pin, as a wrong PIN may lead to the blockage of the ATM card.
    </Text>
    <Text style={styles.textHead}> Step 4: Select the type of Transaction </Text>
    <Text style={styles.textBody}>In the ATM screen, you will be able to see different types of transaction options such as Deposit, Transfer, Withdrawal of Money etc.

For cash withdrawal, you will have to select Withdrawal Option.
    </Text>
    <Text style={styles.textHead}> Step 5: Select the Type of Account </Text>
    <Text style={styles.textBody}>After selecting the cash withdrawal option , the screen will display different account types, select your account type.
    </Text>
    <Text style={styles.textHead}> Step 6: Enter the withdrawal amount </Text>
    <Text style={styles.textBody}>Now, enter your withdrawal amount.

Make sure that you do not enter a withdrawal amount more than the balance in your account.

Now press enter.
    </Text>
    </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 20
    },
    textHead: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textBody: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default Tutorial;
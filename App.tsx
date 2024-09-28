import React from "react";
import { Button, Text, StyleSheet, View, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { SafeAreaView } from 'react-native';
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import { Predictions } from "@aws-amplify/predictions";

import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 80,
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  signOutButton: {
    alignSelf: "flex-end",
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

import outputs from "./amplify_outputs.json";

Amplify.configure(outputs);

/*Amplify.configure({
  ...Amplify.getConfig(),
  Predictions: config.custom.Predictions,
});
*/

const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};







export default function App() {
  const colorScheme = useColorScheme();
  const [sound, setSound] = useState();
  
  /*const pollySound =  Predictions.convert({
    textToSpeech: {
      source: {
        text: "Hola mundo"
      },
      voiceId: "Mia",
      region: "us-east-1",
    }
  })*/

  async function playSound() {
    console.log('playSound');
    Predictions.convert({
      textToSpeech:{
        source:{
          text:"Hola Mundo!"
        }
      },
      
    })
    .then(result => {
      let AudioContext = window.AudioContext;
      console.log({ AudioContext });
      const audioCtx = new AudioContext(); 
      const source = audioCtx.createBufferSource();
      audioCtx.decodeAudioData(result.audioStream, (buffer) => {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
      }, (err) => console.log({err}));
      console.log('fin predictions');
    })
    .catch(err => console.log(err));
    console.log('fin playSound')    ;
  }

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  

  return (
  
    <Authenticator.Provider>
      <Authenticator>
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
          <Text style={[styles.text, themeTextStyle]}>Bienvenido! Soy Alex, te voy a enseñar a leer!</Text>
          <StatusBar />
          <Button
            onPress={ playSound }
            title="Habla"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

          <SignOutButton />
          
        </SafeAreaView>
      </Authenticator>
    </Authenticator.Provider>
    
  );
}



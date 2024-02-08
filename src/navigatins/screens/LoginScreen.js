// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const goToNext = async (mobile, id) => {
  await AsyncStorage.setItem('MOBILE', mobile)
  await AsyncStorage.setItem('UID', id)
}

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setname] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('ChatList');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleSendCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId);
      console.log(confirmation.user);
      // For simplicity, we'll log the verificationId to the console
      const providerId = auth().currentUser.providerId;
      console.log('Provider ID:', providerId.uid);
      console.log('Verification ID:', confirmation.verificationId);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, confirmationCode);
      await auth().signInWithCredential(credential);
      const providerId = auth().currentUser.uid;

      console.log('Provider ID:', providerId);
      firestore().collection('users').doc(providerId).set({
        mobile: phoneNumber,
        userId: providerId,
        name: name
      })
      goToNext(phoneNumber, providerId);
      navigation.navigate('ChatList');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={(text) => setname(text)}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Button title="Send Code" onPress={handleSendCode} />

      {verificationId && (
        <>
          <TextInput
            placeholder="Verification Code"
            value={confirmationCode}
            onChangeText={(text) => setConfirmationCode(text)}
          />
          <Button title="Verify Code" onPress={handleVerifyCode} />
        </>
      )}
    </View>
  );
};

export default LoginScreen;

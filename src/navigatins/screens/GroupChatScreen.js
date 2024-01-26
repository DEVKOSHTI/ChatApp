import { View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const GroupChat = () => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore()
      .collection('groupChats')
      .doc(123456) // Assuming you have a groupId for the group chat
      .collection('messages')
      .orderBy('createdAt', 'desc');

    subscriber.onSnapshot(querySnapshot => {
      const allMessages = querySnapshot.docs.map(item => {
        return { ...item.data(), createdAt: item.data().createdAt.toDate() };
      });
      setMessageList(allMessages);
    });

    return () => subscriber(); // Cleanup function for unsubscribe
  }, [route.params.groupId]);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const newMessage = {
      ...msg,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    );

    await firestore()
      .collection('groupChats')
      .doc(route.params.groupId)
      .collection('messages')
      .add(newMessage);
  }, [route.params.groupId]);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.userId,
        }}
      />
    </View>
  );
};

export default GroupChat;

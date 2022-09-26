import React, {useRef, useEffect} from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black  
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications'

import { Routes } from './src/routes'
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken'

export default function App() {

  const getNotificationListener = useRef<Subscription>();
  const ResponseNotificationListener = useRef<Subscription>();
  
  useEffect(() => {
    getPushNotificationToken();
  })

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(Notification => {

    });

    ResponseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(respones => {

    })

    return () => {
      if(getNotificationListener.current && ResponseNotificationListener.current){
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(ResponseNotificationListener.current);
      }
    }
  },[])

  const [fontsLoad] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black 
  });

  return (
    <Background>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
        />
        {fontsLoad ? <Routes /> : <Loading />}
    </Background>
  );
}


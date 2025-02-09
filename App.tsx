import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';

import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificantionsTags';
import { useEffect } from 'react';

const oneSignalAppId = Platform.OS === 'ios' ? 'iOS-ID' : '3626b1dd-242f-475a-9234-32424628b09a';
OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();  

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      console.log('Notificação aberta');
    }
    
    OneSignal.Notifications.addEventListener("click", handleNotificationClick)

    return () => {
      OneSignal.Notifications.removeEventListener("click", handleNotificationClick)
    }
  },[]);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
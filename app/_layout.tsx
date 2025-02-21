import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar  } from 'react-native';
import 'react-native-reanimated';
import './global.css'
import { useEffect } from 'react';
import { GlobalContextProvider } from '@/lib/context/globalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  const queryClient = new QueryClient();

  const [fontsLoaded] =  useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={ DefaultTheme }>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content" 
      />
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <Stack screenOptions={{ headerShown: false }}/>
        </GlobalContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
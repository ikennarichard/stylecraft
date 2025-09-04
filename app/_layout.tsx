import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@/assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('@/assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('@/assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="item-details" 
          options={{ 
            title: 'Item Details',
            presentation: 'card',
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen 
          name="custom-request" 
          options={{ 
            title: 'Custom Request',
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="chat" 
          options={{ 
            title: 'Designer Chat',
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GluestackUIProvider>
  );
}
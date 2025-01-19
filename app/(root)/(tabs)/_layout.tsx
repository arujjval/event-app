import { Home } from '@/assets/icons';
import { SignInImage } from '@/assets/images';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: () => <Image source={Home} className='size-8'/>,
      }}
      />
      <Tabs.Screen
      name="sign-in"
      options={{
        title: 'Sign In',
        tabBarIcon: () => <Image source={Home} className='size-8'/>,
      }}
      />
    </Tabs>
  );
}
import { CreateEvent, Search, Sparkle, UserCircle } from '@/assets/icons';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
        <Tabs 
          screenOptions={{ 
          tabBarActiveTintColor: '#E17205', 
          tabBarInactiveTintColor: '#FFFFFF',
          headerShown: false, 
          tabBarStyle: { 
            backgroundColor: '#212322', 
            height: 70,
            paddingTop: 5,
          } 
          }}
        >
          <Tabs.Screen
          name="index"
          options={{
            title: 'Events',
            tabBarLabelStyle: { fontFamily: 'Poppins-Bold' },
            tabBarIcon: ({ focused }) => <Image source={Sparkle} 
                      style={{ tintColor: focused? '#E17205' : '#FFFFFF' }} 
                      className='size-7'/>,
          }}
          />
          <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarLabelStyle: { fontFamily: 'Poppins-Bold' },
            tabBarIcon: ({ focused }) => <Image source={Search} 
                    style={{ tintColor: focused? '#E17205' : '#FFFFFF' }} 
                    className='size-7'/>,
          }}
          />
          <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarLabelStyle: { fontFamily: 'Poppins-Bold' },
            tabBarIcon: ({ focused }) => <Image source={CreateEvent} 
                    style={{ tintColor: focused? '#E17205' : '#FFFFFF' }} 
                    className='size-7'/>,
          }}
          />
          <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarLabelStyle: { fontFamily: 'Poppins-Bold' },
            tabBarIcon: ({ focused }) => <Image source={UserCircle} 
                    style={{ tintColor: focused? '#E17205' : '#FFFFFF' }} 
                    className='size-7'/>,
          }}
          />
        </Tabs>
  );
}
import GradientBg from '@/components/gradient-bg'
import { Bell } from '@/assets/icons'
import { Link, Redirect } from 'expo-router'
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Pressable} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Card from '@/components/card'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '@/lib/context/globalProvider'
import Filters from '@/components/filters'
import { HomeFilters } from '@/constants/filterValues'
import NotificationsPopup from '@/components/notificationsPopup'

declare module 'jwt-decode' { 
  interface JwtPayload {
    username: string; 
  }
}

function index() {
  const [user, setUser] = useState(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const getUser = async () => {
    const temp = await AsyncStorage.getItem('user')
    console.log(temp)
  }

  const temp = useGlobalContext();

  return (
    <SafeAreaProvider className='w-full h-full'>
      <View className='w-full h-2/6 absolute top-0 left-0 z-1'>
        <GradientBg />
      </View>
      
      <View className='w-full h-1/6 flex flex-row'>
        <View className='flex-1 justify-end mb-8 px-6'>
            <Text className='text-center w-full
                font-poppins-semiBold text-white text-2xl'>
              Events
            </Text>
        </View>
      </View>

      {/* TopBar */}

      <View className='w-full h-full absolute z-2'>
          <View className='h-1/6'></View>
          <View className='w-full h-full rounded-t-2xl bg-white pt-2'>
            <Filters filters={HomeFilters}/>

            <ScrollView horizontal pagingEnabled className='w-full h-full mt-4'>
              <Card />
              <Card />
              <Card />
            </ScrollView>
          </View>
      </View>
    </SafeAreaProvider>
  )
}

export default index
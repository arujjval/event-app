import GradientBg from '@/components/gradient-bg'
import { AngleLeft, Search } from '@/assets/icons'
import { Link, Redirect } from 'expo-router'
import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Filters from '@/components/filters'
import Card from '@/components/card'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '@/lib/context/globalProvider'
import { JwtPayload } from 'jwt-decode'; 

declare module 'jwt-decode' { 
  interface JwtPayload {
    username: string; 
  }
}

function index() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const temp = await AsyncStorage.getItem('user')
    console.log(temp)
  }

  const temp = useGlobalContext();

  return (
    <SafeAreaProvider className='w-full h-full'>
      <View className='w-full h-1/6 absolute top-0 left-0'>
        <GradientBg />
      </View>
      
      <View className='w-full h-1/6 flex flex-row'>
        <View className='flex-1 justify-end mb-8 px-6'>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-center flex-1 pl-6
                font-poppins-semiBold text-white text-2xl'>
              Events
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Image source={Search} className='size-6' style={{ tintColor: 'white' }}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* TopBar */}

      <View className='w-full h-full border border-t rounded-t-3xl border-gray-400'>
          <Filters />

          <View className=''>
             <Text className='font-poppins-bold text-2xl text-gray-800 px-6'>
                Recommended
             </Text>

             <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              className='mt-5'
              contentContainerClassName='flex flex-row gap-5 pl-2'>
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
import GradientBg from '@/components/gradient-bg'
import { AngleLeft, Search } from '@/assets/icons'
import { Link, Redirect } from 'expo-router'
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ExploreFilters from '@/components/ExploreFilters'
import Card from '@/components/card'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '@/lib/context/globalProvider'
import { Explorefilters } from '@/constants/filterValues'
import ExploreCard from '@/components/exploreCard'


declare module 'jwt-decode' { 
  interface JwtPayload {
    username: string; 
  }
}

function Explore() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState<string>('');

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
      
      <View className='w-full h-1/6 flex flex-row items-end pb-8'>
          <Text className='text-center w-full
              font-poppins-semiBold text-white text-2xl'>
            Explore
          </Text>
      </View>

      {/* TopBar */}

      <View className='w-full h-full absolute z-2'>
          <View className='h-1/6'></View>

          <View className='bg-white rounded-t-2xl w-full h-full'>
            <View className='px-4'>
                <View className='w-full flex-row justify-left items-center 
                  bg-gray-200 rounded-2xl my-3 gap-3 px-5'>
                  <Image source={Search} className='size-7' style={{ tintColor: 'gray' }}/>
                  <TextInput 
                  placeholder='Search' 
                  value={search}
                  className='font-poppins-medium text-gray-900 w-full'
                  onChange={(e) => setSearch(e.nativeEvent.text)}/>
                </View>
            </View>

            <ExploreFilters filters={Explorefilters} />

            <ScrollView contentContainerClassName='flex flex-row flex-wrap px-2'>
              <ExploreCard />
              <ExploreCard />
              <ExploreCard />
              <ExploreCard />
              <ExploreCard />
              <ExploreCard />
              <ExploreCard />
              <ExploreCard />
            </ScrollView>
            
                       
            
          </View>
      </View>
    </SafeAreaProvider>
  )
}

export default Explore
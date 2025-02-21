import GradientBg from '@/components/gradient-bg'
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Pressable, ActivityIndicator} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Card from '@/components/card'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '@/lib/context/globalProvider'
import Filters from '@/components/filters'
import { HomeFilters } from '@/constants/filterValues'
import { getLatestEvents } from '@/lib/event/event'
import { useApiQuery } from '@/lib/useApi'
import { Event, User } from '@/constants/types'

declare module 'jwt-decode' { 
  interface JwtPayload {
    username: string; 
  }
}

function index() {
  const [user, setUser] = useState<User>();
  const [filter, setFilter] = useState<string>('Recommended');
  const [events, setEvents] = useState<any[]>([]);

  const {
    data: recommendedEvents,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
    isSuccess: isSuccessRecommended,
  } = useApiQuery(getLatestEvents, []);

  useEffect(() => {
    if(filter == 'Recommended' && isSuccessRecommended) {
        setEvents(recommendedEvents.data);
      } 
    else {
      setEvents([]);
    }
  }, [filter, isSuccessRecommended])

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
            <Filters filters={HomeFilters} 
              onFilterChange={(f) => setFilter(f)}/>
            <ScrollView 
              horizontal 
              pagingEnabled 
              className='w-full h-full mt-4'>
              {events.map((event: Event, index: number) => (
                  <Card key={index} event={event}/>
              ))}
            </ScrollView>
          </View>
      </View>
    </SafeAreaProvider>
  )
}

export default index
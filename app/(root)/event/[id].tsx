import { Calendar } from '@/assets/icons';
import { Avatar, CardImage } from '@/assets/images';
import { Event as EventType } from '@/constants/types';
import { getEventById, getLatestEvents } from '@/lib/event/event';
import { useApiQuery } from '@/lib/useApi';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

enum EventStatus {
    UPCOMING = 'UPCOMING',
    ONGOING = 'ONGOING',
    ENDED = 'ENDED'
}

function Event() {
    const { id } = useLocalSearchParams();
    const [event, setEvent] = useState<EventType | null>(null);
    const [status, setStatus] = useState<EventStatus>(EventStatus.UPCOMING);

    const { data: eventData, isSuccess: isSuccessEvent } = useApiQuery(getEventById, [id as string]);

    useEffect(() => {
      if(isSuccessEvent) {
        setEvent(eventData.data);
        const currentTime = new Date();
        const eventDateTime = new Date(`${eventData.data.on_date}T${eventData.data.on_time}`);
        const eventEndTime = new Date(eventDateTime.getTime() + (2 * 60 * 60 * 1000)); // Assuming 2 hours duration

        if (currentTime < eventDateTime) {
            setStatus(EventStatus.UPCOMING);
        } else if (currentTime >= eventDateTime && currentTime <= eventEndTime) {
            setStatus(EventStatus.ONGOING);
        } else {
            setStatus(EventStatus.ENDED);
        }
      }
    }, [isSuccessEvent])

    return (
        <View className='w-full h-full flex flex-col'>
            <ScrollView>
                <View className='min-h-1/3 max-h-[300px]'>
                    <Image source={CardImage} className='h-full w-full' resizeMode='cover' />
                </View>

                <View className='mx-5 my-8 flex flex-col'>
                    <View className='pb-4'>
                        <Text className='font-poppins-bold text-3xl text-gray-800'>{event?.title}</Text>
                    </View>

                    <View className='py-4 border-y border-slate-200'>
                        <View className='flex flex-row gap-5'>
                            <View className='rounded-full bg-primary-100 p-4'>
                                <Image source={Calendar} className='size-8' style={{ tintColor: '#fff' }} />
                            </View>
                            <View className='flex flex-col justify-center'>
                                <Text className='font-poppins-semiBold text-gray-800'>
                                    {event?.on_date ? new Date(event.on_date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }) : ''}
                                </Text>
                                <Text className='font-poppins-medium text-primary-300'>
                                    Starts at {event?.on_time ? 
                                        new Date(`2000-01-01T${event.on_time}`)
                                        .toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    }) : ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                    <View className='py-8 border-y border-slate-200'>
                        <Text className='font-poppins-bold text-xl text-gray-800'>About the event</Text>
                        <Text className='font-poppins-regular text-gray-800 mt-4'>
                            {event?.about}
                        </Text>
                    </View>

                    <View className='py-8 border-y border-slate-200'>
                        <Text className='font-poppins-bold text-xl text-gray-800'>Streamer</Text>
                        <View className='flex-row items-center mt-4 gap-5'>
                            <Image source={Avatar} className='size-16 rounded-full'/>
                            <Text className='font-poppins-semiBold'>{event && event.streamer.username}</Text>
                        </View>
                    </View>

                {status === EventStatus.ENDED && 
                        (
                            <View className='py-8 border-t border-slate-200'>
                                <Text className='font-poppins-semiBold text-lg text-center'>
                                    Streaming has already ended
                                </Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>

            {status !== EventStatus.ENDED && 
                (
                    <View className='fixed bottom-0 w-full bg-white py-8 px-5 border-t border-slate-200 gap-2'>
                        <Text className='text-right mr-5 font-poppins-regular'>
                            <Text className='font-poppins-semiBold'>1500 </Text> 
                            people have already registered.
                        </Text>
                        <TouchableOpacity>
                            <View className='bg-primary-200 p-4 rounded-full flex flex-row justify-center items-center'>
                                <Text className='font-poppins-semiBold text-white'>
                                    {status === EventStatus.UPCOMING ? 'REGISTER NOW' : 'REGISTER AND JOIN NOW'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View> 
                )
            }
        </View>
    )
}

export default Event
import { Avatar, CardImage } from '@/assets/images'
import { Event } from '@/constants/types'
import { useRouter } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native'

function TagCard({ tag } : {
    tag: string
}) {
    return  (
        <View className='flex flex-row justify-center items-center
         bg-slate-200 rounded-full px-3 py-1 mr-2 mb-2'>
            <Text className='font-poppins-regular text-gray-800 text-xs'>
                {tag}
            </Text>
        </View>
    )
}

function Card({ event } : { event: Event }) {
    const tags = event.tags;
    const router = useRouter()

    const handlePress = () => {
        console.log(event._id)
        router.push(`/event/${event._id}`);
    }

    return (
        <View className='w-screen max-w-[600px] h-full max-h-[600px] rounded-3xl px-5'>
            <TouchableOpacity 
                className='flex-col rounded-3xl border border-gray-200' 
                onPress={handlePress}>
                    <Image source={CardImage} 
                    className='h-2/5 min-h-[200px] w-full rounded-t-3xl' 
                    resizeMode='cover'/>
                    <View className='px-4 py-2 flex flex-col gap-2'>
                        <View className='flex flex-row'>
                        {tags!.slice(0, 3).map((tag: string, index: number) => <TagCard key={index} tag={tag}/>)}
                        {tags!.length > 3 && (
                        <Text className='font-poppins-regular
                        text-gray-800 text-xs my-1'>
                            +{tags!.length - 3}
                        </Text>
                        )}
                        </View>

                        <Text className='font-poppins-bold text-2xl 
                        text-gray-800 mt-2'>
                        {event.title}
                        </Text>
                        <Text className='text-poppins-bold text-gray-500'>
                        {new Date(event.on_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                        })}&nbsp;
                        ●
                        &nbsp;
                        Starts at {new Date(`2000-01-01T${event.on_time}`).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                        })}
                        </Text>

                        <Text className='font-poppins-regular text-gray-600 text-sm'>
                            {event.about}
                        </Text>

                        <View className='mt-4'>
                            <Text className='font-poppins-semiBold text-md'>
                                Streamer
                            </Text>
                            <View className='w-full h-1 bg-gray-200 rounded-full'></View>

                            <View className='flex flex-row items-center mt-2 gap-3'>
                                <Image 
                                    source={Avatar} 
                                    className='size-14 rounded-full'
                                />

                                <Text className='font-poppins-medium text-gray-800'>
                                    {event?.streamer?.username}
                                </Text>
                            </View>
                        </View>
                    </View>
            </TouchableOpacity>
        </View> 
    )
}

export default Card
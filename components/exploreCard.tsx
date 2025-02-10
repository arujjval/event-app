import { Avatar, CardImage } from '@/assets/images'
import { Redirect, useRouter } from 'expo-router'
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

function ExploreCard() {
    const tags = ['Music', 'Food', 'Art', 'Fashion', 'Tech', 'Sports']
    const router = useRouter()

    const handlePress = () => {
        router.push('/event/123');
    }

    return (
        <View className='w-1/2 rounded-3xl p-1'>
            <TouchableOpacity 
                className='h-80 flex-col rounded-3xl' 
                onPress={handlePress}>
                    <Image source={CardImage} 
                    className='w-full h-full rounded-3xl' 
                    resizeMode='cover'/>

                    <View className='absolute z-1 top-0 left-0 w-full h-80
                         bg-gray-600/50 rounded-3xl'></View>

                    <View className='absolute z-2 bottom-0 p-3'>
                        <Text className='font-poppins-semiBold text-white'>Event 1</Text>
                        <Text className='font-poppins-medium text-gray-200 text-sm'>Adam Arora</Text>
                        <Text className='font-poppins-light text-gray-300 text-xs'>Saturday, February 6</Text>
                        <Text className='font-poppins-light text-gray-300 text-xs'>10:00 am to 12:00 pm</Text>
                    </View>
            </TouchableOpacity>
        </View> 
    )
}

export default ExploreCard
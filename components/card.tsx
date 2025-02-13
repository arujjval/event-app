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

function Card() {
    const tags = ['Music', 'Food', 'Art', 'Fashion', 'Tech', 'Sports']
    const router = useRouter()

    const handlePress = () => {
        router.push('/event/123');
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
                        {tags.slice(0, 3).map((tag, index) => <TagCard key={index} tag={tag}/>)}
                        {tags.length > 3 && (
                        <Text className='font-poppins-regular
                        text-gray-800 text-xs my-1'>
                            +{tags.length - 3}
                        </Text>
                        )}
                        </View>

                        <Text className='font-poppins-bold text-2xl 
                        text-gray-800 mt-2'>
                        Party 1
                        </Text>
                        <Text className='text-poppins-bold text-gray-500'>
                        Friday, May 6 
                        ● 
                        Starts at 9:00 AM
                        </Text>

                        <Text className='font-poppins-regular text-gray-600 text-sm'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
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
                                    Huehue Kumar
                                </Text>
                            </View>
                        </View>
                    </View>
            </TouchableOpacity>
        </View> 
    )
}

export default Card
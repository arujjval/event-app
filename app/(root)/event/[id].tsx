import { Calendar } from '@/assets/icons';
import { CardImage } from '@/assets/images';
import { useLocalSearchParams } from 'expo-router'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

function Event() {
    const { id } = useLocalSearchParams();

    return (
        <View className='w-full h-full flex flex-col'>
            <ScrollView>
                <View className='min-h-1/3 max-h-[300px]'>
                    <Image source={CardImage} className='h-full w-full' resizeMode='cover' />
                </View>

                <View className='mx-5 my-8 flex flex-col'>
                    <View className='pb-4'>
                        <Text className='font-poppins-bold text-3xl text-gray-800'>Event Title</Text>
                    </View>

                    <View className='py-4 border-y border-slate-200'>
                        <View className='flex flex-row gap-5'>
                            <View className='rounded-full bg-primary-100 p-4'>
                                <Image source={Calendar} className='size-8' style={{ tintColor: '#fff' }} />
                            </View>
                            <View className='flex flex-col justify-center'>
                                <Text className='font-poppins-semiBold text-gray-800'>Friday, September 29, 2023</Text>
                                <Text className='font-poppins-medium text-primary-300'>1:00 AM to 9:00 PM</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View className='py-8 border-y border-slate-200'>
                        <Text className='font-poppins-bold text-xl text-gray-800'>About the event</Text>
                        <Text className='font-poppins-regular text-gray-800 mt-4'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod t
                            empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </View>

                    <View className='py-8 border-y border-slate-200'>
                        <Text className='font-poppins-bold text-xl text-gray-800'>About the event</Text>
                        <Text className='font-poppins-regular text-gray-800 mt-4'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod t
                            empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </View>

                    <View className='py-8 border-y border-slate-200'>
                        <Text className='font-poppins-bold text-xl text-gray-800'>About the event</Text>
                        <Text className='font-poppins-regular text-gray-800 mt-4'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod t
                            empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </View>

                    <View className='py-8 border-y border-slate-200'>
                        <Text className='font-poppins-bold text-xl text-gray-800'>About the event</Text>
                        <Text className='font-poppins-regular text-gray-800 mt-4'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod t
                            empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </View><View className='py-8 border-y border-slate-200'>
                        <Text className='font-poppins-bold text-xl text-gray-800'>About the event</Text>
                        <Text className='font-poppins-regular text-gray-800 mt-4'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod t
                            empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </View>
                </View>
            </ScrollView>
              

            <View className='fixed bottom-0 w-full bg-white py-8 px-5 border-t border-slate-200 gap-2'>
                <Text className='text-right mr-5 font-poppins-regular'>
                    <Text className='font-poppins-semiBold'>1500 </Text> 
                    people have already registered.
                </Text>
                <TouchableOpacity>
                    <View className='bg-primary-200 p-4 rounded-full flex flex-row justify-center items-center'>
                        <Text className='font-poppins-semiBold text-white'>REGISTER NOW</Text>
                    </View>
                </TouchableOpacity>
            </View> 
        </View>
    )
}

export default Event
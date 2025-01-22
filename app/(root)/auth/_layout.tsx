import { FullLogo, SignInImage } from '@/assets/images'
import { View, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

function RootLayout() {
    return (
        <SafeAreaProvider className='w-full h-full'>
        <View className='w-full h-screen'>
            {/* <View className='w-screen h-3/5 relative'>
            <Image source={ SignInImage } className='w-full h-full' 
                resizeMode='cover'/>
            </View> */}

            <View className='w-full h-full flex flex-col
            items-center mt-5'>
                <Image source={FullLogo} className='h-24 w-96 mb-2'/>
                
                <Slot />
            </View>
        </View>
        </SafeAreaProvider>
    )
}

export default RootLayout
import { FullLogo, SignInImage } from '@/assets/images'
import GradientBg from '@/components/gradient-bg'
import { Google } from '@/assets/icons'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function SignIn() {
  return (
    <SafeAreaProvider className='w-full h-full'>
      <View className='w-full h-full'>
        <View className='w-screen h-2/3 relative'>
          <Image source={ SignInImage } className='w-full h-full' 
            resizeMode='cover'/>
        </View>

        <View className='w-full h-full flex flex-col
         items-center mt-5'>
            <Image source={FullLogo} className='h-24 w-96'/>

            <Text className='font-poppins-light'>Stream now and then.</Text>

            <TouchableOpacity className='max-w-80 flex flex-row 
            items-center gap-4 px-5 py-2 rounded-full bg-white
            justify-center border border-gray-300 mt-10' 
            onPress={() => {}}>
              <Image source={Google} 
                className='size-8' resizeMode='contain'/>
              <Text className='font-poppins-regular'>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  )
}

export default SignIn
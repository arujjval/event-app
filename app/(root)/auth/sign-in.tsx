import { Hide, Show } from '@/assets/icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { signUp } from '@/lib/userAuth'
// @ts-ignore
import AnimatedLoader from 'react-native-animated-loader';
import { useApiMutation } from '@/lib/useApi'

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: signUpMutate, 
          isSuccess, 
          isError, 
          isPending } = useApiMutation(signUp);

  useEffect(() => {
    if(isSuccess) {
      Alert.alert('Success', 'Account created successfully');
      router.push('/auth/login');
    }
    if(isError) {
      Alert.alert('Error', 'An error occured while creating account');
    }
  }, [isSuccess, isError])

  const handleSignup = async () => {
    try {
      signUpMutate({
        username,
        email,
        password
      });
    }
    catch(e) {
      Alert.alert('Error', 'An error occured while creating account');
    }
  }

  return (
    <SafeAreaProvider className='w-full h-full'>
      <View>
        <View className='flex flex-row items-center border
        rounded-2xl border-gray-300 py-1 px-3'>
          <TextInput 
            placeholder='Enter username' 
            value={username}
            onChangeText={(e) => setUsername(e)}
            className='min-w-60 text-left font-poppins-regular'
          />
        </View>

        <View className='flex flex-row items-center border
        rounded-2xl border-gray-300 py-1 px-3 mt-4'>
          <TextInput 
            placeholder='Enter your email' 
            value={email}
            onChangeText={(e) => setEmail(e)}
            className='min-w-60 text-left font-poppins-regular'
          />
        </View>

        <View className='flex-row items-center border border-gray-300
         rounded-2xl py-1 px-3 justify-between gap-1 mt-4'>
          <TextInput 
            placeholder='Enter password' 
            value={password}
            onChangeText={(e) => setPassword(e)}
            secureTextEntry={!showPassword}
            className='min-w-40 font-poppins-regular'
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={showPassword ? Hide : Show} className='size-5'/>
          </TouchableOpacity>
        </View>

        <View className='flex flex-row items-center justify-end gap-1 mt-1'>
          <Text className='font-poppins-light text-sm'>
            Already a user?
          </Text>
          <TouchableOpacity onPress={() => (router.push('/auth/login'))}>
            <Text className='text-primary-100 font-poppins-medium
              text-sm'>
                Login
            </Text>
          </TouchableOpacity>
        </View>
        

        <TouchableOpacity className='bg-primary-200 rounded-full
          py-3 px-5 mt-5'
          onPress={handleSignup}>
          {(isPending)? (
              <ActivityIndicator size="small" color="#ffffff" />
          ) : (
              <Text className='text-center text-white font-poppins-semiBold
            uppercase'>Sign Up</Text>
          )}   
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  )
}

export default Signup
import { Hide, Show } from '@/assets/icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { login } from '@/lib/userAuth/user'
import { useApiMutation } from '@/lib/useApi'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: loginMutate, 
    isSuccess, 
    isError, 
    isPending } = useApiMutation(login);

    useEffect(() => {
      if(isSuccess) {
        router.push('/');
      }
      if(isError) {
        Alert.alert('Error', 'User not found.');
      }
    }, [isSuccess, isError])

    const handleLogin = async () => {
      try {
        loginMutate({
          email,
          password
        });
      } catch (error) {
        Alert.alert('Error', 'Invalid credentials');
      }
    }

  return (
    <SafeAreaProvider className='w-full h-full'>
      <View>
        <View className='flex flex-row items-center border
        rounded-2xl border-gray-300 py-1 px-3'>
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
            First time here?
          </Text>
          <TouchableOpacity onPress={() => (router.push('/auth/sign-in'))}>
            <Text className='text-primary-100 font-poppins-medium
              text-sm'>
                Sign up
            </Text>
          </TouchableOpacity>
        </View>
        

        <TouchableOpacity className='bg-primary-200 rounded-full
          py-3 px-5 mt-5' onPress={handleLogin}>
          {(isPending)? (
              <ActivityIndicator size="small" color="#ffffff" />
          ) : (
              <Text className='text-center text-white font-poppins-semiBold
              uppercase'>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  )
}

export default Login
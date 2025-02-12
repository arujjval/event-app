import { Back, Edit } from '@/assets/icons';
import { Avatar } from '@/assets/images';
import Filters from '@/components/filters';
import { ProfileFilters } from '@/constants/filterValues';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Redirect, router, useRouter } from 'expo-router';

function EditProfile() {
  const [username, setUsername] = useState('John Doe');
  const [image, setImage] = useState<string | null>('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s');

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
          setImage(result.assets[0].uri);
      }
  };

  const saveChanges = () => {
    router.push('/profile');
  }

  return (
    <View className="h-full w-full">
      <View className='h-1/6 flex-row justify-between items-end pb-6 px-4'>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image source={Back} className="size-8" />
        </TouchableOpacity>

        <Text className="text-2xl font-poppins-bold flex-1 text-center pr-8">
          Edit Profile
        </Text>
      </View>
      
      <View className='flex flex-col items-center px-10 gap-5 my-10'>
        <View className='flex-row items-center gap-10'>
          <Image
            source={{ uri: image || 'https://photosnow.net/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg' }}
            className="size-36 rounded-full"
          />
          <View className='flex flex-col items-center gap-10'>
              <TouchableOpacity onPress={pickImage} className='rounded-full p-3 bg-gray-200'>
                  <Text className='font-poppins-regular'>Change</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setImage(null)} className='rounded-full p-3 bg-gray-200'>
                  <Text className='font-poppins-regular text-red-600'>Remove</Text>
              </TouchableOpacity>
          </View>
        </View>
        
        <View className="mt-10">
          <Text className='pl-3 font-poppins-regular text-sm'>Edit Username</Text>
          <View className='border border-gray-400 rounded-3xl min-w-80 px-3'>  
            <TextInput 
              className="font-poppins-medium text-lg"
              value={username}
              onChangeText={setUsername}
            /> 
          </View>
          <Text className='px-3 font-poppins-light text-gray-400 mt-3'>hehe@gmail.com</Text>
        </View>

        <View className='bg-primary-400 rounded-full mt-14'>
          <TouchableOpacity onPress={saveChanges}>
            <Text className='text-white font-poppins-bold w-60 py-3 text-center text-lg'>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default EditProfile;
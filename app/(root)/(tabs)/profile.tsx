import { Back, Edit } from '@/assets/icons';
import { Avatar } from '@/assets/images';
import Filters from '@/components/filters';
import { ProfileFilters } from '@/constants/filterValues';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, router, useRouter } from 'expo-router';

function Profile() {
  return (
    <View className="h-full w-full">
      <View className='h-1/6 flex-row justify-between items-end pb-6 px-4'>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={Back} className="size-8" />
        </TouchableOpacity>

        <Text className="text-2xl font-poppins-bold">My Profile</Text>

        <TouchableOpacity onPress={() => router.push('/edit/editProfile')}>
          <Image source={Edit} className="size-8" />
        </TouchableOpacity>
      </View>
      
      <View className='flex flex-row items-center px-10 gap-5 my-10'>
        <Image
          source={Avatar}
          className="size-36 rounded-full"
        />
        <View className="ml-4">
          <Text className="font-poppins-semiBold text-lg">John Doe</Text>
          <Text className="text-sm font-poppins-medium text-gray-500">joined in May 2022</Text>
        </View>
      </View>

      <View className='h-6 w-full bg-gray-200/50'></View>

      <Filters filters={ProfileFilters}/>
    </View>
  );
}

export default Profile;
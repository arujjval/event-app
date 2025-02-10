import { View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import GradientBg from '@/components/gradient-bg';
import { SelectImage } from '@/assets/icons';

const AllTags = ['Tech', 'Music', 'Food', 'Sports', 'Art', 'Fashion', 
    'Health', 'Business', 'Science', 'Education', 'Travel', 'Film', 'Charity', 'Other'];

function Create() {
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const [LeftTags, setLeftTags] = useState<Array<string>>(AllTags);
    const [date, setDate] = useState<string>('');
    
    const handleTag = (tag: string) => {
        setSelectedTags(prevSelectedTags => {
            if (prevSelectedTags.includes(tag)) {
                return prevSelectedTags.filter(t => t !== tag);
            } else if (prevSelectedTags.length < 5) {
                return [...prevSelectedTags, tag];
            } else {
                return prevSelectedTags;
            }
        });

        setLeftTags(prevLeftTags => {
            if (selectedTags.length === 5) {
                return prevLeftTags;
            }

            const newLeftTags = prevLeftTags.includes(tag)
                ? prevLeftTags.filter(t => t !== tag)
                : [...prevLeftTags, tag];
            return newLeftTags;
        });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        };

    return ( 
        <SafeAreaProvider className='w-full h-full'>
            <View className='w-full h-2/6 absolute top-0 left-0'>
                <GradientBg />
            </View>

            <View className='w-full h-1/6 flex flex-col justify-end pb-8'>
                <Text className='font-poppins-semiBold text-white text-2xl
                    text-center w-full'>
                    Create Event
                </Text>
            </View>

            {/* Header ends */}

            <View className='w-full h-full absolute z-2'>
                <View className='h-1/6'></View>
                <ScrollView 
                    className='w-full h-full bg-white rounded-t-2xl'
                    contentContainerClassName='flex flex-col gap-5 mx-4 mt-10'>
                    <View className='flex flex-col gap-5'>
                        <Text className='text-gray-800 font-poppins-medium'>
                            Upload a cover image
                        </Text>
                        <View className='flex flex-row items-center gap-10'>
                            <TouchableOpacity onPress={pickImage} className=' bg-gray-800 
                                p-4 rounded-full'>
                                <Image source={SelectImage} 
                                    className='size-10' 
                                    style={{ tintColor: '#fff'}}/>
                            </TouchableOpacity>
                            {image && <Image source={{ uri: image }} className='w-48 h-32' />}
                        </View>
                    </View>

                    <View className='flex flex-col gap-1'>
                        <Text className='text-gray-800 font-poppins-medium'>
                        Event Title
                        </Text>
                        <TextInput
                            onChangeText={setTitle}
                            value={title}
                            placeholder='Your event title'
                            className="border border-gray-300 py-4 px-3 
                                rounded-3xl text-gray-800 font-poppins-regular"
                        />
                    </View>

                    <View className='flex flex-col gap-1'>
                        <Text className='text-gray-800 font-poppins-medium'>
                        About the event
                        </Text>
                        <TextInput
                            onChangeText={setDescription}
                            value={description}
                            placeholder='What is your event about?'
                            className='border border-gray-300 py-4 px-3 
                                rounded-3xl text-gray-800 font-poppins-regular'
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <View>
                        <Text className='font-poppins-medium text-gray-800 mb-2'>
                            Select relevant tags
                        </Text>
                        <View className='flex flex-row flex-wrap gap-2'>
                            {selectedTags.map((tag) => (
                                <TouchableOpacity key={tag} onPress={() => handleTag(tag)}>
                                    <Text className='font-poppins-regular text-sm text-white
                                        bg-primary-400 px-3 py-1 rounded-full'>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text className='font-poppins-regular text-gray-800 text-sm mt-1 mb-3'>
                            Select upto 5 tags.
                        </Text>

                        <View className='flex flex-row flex-wrap gap-2'>
                            {LeftTags.map((tag) => (
                                <TouchableOpacity key={tag} onPress={() => handleTag(tag)}>
                                    <Text className='font-poppins-regular text-sm text-gray-800
                                        bg-slate-300/60 px-3 py-1 rounded-full'>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    )
}

export default Create